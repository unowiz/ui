import * as React from 'react'
import { connect } from 'react-redux'
import { CommandButton } from 'office-ui-fabric-react/lib/Button'
import NotYetAvailable from './../message/NotYetAvailable'
import NotebookApi from './../../api/notebook/NotebookApi'
import JSONTree from 'react-json-tree'
import { mapStateToPropsNotebook, mapDispatchToPropsNotebook } from '../../actions/NotebookActions'

@connect(mapStateToPropsNotebook, mapDispatchToPropsNotebook)
export default class InterpretersStatus extends React.Component<any, any> {
  private notebookApi: NotebookApi

  public constructor(props) {
    super(props)
    this.state = {
      interpreterSettings: {}
    }
    this.notebookApi = window["NotebookApi"]
  }
/*
TODO(ECH)
+ Interpreter Status View
+ Restart http://localhost:8091/spitfire/api/interpreter/setting/restart/2CBEJNFR7
*/
 public render() {
    return (
      <div>
        <div className="ms-font-xxl">Spitfire Interpreters</div>
        <div className="ms-Grid" style={{ padding: 0 }}>
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
              <NotYetAvailable/>
            </div>
            <div className="ms-Grid-row">
              <CommandButton iconProps={ { iconName: 'Sync' } } onClick={ (e => this.restartInterpreters(e))} >Restart Interpreters</CommandButton>
            </div>
            <div style={{ padding: "10px", backgroundColor: "black" }}>
              <JSONTree 
                data={this.state.interpreterSettings} 
                theme='greenscreen'
                invertTheme={false}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  public async componentDidMount() {
    this.loadInterpreterSettings()
  }

  private async loadInterpreterSettings() {
    var interpreterSettings = await this.notebookApi.interpreterSetting()
    this.setState({
      interpreterSettings: interpreterSettings
    })
  }

  private async restartInterpreters(e) {
    e.stopPropagation()
    e.preventDefault()
    var interpreterSettings = this.state.interpreterSettings
    this.setState({
        interpreterSettings: {}
    })
    var body = interpreterSettings.result.body
    for (var i in body) {
      var id = body[i].id
      var name = body[i].name
      var interpreter = await this.notebookApi.restartInterpreter(id)
    }
  }

}