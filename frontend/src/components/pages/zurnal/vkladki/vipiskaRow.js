import React, {Component} from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';


export default class VipiskaRow extends Component{
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
                    <td>{this.props.row.so_date}</td>
                    <td>{this.props.row.so_inv_num}</td>
                    <td>{this.props.row.equip_name}</td>
                    <td>{this.props.row.so_buh_name}</td>
                    <td>{this.props.row.un_name}</td>
                    <td>{this.props.row.so_amount}</td>
                    <td>{this.props.row.us_name}</td>
                    <td>{this.props.row.mo_name}</td>
                    <td>{this.props.row.ot_name}</td>
                </tr>
                         
        );
    }
}

