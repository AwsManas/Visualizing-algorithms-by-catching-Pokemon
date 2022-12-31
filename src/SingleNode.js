import React , {Component} from "react";
import './css/SingleNode.css'

export default class SingleNode extends Component{

    constructor(props){
        super(props)
        this.state = {} 
    }

    render(){

        const {isStart, isEnd , isVisited} = this.props;
        let extraClass = isStart ? 'node-start' : isEnd ? 'node-end' : isVisited ? 'node-visited' : ''
        return (
            <div className={`node ${extraClass}`}>
            </div>
        )
    }

}