import React , {Component} from "react";

import Node from './SingleNode.js'

export default class MyApp extends Component{

    constructor(props){
        super(props)
        this.state = {} 
    }

    render(){
        return (
            <div>
                Hello World
                <Node></Node>
            </div>
        )
    }

}