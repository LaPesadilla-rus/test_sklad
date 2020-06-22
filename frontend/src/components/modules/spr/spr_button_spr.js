import React, {Component} from 'react';
import './spr_block.css';

export default class Spr_button_spr extends Component {


    onClick = () => {
        this.props.changeSpr(this.props.row);
    }
    render(){
        return(
            <button className='button' onClick={this.onClick}>{this.props.row.name}</button>
        )
    }          
}