import React, {Component} from 'react';
import './out_form.css';

export default class OutFormRow extends Component{

    delClick = () => {
        this.props.delRow(this.props.row);
    }

    render() {
        return (
            <tr>
                <td className={'' + (this.props.row.error ? 'out_err_row' : 'out_form_bottom_table_td')}>{this.props.row.equip_name} {(this.props.row.error ? 'out_err_row' : 'фыв')}</td>
                <td className={'' + (this.props.row.error ? 'out_err_row' : 'out_form_bottom_table_td')}>{this.props.row.st_inv_num}</td>
                <td className={'' + (this.props.row.error ? 'out_err_row' : 'out_form_bottom_table_td')}>{this.props.row.kol}</td>
                <td><button className='button button_red' onClick={this.delClick}>X</button></td>
            </tr>
            
        );
    }
}