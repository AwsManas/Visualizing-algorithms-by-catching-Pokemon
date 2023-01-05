import './css/Legend.css';
import React , {Component} from "react";
export default class Legend extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){

        const { data }  = this.props; 
  return (
    <ul className="legend">
      {data.map(item => (
        <li key={item.value}>
          <span
            className="legend-color"
            style={{ backgroundColor: item.color }}
          />
          <span className="legend-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
      }
}