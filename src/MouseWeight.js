import React , {Component} from "react";
// This was used for Debugging , no need for it anymore 
export default class MouseWeight extends Component{

    constructor(props){
        super(props)
        this.state = {} 
    }

    render(){

        let {weight} = this.props;
        weight = weight === 0 ? "Eraser" : weight
        weight = weight === 1 ? "Wall" : weight;
        return (
            <div> {weight} </div>
        )
    }

}