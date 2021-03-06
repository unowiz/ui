import * as React from 'react'
import TableBaseDisplay from './_TableBaseDisplay'
import {HorizontalBar} from 'react-chartjs-2'
import * as stylesImport from './../_styles/Styles.scss'
const styles: any = stylesImport

export default class TableBarHorizontalDisplay extends TableBaseDisplay {
  barHorizontalData = {}

  data3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  }

  constructor(props) {
    super(props)
    const { columns, items } = props
    this.barHorizontalData = this.prepareData(columns, items, this.barHorizontalData)
  }

  render() {
    return (
      <div className={styles.overflowYOverlay} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <HorizontalBar
          data={this.barHorizontalData}
        />
      </div>
    )
  }

}
