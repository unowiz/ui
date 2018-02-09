import * as React from 'react'
import * as isEqual from 'lodash.isequal'
import { connect } from 'react-redux'
import { NotebookStore } from '../../store/NotebookStore'
import { mapDispatchToPropsConfig, mapStateToPropsConfig } from '../../actions/ConfigActions'
import { mapStateToPropsKuber, mapDispatchToPropsKuber } from '../../actions/KuberActions'
import { IConfig, emptyConfig } from './../../api/config/ConfigApi'
import { RestClient, Result, Outcome, ClientOptions, jsonOpt } from '../../util/rest/RestClient'
import JSONTree from 'react-json-tree'
import { emailRegexp } from './../../util/msc/regexp'
import { autobind } from 'office-ui-fabric-react/lib/Utilities'
import { LayoutGroup } from '@uifabric/experiments/lib/LayoutGroup';
import { Form, FormConditionalSubmitButton, FormDatePicker, FormDropdown, FormCheckBox, FormTextInput, Validators } from '@uifabric/experiments/lib/Form'
import { CompoundButton, IButtonProps } from 'office-ui-fabric-react/lib/Button'
import { Label } from 'office-ui-fabric-react/lib/Label'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'
import KuberApi from '../../api/kuber/KuberApi'

const MAX_LENGTH = 20

export type IKuberState = {
  wsMessages: any[]
  restResponse: any
  formResults: any
  disabled: boolean
  checked: boolean
}

@connect(mapStateToPropsKuber, mapDispatchToPropsKuber)
@connect(mapStateToPropsConfig, mapDispatchToPropsConfig)
export default class Aws extends React.Component<any, IKuberState> {
  private config: IConfig = NotebookStore.state().config
  private restClient: RestClient
  private k8sApi: KuberApi
  private method: string
  private url: string
  private wsMessage: any

  state = {
    wsMessages: new Array(),
    restResponse: {},
    formResults: null,
    disabled: false,
    checked: false
  } 

  public constructor(props) {    
    super(props)
  }

  public async componentDidMount() {
    this.k8sApi = window['KuberApi']
  }

  public render() {

    const { disabled, checked } = this.state

    return (

      <div>

        <br/>
        <h3>Amazon AWS</h3>

        <Form 
          onSubmit={ this.submit } 
          showErrorsWhenPristine={ true }
        >

          <LayoutGroup layoutGap={ 20 } direction='vertical'>

            <div className="ms-Grid	ms-slideRightIn40 ms-clearfix">
              <div className="ms-Grid-row ms-clearfix">
                <div className="ms-Grid-col ms-sm3 ms-md3 ms-lg3 ms-clearfix">
                  <FormConditionalSubmitButton
                    buttonProps={{
                      onClick: (e) => {
                        this.method = 'GET'
                        this.url = 'http://localhost:9091/api/v1/cloud/aws/eu-central-1/volumes'
                      }
                    }}
                    >
                    EBS Volumes
                  </FormConditionalSubmitButton>
                  <div style={{ padding: "10px", backgroundColor: "black" }}>
                    <JSONTree 
                      data={this.state.restResponse} 
                      theme='greenscreen'
                      invertTheme={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </LayoutGroup>

        </Form>

      </div>

    )

  }

  public componentWillReceiveProps(nextProps) {
    const { config, kuberMessageReceived } = nextProps
    if (config && ! isEqual(config, this.config)) {
      this.config = config
    }
  }

  private newRestClient(url: string) {
    this.setState({restResponse: {}})
    return new RestClient({
      name: 'KuberAws',
      url: url,
      path: '/'
    })
  }

  @autobind
  private submit(values: any): void {
    values.name = values.name_input
    this.restClient = this.newRestClient(this.url)
    switch (this.method) {
      case 'GET':
        this.restClient.get<{}>(values, jsonOpt, "")
          .then(json => { this.setState({restResponse: json})})
        break
      case 'POST':
        this.restClient.post<{}>(values, {}, jsonOpt, "")
          .then(json => { this.setState({restResponse: json})})
        break
      case 'PUT':
        this.restClient.put<{}>(values, {}, jsonOpt, "")
          .then(json => { this.setState({restResponse: json})})
        break
      case 'DELETE':
        this.restClient.delete<{}>(values, jsonOpt, "")
          .then(json => { this.setState({restResponse: json})})
      break
    }
  }

}