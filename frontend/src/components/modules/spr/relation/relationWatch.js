import React, {Component} from 'react';
import './relationWatch.css';
import UnicId from 'react-html-id';
import axio from 'axios';

import Autocomplite from '../../../simple_comp/autocomplite/autocomplite';
import RelationWatchBlock from './relationWatchBlock';

export default class RelationWatch extends Component {
    constructor (props){
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            kat_data: [],
            data: [],
            equip_name: '',
            eq_data: [],
            inv_data: [],
            act_row: [],
            eq_name: '',
            inv_num: '',
            buh_name: '',
            rel_data: [],
        }
    }

    componentDidMount = async () =>{
        axio.get('/spr/filter_data').then(res=>{
            this.setState({
                data: res.data,
            });
            console.log(res.data)
        });
        var arr = [];
        var arr_inv = [];
        axio.get('/sklad/out_data').then(res=>{
            res.data.equip_data.map(row => {
                arr.push(row.equip_name);
                arr_inv.push(row.st_inv_num)
                return 0;
            })
            this.setState({
                data: res.data,
                eq_data: arr,
                inv_data: arr_inv,
            });
            //console.log(res.data);
        });
    }

    onClose = () => {
        this.props.onClose();
    }

    setText = (val) => {
        this.setState({
            equip_name: val
        })
    }

    setNomText = (val) => {
        var row = this.findRowEquip(val, '');
        if (row.length > 0){
            this.setState({
                eq_name: val,
                inv_data: row,
                //act_row: row,
                //inv_num: row.st_inv_num,
                //amount: row.st_amount,
            });
        }else{
            this.setState({
                eq_name: val,
                act_row: [],
                inv_num: '',
                amount: '-',
            });
        }
    }

    setInvText = (val) => {
        var row = this.findRowEquip('', val);
        console.log(row)
        //console.log(this.state.data)
        if (row.equip_name){
            this.setState({
                inv_num: val,
                eq_name: row.equip_name,
                act_row: row,
                amount: row.st_amount,
                buh_name: row.st_buh_name,
            });
        }else{
            this.setState({
                eq_name: '',
                act_row: [],
                inv_num: val,
                amount: '-',
                buh_name: '-'
            });
        }
    }

    findRowEquip = (eq_val, inv_val) => {
        var arr = [];
        var data = this.state.data.equip_data;
        var inv = inv_val + '',
        eq = eq_val + '';
        data.forEach( (row, index) => {
            if (eq_val !== ''){
                if (row.equip_name === eq){
                    arr.push(row.st_inv_num); 
                }
            }else if (inv_val !== ''){
                //console.log(row.st_inv_num + ' : ' + inv) 
                if (row.st_inv_num === inv){
                   arr = row;
                   arr.index = index;
                   //data.splice(index, 1);
                   //console.log('TRUE')
                   //console.log(arr)
                }
            }
        });
        return (arr);
    }

    onWatch = () => {
        let data = {
            row: this.state.act_row
        }
        axio.post('/spr/relation/watch', {data}).then(res=>{
            console.log(res.data)
            this.setState({
                rel_data: res.data
            })
        });
    }

    render(){
        return(
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">
                    <div className='relation_watch'>
                        <div className='watch_filter'>
                            <table>
                                <tbody>
                                    <tr>
                                    <td className='out_form_td1'>
                                        <label>Номенклатура: </label>
                                    
                                    </td>
                                    <td className='out_form_td'><Autocomplite modelText={this.state.eq_name} items_arr={this.state.eq_data} setText={this.setNomText} /></td>
                                    </tr>
                                    <tr className='out_form_td'>
                                    <td className='out_form_td1'>
                                        <label>Инв. номер: </label>
                                        
                                    </td>
                                    <td className='out_form_td'><Autocomplite modelText={this.state.inv_num} items_arr={this.state.inv_data} setText={this.setInvText} /></td>
                                    </tr>
                                    <tr><td className='out_form_td1'><label>Наименование по бух.уч.: </label></td><td className='out_form_td'><label>{this.state.buh_name}</label></td></tr>
                                </tbody>
                            </table> 
                        </div>
                        <RelationWatchBlock osn_name={this.state.act_row.equip_name} data={this.state.rel_data}/>
                        <button className='button button_green' onClick={this.onWatch}>Показать</button>
                        <button className='button button_red' onClick={this.onClose}>Закрыть</button>
                    </div>
                </div>
            </div>
        )
    }
}