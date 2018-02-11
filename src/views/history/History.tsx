import * as React from 'react'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import NotYetAvailable from './../message/NotYetAvailable'

export default class History extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <div style={{float: "left"}}>
          <Icon iconName='GitGraph' className='ms-Icon50' />
        </div>
        <div style={{float: "left"}}>
          <div className='ms-font-su'>History</div>
        </div>
        <div className="ms-clearfix"/>
        <NotYetAvailable/>
      </div>
    )
  }

}