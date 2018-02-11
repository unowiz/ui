import * as React from 'react'
import { connect } from 'react-redux'
import { mapStateToPropsNotebook, mapDispatchToPropsNotebook } from '../../actions/NotebookActions'
import MockContent from './../message/MockContent'
import ClusterHealth from './../cluster/ClusterHealth'

@connect(mapStateToPropsNotebook, mapDispatchToPropsNotebook)
export default class AsideCluster extends React.Component<any, any> {

  public constructor(props) {
    super(props)
  }

  public render() {
    return (
      <div>
        <MockContent/>
        <br/>
        <div className="ms-font-xxl">Cluster Health</div>
        <ClusterHealth/>
      </div>
   )
  }

}
