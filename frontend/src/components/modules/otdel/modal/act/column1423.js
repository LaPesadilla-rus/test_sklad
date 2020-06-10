import React, {Component} from 'react';
import './act.css';

export default class Column extends Component{

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.indx}</td>
                    <td>{this.props.data.equip_name}</td>
                    <td>{this.props.data.bl_inv_num}</td>
                    <td>{this.props.data.un_name}</td>
                    <td>1</td>
                </tr>
            </React.Fragment>
        );
    }
}