import React, { Component } from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';


export default class SpisanoRow extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            buttonStatus: 0,
        };
    }


    render() {
        return (

            <tr className='normalRec'>
                <td>{this.props.row.lo_date}</td>
                <td>{this.props.row.ac_name}</td>
                <td>{this.props.row.lb_act_num}</td>
                <td>{this.props.row.lb_inv_num}</td>
                <td>{this.props.row.equip_name}</td>
                {/*<td>{this.props.row.un_name}</td>
                    <td>{this.props.row.lb_amount}</td>*/}
                <td>{this.props.row.us_name}</td>
                
            </tr>

        );
    }
}

