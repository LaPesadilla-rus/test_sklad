import React, {Component} from 'react';
import './otdMain.css';

export default class OtdEquips extends Component{

    clickMove = () => {
        this.props.clickEquip(this.props.row);
    }

    clickAct = () => {
        if (this.props.clickAct){
            this.props.clickAct(this.props.row);
        }
        //console.log(this.props.row)
        
    }

    render() {
        let spsButton = <div className='button button_yellow' onClick={this.clickAct}>Списать</div>
        return (
                <div className='combo_div'>
                    <div className='button button_item otdel_grow ' onClick={this.clickMove}>{this.props.row.equip_name}</div>
                    {(this.props.reg !== '1') ? spsButton : ''}
                    
                </div>
        );
    }
}

