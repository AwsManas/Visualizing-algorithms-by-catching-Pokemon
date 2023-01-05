import React , {Component} from "react";
import './css/Card.scss'
export default class Card extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render(){

        const {url , title , description , algorithm , callback, hyperlink , hypertext} = this.props;
        let hypertext_
        hypertext_ = hypertext === undefined ? '' : hypertext;
        return (
            <div className="card">
                <div className="card__body">
                    <img src= {url} className = "card__img" alt={title}/>
                    <h2 className="card__title">{title}</h2>
                    <p className="card__description">{description} {hypertext_.length > 0 && <a href = {hyperlink} target="_blank" rel="noreferrer" > {hypertext} </a>} </p>
                    <button className="card__button" onClick={()=> callback(algorithm)}>Select</button>
                </div>
                
            </div>
        );
    }
}