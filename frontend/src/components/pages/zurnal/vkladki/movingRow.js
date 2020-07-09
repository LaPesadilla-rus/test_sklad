import React, {Component} from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';


export default class MovingRow extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            buttonStatus: 0,
        };
    }


    render() {
        return (
                
                <tr className={(this.props.row.mol1 === this.props.row.mol2) ? ' offTheRec ' : 'normalRec'}>
                    <td>{this.props.row.et_date}</td>
                    <td>{this.props.row.bl_inv_num}</td>
                    <td>{this.props.row.equip_name}</td>
                    <td>{this.props.row.us_name}</td>
                    <td>{this.props.row.mol1}</td>
                    <td>{this.props.row.otd1}</td>
                    <td>{this.props.row.mol2}</td>
                    <td>{this.props.row.otd2}</td>
                </tr>
                         
        );
    }
}

