import * as React from "react"
import {rawData} from "../data/raw.data"

const COMPANY_SHARE_PER_DAY = 400;
const calculateExpensesReducer = (accumulator, currentValue) => {
    if (currentValue > COMPANY_SHARE_PER_DAY) {
        accumulator.employeeShare += currentValue - COMPANY_SHARE_PER_DAY;
        accumulator.companyShare += COMPANY_SHARE_PER_DAY;
    }
    else {
        accumulator.companyShare += currentValue;
    }
    return accumulator;
};

export class App extends React.Component {
    state = {
        csv: rawData,
        data: [],
        dataHeaders: [],
        employeeShare: 0,
        companyShare: 0
    };

    handleTextAreaChange = (ev) => {
        this.setState({
            csv: ev.value
        });
        this.generateReport(ev.target.value);
    };

    parseData = (data) => {
        let data = data.split("\n");
        let parsedData = [];
        for (let i = 0; i < data.length; i++) {
            let dataObject = data[i].split(",");
            parsedData.push(dataObject);
        }
        return parsedData;
    };

    getHeaders = (data) => {
        return data[0];
    };

    getDataContent = (data) => {
        return data.slice(1, data.length);
    };

    getExpenses = (data) => {
        let expenses = [];
        for (let i = 0; i < data.length; i++) {
            expenses.push(parseFloat(data[i][4].match("\\d+.\\d+")));
        }
        return expenses;
    };

    calculateShares = (data) => {
        let expenses = this.getExpenses(data);
        let expensesSum = expenses.reduce(calculateExpensesReducer, {companyShare: 0, employeeShare: 0});
        this.setState({...expensesSum});
    };

    generateReport = (data) => {
        let parsedData = this.parseData(data);
        let dataHeaders = this.getHeaders(parsedData);
        let dataContent = this.getDataContent(parsedData);
        this.calculateShares(dataContent);
        this.setState({
            data: dataContent,
            headers: dataHeaders,
        });
    };

    componentWillMount = () => {
        let parsedData = this.parseData(this.state.csv);
        this.state.dataHeaders = this.getHeaders(parsedData);
        this.state.data = this.getDataContent(parsedData);
        this.calculateShares(this.state.data);
    };

    render() {
        const {csv, data, dataHeaders, employeeShare, companyShare} = this.state;
        return <div className="flexbox-column" style={{padding: 16, alignItems: "left"}}>
          <div style={{fontSize: 24, paddingBottom: 16}}>10bis Report</div>

          <div style={{paddingBottom: 16, width: "100%"}}>
                <textarea style={{height: 200, width: "100%"}} value={csv}
                          onChange={this.handleTextAreaChange}/>
          </div>

          <div style={{paddingBottom: 20, height: 300, width: "100%"}}>
            <table style={{border: '1px solid black', width: "30%",height:300}}>
              <thead>
              <tr>
                  {dataHeaders.map(header => <th key={header}>{header}</th>)}
              </tr>
              </thead>

              <tbody>
              {data.map(rowData => <tr key={rowData}>{rowData.map(cell => <td key={cell}>{cell}</td>)}</tr>)}
              </tbody>
            </table>
          </div>

          <div style={{fontSize: "15px"}}>
            <span style={{paddingRight:55}}>Employee share: </span><span>{employeeShare.toFixed(2)}</span><br/><br/>
            <span style={{paddingRight:55}}>Company share: </span><span>{companyShare.toFixed(2)}</span>
          </div>
        </div>
    }
}