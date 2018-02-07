import * as React from 'react'
import { connect } from 'react-redux'
import { NotebookStore } from './../../store/NotebookStore'
import { mapStateToPropsNotebook, mapDispatchToPropsNotebook } from '../../actions/NotebookActions'
import GoogleApi from './../../api/google/GoogleApi'
import { DocumentCard, DocumentCardActivity, DocumentCardPreview, DocumentCardTitle, IDocumentCardPreviewProps, DocumentCardActions } from 'office-ui-fabric-react/lib/DocumentCard'
import { ImageFit } from 'office-ui-fabric-react/lib/Image'

@connect(mapStateToPropsNotebook, mapDispatchToPropsNotebook)
export default class Google extends React.Component<any, any> {
  private googleApi: GoogleApi

  state = {
    me: NotebookStore.state().me,
    profileDisplayName: NotebookStore.state().profileDisplayName,
    profilePhoto: window.URL.createObjectURL(NotebookStore.state().profilePhotoBlob),
    contacts: []
  }

  public constructor(props) {
    super(props)
    this.googleApi = window["GoogleApi"]
  }

  public render() {

    const { profileDisplayName, profilePhoto, me } = this.state

    var previewProps: IDocumentCardPreviewProps = {
      previewImages: [{
        previewImageSrc: me.coverPhotos[0].url,
        imageFit: ImageFit.cover,
        width: 318,
        height: 196
      }]
    }

    return (
      
      <div>

        <div className='ms-font-su'>{ profileDisplayName }</div>
        <DocumentCard>
          <DocumentCardPreview { ...previewProps } />
          <DocumentCardTitle
            title = { profileDisplayName }
            shouldTruncate = { true } />
          <DocumentCardActivity
            activity={'@' + this.state.me.resourceName}
            people={
              [{ 
                name: profileDisplayName, 
                profileImageSrc: profilePhoto
              }]
            }
          />
        </DocumentCard>

        <hr/>

        <div className='ms-font-xxl'>Contacts</div>

        <div className="ms-Grid" style={{ padding: 0 }}>
            <div className="ms-Grid-row">
            {
              this.state.contacts.map((c) => {
                var resourceName = c.resourceName
                var displayName = ""
                if (c.names && c.names[0]) displayName = c.names[0].displayName
                var email = ""
                if (c.emailAddresses && c.emailAddresses[0]) email = c.emailAddresses[0].value
                var picto = ""
                if (c.photos && c.photos[0]) picto = c.photos[0].url
                return (
                  <div className="ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2" key={ resourceName } >
                    <DocumentCard>
                      <DocumentCardTitle
                        title = { displayName }
                        shouldTruncate = { true } />
                      <DocumentCardActivity
                        activity={'@' + resourceName}
                        people={
                          [{ 
                            name: email, 
                            profileImageSrc: picto
                          }]
                        }
                      />
                      <DocumentCardActions
                        actions={
                          [
                            {
                              iconProps: { iconName: 'Share' },
                              onClick: (ev: any) => {
                                console.log('You clicked the share action.')
                                ev.preventDefault()
                                ev.stopPropagation()
                              },
                              ariaLabel: 'share action'
                            }
                          ]
                        }
                      />
                    </DocumentCard>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>

    )

  }

  public componentDidMount() {
    this.updateContacts()
  }

  private updateContacts() {
    this.googleApi.getContacts(50)
      .then(contacts => {
        this.setState({
          contacts: contacts.result.connections
        })
    })
  }

}
