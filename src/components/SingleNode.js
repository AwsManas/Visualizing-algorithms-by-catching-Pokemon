import React , {Component} from "react";
import '../css/SingleNode.css'

export default class SingleNode extends Component{

    constructor(props){
        super(props)
        this.state = {} 
    }

    render(){

        const {isStart, isEnd , isVisited, row, col , onMouseDown , onMouseEnter , onMouseUp, isWall, isShort} = this.props;
        let extraClass = isShort ? 'short-path' : isVisited ? 'node-visited' : isEnd ? 'node-end' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
        // check if its a weighted object if yes, change the extraClass accordingly 
        if(extraClass === 'node-wall' && isWall!== Infinity){
           switch(isWall) {
            case 0 : console.log("This shouldnt happen");
                      break;

            case 1 : console.log("Even this shouldnt happen");
                      break;
            case 2 : extraClass = 'node-wt-2';
                    break;
            case 3 : extraClass = 'node-wt-3';
                    break;
            case 4 : extraClass = 'node-wt-4';
                    break;
            case 5 : extraClass = 'node-wt-5';
                    break;
            case 6 : extraClass = 'node-wt-6';
                    break;
            case 7 : extraClass = 'node-wt-7';
                    break;
           }
        }

        let string_class = `node ${extraClass}`;
    

        return (
            <div className={string_class} 
            id = {`node-${row}-${col}`}
            onMouseDown = {()=> onMouseDown(row,col)}
            onMouseEnter = {()=> onMouseEnter(row,col)}
            onMouseUp = {()=> onMouseUp()}
            >
            </div>
        )
    }

}