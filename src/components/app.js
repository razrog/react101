import * as React from "react"
import {rawData} from "../data/raw.data"
import {Button} from "./button"

export class App extends React.Component {
  state = {
    csv: rawData,
    data: []
  }

  handleTextAreaChange = (ev) => {
    this.setState({
      csv: ev.value,
    })
  }

  generateReport = () => {
    console.log("start generate report...")
  }

  render() {
    const {csv, data} = this.state

    return <div className="flexbox-column" style={{padding: 16, alignItems: "left"}}>
      <div style={{fontSize: 24, paddingBottom: 16}}>10bis Report</div>

      <div style={{paddingBottom: 16, width: "100%"}}>
        <textarea style={{height: 200, width: "100%"}} value={csv} onChange={this.handleTextAreaChange}/>
      </div>

      <div style={{paddingBottom: 16}}>
        <Button onClick={this.generateReport} title="Generate Report"/>
      </div>

      <div>Add the report here</div>
    </div>
  }
}