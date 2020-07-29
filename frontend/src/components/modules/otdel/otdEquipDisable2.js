import React, {Component} from 'react';
import './otdMain.css';

export default class OtdEquipsDisabled extends Component{

    render() {
        return (
            <tr className='button button_gray otdel_grow act_disable_button'>
                <td></td>
                <td>{this.props.mol && this.props.mol}</td>
                <td>{this.props.row.bl_inv_num}</td>
                <td>{this.props.row.equip_name}</td>
                <td>{this.props.row.bl_buh_name}</td>
                
                <td>{this.props.row.un_name}</td>
                
                <td>{this.props.row.bl_amount}</td>
                <td>{this.props.row.bl_prim}</td>
                <td></td>
            </tr>
        );
    }
}

