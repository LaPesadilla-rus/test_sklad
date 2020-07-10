import React, {Component} from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';


export default class PostuplRow extends Component{
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
                    <td>{this.props.row.si_date}</td>
                    <td>{this.props.row.si_inv_num}</td>
                    <td>{this.props.row.equip_name}</td>
                    <td>{this.props.row.si_buh_name}</td>
                    <td>{this.props.row.un_name}</td>
                    <td>{this.props.row.si_amount}</td>
                    <td>{this.props.row.us_name}</td>
                    <td>{this.props.row.si_contr_num}</td>
                    <td>{this.props.row.si_contr_date}</td>
                </tr>
                         
        );
    }
}

