import React , {Component} from "react";
import './css/Weight.scss'
export default class SelectWeight extends Component {
    constructor(props){
        super(props)
        this.state = {
            onButton : 0
        }
    }
    

    buttonClick(button_id){
        this.setState({onButton : button_id});
        const {changeMouseMode, runAlgo} = this.props;
        switch(button_id){
            case 0: 
                    // Wall
                    changeMouseMode(1);
                    break;
            case 1:
                    changeMouseMode(2);
                    break;
            case 2:
                    changeMouseMode(3);
                    break;
            case 3:
                    changeMouseMode(4);
                    break;
            case 4:
                    changeMouseMode(5);
                    break;
            case 5:
                    changeMouseMode(6);
                    break;
            case 6:
                    // Eraser 
                    changeMouseMode(0);
                    break;
            case 7:
                    runAlgo();
                    break;
            default:
                        console.log("Help");
                        break;
        }

    }

    render(){

        const className_sel = `button_weight button__selected`
        const className_notsel = `button_weight button_not_selected`
        var button_class = []
        for(let i=0; i<7; i++){
            const append_ = i===this.state.onButton ? className_sel : className_notsel;
            button_class.push(append_);
        }  


        return (
            <div className="wrapper_weight">
                    <button className={button_class[0]} onClick = {() => this.buttonClick(0)}>Wall</button>
                    <button className={button_class[1]} onClick = {() => this.buttonClick(1)}>2x</button>
                    <button className={button_class[2]} onClick = {() => this.buttonClick(2)}>3x</button>
                    <button className={button_class[3]} onClick = {() => this.buttonClick(3)}>4x</button>
                    <button className={button_class[4]} onClick = {() => this.buttonClick(4)}>5x</button>
                    <button className={button_class[5]} onClick = {() => this.buttonClick(5)}>6x</button>
                    <button className={button_class[6]} onClick = {() => this.buttonClick(6)}>Erase</button>
                    <button className="visuallize" onClick = {() => this.buttonClick(7)}>Visualise</button>
                </div>
                
        );
    }
}