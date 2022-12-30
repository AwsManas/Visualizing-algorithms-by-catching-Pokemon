import React , {Component} from "react";

import Node from './SingleNode.js'
import './css/MyApp.css'

export default class MyApp extends Component{

    constructor(props){
        super(props)
        this.state = {
            nodes : []
        } 
    }

    componentDidMount() {
        let nodes = []
        for(let row = 0; row < 30; row++){
            let crow = []
            for(let col = 0; col < 60; col++) {
                crow.push([]);
            } 
            nodes.push(crow);
        }
        this.setState({nodes});
    }

    render(){

        let nodes = this.state.nodes;
        
        return (
            <div className="mygrid">
            {nodes.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    return (
                      <Node></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )
    }

}