import React, {Component} from 'react';
import './out_form.css';

export default class OutFormRow extends Component{

    render() {
        return (
            <tr>
                <td>{this.props.row.equip_name}</td>
                <td>{this.props.row.st_inv_num}</td>
                <td>{this.props.row.kol}</td>
            </tr>
            
        );
    }
}