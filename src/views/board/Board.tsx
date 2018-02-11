import * as React from 'react'
import history from './../../routes/History'
import { connect } from 'react-redux'
import { mapStateToPropsNotebook, mapDispatchToPropsNotebook } from '../../actions/NotebookActions'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import NotYetAvailable from './../message/NotYetAvailable'
import NotebookApi from './../../api/notebook/NotebookApi'
import ScratchpadRenderer from './../scratchpad/ScratchpadRenderer'
import ClusterHealth from './../cluster/ClusterHealth'
import Calendar from './../calendar/Calendar'

@connect(mapStateToPropsNotebook, mapDispatchToPropsNotebook)
export default class Board extends React.Component<any, any> {
  private readonly notebookApi: NotebookApi

  state = {
    note: {
      id: '',
      paragraphs: []
    }
  }

  public constructor(props) {
    super(props)
    this.notebookApi = window["NotebookApi"]
  }

  public render() {

    const { note } = this.state

    return (

      <div className="ms-Grid ms-fadeIn500">

        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
            <NotYetAvailable/>
          </div>
        </div>

        <div className="ms-Grid-row">

          <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
            <a href="" onClick={(e) => {e.preventDefault(); history.push("/dla/kuber/calendar")}}>
              <Icon iconName='Calendar' className='ms-Icon50' />
            </a>
            <Calendar 
              defaultView='day' 
              toolbar={false}
              events={[
                {
                  id: 0,
                  title: 'A Day Event very long title',
                  allDay: false,
                  start: new Date(2018, 2, 12, 10, 0, 0, 0),
                  end: new Date(2018, 2, 12, 19, 0, 0, 0),
                }
              ]}
            />
          </div>

          <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
            <a href="" onClick={(e) => {e.preventDefault(); history.push("/dla/explorer/note/scratchpad")}}>
              <Icon iconName='NoteForward' className='ms-Icon50' />
            </a>
            { (note.paragraphs.length > 0)  && 
              <ScratchpadRenderer 
                  showGraphBar={false}
                  showControlBar={false}
                  showParagraphTitle={false}
                  note={note} 
                />
            }
          </div>

          <div className="ms-Grid-col ms-u-sm4 ms-u-md4 ms-u-lg4">
            <a href="" onClick={(e) => {e.preventDefault(); history.push("/dla/kuber/settings")}}>
              <Icon iconName='Health' className='ms-Icon50' />
            </a>
            <ClusterHealth/>
          </div>

        </div>

      </div>
      

    )

  }

  public componentDidMount() {
    return this.notebookApi.getNote("_conf")
  }

  public componentWillReceiveProps(nextProps) {
    const { webSocketMessageReceived } = nextProps
    if (! webSocketMessageReceived) return
    if (webSocketMessageReceived.op == "NOTE") {
      this.setState({
        note: webSocketMessageReceived.data.note
      })
    }
  }
  
}
