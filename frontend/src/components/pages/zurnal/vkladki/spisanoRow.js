import React, { Component } from 'react';
import '../zurnal.css';
import axio from 'axios';
import UnicId from 'react-html-id';


export default class SpisanoRow extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            buttonStatus: 0,
        };
    }

    download = () => {
        let data = {
            docNum: this.props.row.lb_act_num,
            ac_id: this.props.row.ac_id,
            ac_name: this.props.row.ac_name
        }
        const FileDownload = require('js-file-download');
        axio.post('/zurnal/downloadFile', {data},  { responseType: 'arraybuffer' }).then(res=>{
            FileDownload(res.data, this.props.row.ac_name+'.xlsx');
        });
    }


    render() {
        return (
            <tr className='normalRec'>
                <td>{this.props.row.lo_date}</td>
                <td>{this.props.row.ac_name}</td>
                <td>{this.props.row.lb_act_num}</td>
                <td>{this.props.row.lb_inv_num}</td>
                <td>{this.props.row.equip_name}</td>
                <td>{this.props.row.lb_buh_name}</td>
                <td>{this.props.row.lb_amount}</td>
                {/*<td>{this.props.row.un_name}</td>
                    <td>{this.props.row.lb_amount}</td>*/}
                <td>{this.props.row.us_name}</td>
                <td><button className='button button_yellow' onClick={this.download}>Скачать</button></td>
            </tr>

        );
    }
}

