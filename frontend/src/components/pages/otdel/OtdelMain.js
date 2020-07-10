import React, {Component} from 'react';
import './OtdelMain.css';
import axio from 'axios';
import UnicId from 'react-html-id';

import OtdBlock from '../../modules/otdel/otdBlock.js';
import OtdBlock2 from '../../modules/otdel/otdBlock2.js';
import Autocomplite from '../../simple_comp/autocomplite/autocomplite';
//import { otd_data } from '../../../../../backend/controllers/otdel';

export default class OtdelMain extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            data: [],
            filter_data: [],
            otd_id: '',
            mol_id: '',
            eq_name: '',
            eq_id: '',
            equip_data: [],
        };
    }

    componentDidMount = () => {
        var data = [];
        axio.get('/otdel/all2').then(res=>{
            this.setState({
                data: res.data
            });
        });
        axio.get('/otdel/filter_data').then(res=>{
            res.data.eq_data.forEach(row => {
                //console.log(row)
                data.push(row.equip_name);
            });
            //console.log(data)
            this.setState({
                filter_data: res.data,
                equip_data: data
            });
        });
    }

    onReboot = () => {
        axio.get('/otdel/all2').then(res=>{
            this.setState({
                data: res.data
            });
        });
    }

    enableFilter = () => {
        var id = '';
        if(this.state.eq_name !== ''){
            id = this.state.filter_data.eq_data.find(items => items.equip_name === this.state.eq_name).eq_id;
        }
        var data ={
            ot_id: this.state.otd_id,
            mo_id: this.state.mol_id,
            eq_id: id
        }
        if (data.ot_id === '-1'){
            data.ot_id = '';
        } 
        if (data.mo_id === '-1'){
            data.mo_id = '';
        }
        axio.post('/otdel/all_filter', {data}).then(res=>{
            this.setState({
                data: res.data
            });
            //console.log(res.data)
            //this.state.data.otd_data.otd_equip.lenght
            //this.state.data.otd_data.otd_equip.lenght
        });      
    }

    disableFilter = () => {
        var data ={
            ot_id: '',
            mo_id: ''
        } 
        axio.post('/otdel/all_filter', {data}).then(res=>{
            this.setState({
                data: res.data,
                ot_id: '-1',
                mo_id: '-1',
                eq_id: '',
                eq_name: '',
            });
        });      
    }
       
    Click = () => {
        this.state.data.otd_data.map(row => {console.log(row); return 0;})
        this.onReboot();
    }

    setText = (val) => {
        //var arr = this.state.filter_data.eq_data;
        this.setState({
            eq_name: val,
            //eq_id: arr.find(items => items.equip_name === val).eq_id,
        });
        
    }

    render() {
        return (
            <div className='otdel_base'>   
                <div className='otdel_main'>
                    <p>Фильтры</p>
                    <label>Отдел : </label>
                    <select onChange={(e) => { this.setState ({ otd_id: e.target.value})}} value={this.state.otd_id}>
                        <option key={this.nextUniqueId()} value='-1'></option>
                        {this.state.filter_data.otd_data && this.state.filter_data.otd_data.map( row => <option key={this.nextUniqueId()} value={row.ot_id}>{row.ot_name}</option>)}     
                    </select>
                    <label>МОЛ : </label>
                    <select onChange={(e) => { this.setState ({ mol_id: e.target.value})}} value={this.state.mol_id}>
                        <option key={this.nextUniqueId()} value='-1'></option>
                        {this.state.filter_data.mol_data && this.state.filter_data.mol_data.map( row => <option key={this.nextUniqueId()} value={row.mo_id}>{row.mo_name}</option>)}     
                    </select>
                    <div className='filter_div'>
                        <label>Наименование: </label>
                        <div className='filter_input'><Autocomplite modelText={this.state.eq_name} items_arr={this.state.equip_data} setText={this.setText} /></div>
                    </div>
                    <button className='button' onClick={this.enableFilter}>Применить фильтр</button>
                    <button className='button' onClick={this.disableFilter}>Сбросить фильтр</button>
                </div>
                {(this.state.data.otd_data) ? this.state.data.otd_data.map(row => <OtdBlock2 key={this.nextUniqueId()} 
                                                                                                data={this.state.data}
                                                                                                row={row}
                                                                                                onReboot={this.onReboot}/>) : ''}  
            </div>
        );
    }
}
/**
 * <button onClick={this.Click}>asdsad</button>
 */

