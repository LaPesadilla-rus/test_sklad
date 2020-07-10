import React, {Component} from 'react';
import './otdMain.css';

export default class OtdEquips2 extends Component{

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
        //console.log(this.props)
        let spsButton = <div className='button button_yellow' onClick={this.clickAct}>Списать</div>
        return (
                <tr className={`button `+((this.props.reg) ? 'button_red' : 'button_item')+`  otdel_grow`} >
                    <td onClick={this.clickMove}>{this.props.mol && this.props.mol}</td>
                    <td onClick={this.clickMove}>{this.props.row.bl_inv_num}</td>
                    <td onClick={this.clickMove}>{this.props.row.equip_name}</td>
                    <td onClick={this.clickMove}>{this.props.row.bl_buh_name}</td>
                    <td onClick={this.clickMove}>{this.props.row.un_name}</td>
                    <td onClick={this.clickMove}>{this.props.row.bl_amount}</td>
                    <td>{(this.props.reg !== '1') ? spsButton : ''}</td>
                </tr>
        );
    }
}

/*<div className='combo_div'>
                    <div className='button button_item otdel_grow ' onClick={this.clickMove}>{this.props.row.equip_name}</div>
                    {(this.props.reg !== '1') ? spsButton : ''}
                    
        </div>*/

