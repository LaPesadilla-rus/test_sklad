import React, {Component} from 'react';
import './otdMain.css';

export default class OtdEquipsDisabled extends Component{

    render() {
        return (
                <div className='combo_div'>
                    <div className='button button_gray otdel_grow act_disable_button ' >{this.props.row.equip_name}</div>
                    <div className='button button_gray otdel_grow ' >{this.props.row.ot_name}</div>
                </div>
        );
    }
}

