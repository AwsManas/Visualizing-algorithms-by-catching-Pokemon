import React , {Component} from "react";
import './css/SingleNode.css'

export default class SingleNode extends Component{

    constructor(props){
        super(props)
        this.state = {} 
    }

    render(){

        const {isStart, isEnd , isVisited, row, col , onMouseDown , onMouseEnter , onMouseUp, isWall, isShort} = this.props;
        let extraClass = isShort ? 'short-path' : isVisited ? 'node-visited' : isEnd ? 'node-end' : isStart ? 'node-start' : isWall ? 'node-wall' : ''
        return (
            <div className={`node ${extraClass}`} 
            id = {`node-${row}-${col}`}
            onMouseDown = {()=> onMouseDown(row,col)}
            onMouseEnter = {()=> onMouseEnter(row,col)}
            onMouseUp = {()=> onMouseUp()}
            >
            </div>
        )
    }

}