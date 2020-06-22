import React, {Component} from 'react';
import './out_form.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import Autocomplite from '../../../simple_comp/autocomplite/autocomplite';
import OutFromRow from './out_form_row.js';

export default class OutForm extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            data: [],
            kat_id: '',
            otd_id: '',
            mol_id: '',
            mol_data: [],
            eq_data: [],
            inv_data: [],
            act_row: [],
            eq_name: '',
            inv_num: '',
            amount: '',
            kol: '',
            out_arr: [],
            selDis: false,

        };
    }

    componentDidMount () {
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
            console.log(res.data);
        });
    }

    onClose = () => {
        this.props.onClose();
    }

    changeOtd = (e) => {
        var arr = [];
        this.state.data.mol_data.map(row => {
            if(row.mo_otd_id === parseInt(e.target.value)){
                arr.push(row);
            }
            return 0;
        });
        this.setState ({ 
            otd_id: e.target.value,
            mol_data: arr,
        });
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
        //console.log(row)
        console.log(this.state.data)
        if (row.equip_name){
            this.setState({
                inv_num: val,
                eq_name: row.equip_name,
                act_row: row,
                amount: row.st_amount,
            });
        }else{
            this.setState({
                eq_name: '',
                act_row: [],
                inv_num: val,
                amount: '-',
            });
        }
        
        
    }

    findRowEquip = (eq_val, inv_val) => {
        var arr = [];
        var data = this.state.data.equip_data;
        //console.log(data.length)
        data.forEach( (row, index) => {
            if (eq_val !== ''){
                if (row.equip_name === eq_val){
                    arr.push(row.st_inv_num); 
                }
            }else if (inv_val !== ''){
                if (row.st_inv_num === inv_val){
                   arr = row;
                   arr.index = index;
                   //data.splice(index, 1);
                }
            }
            return 0;
        });
        //console.log(data.length)
        /*var data = this.state.data.equip_data
        console.log(data.length)
        data.forEach(function(row, index, object) {
            if (eq_val !== ''){
                if (row.equip_name === eq_val){
                    arr = row;
                    data.splice(index, 1); 
                }
            }else if (inv_val !== ''){
                if (row.st_inv_num === inv_val){
                   arr = row;
                   data.splice(index, 1); 
                }
            }
        })
        console.log(data.length)*/
        return (arr);
    }

    outAdd = () => {
        var err = '';
        if (!this.state.act_row.st_id){
            err = 'Не выбран выписываемый элемент!;';
        }
        if (this.state.kol === '' || parseInt(this.state.kol) <= 0 || this.state.kol > this.state.amount){
            err = err + '  Списываемое количество введено не корректно!;';
        }
        if (this.state.otd_id === ''){
            err = err + '  Отдел не выбран!;';
        }
        if (this.state.mol_id === ''){
            err = err + '  Мол не выбран!;';
        }
        if (err !== ''){
            alert (err);
            return 0;
        }else{
            var arr = {};
            var row = [];
            var act_row = this.state.act_row;
            act_row.kol = this.state.kol;
            if (this.state.out_arr.equip){
                row = this.state.out_arr.equip;
                row.push(act_row);
            }else{
                row.push(act_row);
                row.old_kol = act_row.st_amount;
            }
            arr.equip = this.state.out_arr;
            arr.otd_id = this.state.otd_id;
            arr.mol_id = this.state.mol_id;
            arr.equip = row;
            this.setState({
                out_arr: arr,
                selDis: true,
            });
            arr = this.state.data;
            arr.equip_data[act_row.index].st_amount = arr.equip_data[act_row.index].st_amount - this.state.kol;
            //console.log(arr)
            this.setState({
                data: arr,
                amount: '',
                eq_name: '',
                inv_num: '',
                kol: '',
                act_row: ''
            })
        }
    }

    outTreb = () => {
        if (!this.state.out_arr.otd_id){
            alert('Заполните все поля! ');
            return 0;
        }

        var data = this.state.out_arr;
        data.user = 'admin';
        console.log(data);
        //console.log(data)
        //axio.post('/sklad/out', {data},  { responseType: 'arraybuffer' }).then(res=>{
        axio.post('/sklad/out', {data}).then(res=>{

            if (res.data.errTxt) {
                console.log(res.data);
                console.log(this.state.out_arr.equip[res.data.errPos]);
                var arr = this.state.out_arr;
                arr.equip[res.data.errPos].error = true;
                this.setState({
                    out_arr: arr 
                })
                return 0;
            }

            //const FileDownload = require('js-file-download');
            
            //var decodedString = String.fromCharCode.apply(null, new Uint16Array(res.data));
            //var obj = JSON.parse(decodedString);
            console.log('True');
            //FileDownload(res.data, 'Trebovanie.xlsx');
            //console.log(res.data)
           /*if (res.data !== 'OK'){
            alert(res.data);
            this.props.onReboot();
           }else{
            this.props.onReboot();
            this.props.onClose();
           }*/
        });

    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">
                    <div className='out_form'>
                        <p>Выписка</p>
                        <table>
                            <tbody>
                                <tr>
                                <td className='out_form_td1'>
                                    <label>Категория: </label>
                                </td>
                                <td className='out_form_td'>
                                    <select onChange={(e) => { this.setState ({ kat_id: e.target.value})}} value={this.state.kat_id}>
                                        <option key={this.nextUniqueId()} value='-1'></option>
                                        {this.state.data.kat_data && this.state.data.kat_data.map( row => <option key={this.nextUniqueId()} value={row.kat_id}>{row.kat_name}</option>)}     
                                    </select>
                                </td>
                                </tr>
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
                                <tr><td className='out_form_td1'><label>Остаток: </label></td><td className='out_form_td'><label>{this.state.amount}</label></td></tr>
                                <tr>
                                    <td className='out_form_td1'><label>Количество: </label></td>
                                    <td className='out_form_td' ><input type='number' onChange={(e) => { this.setState({ kol: e.target.value})}} value={this.state.kol}></input></td></tr>
                                <tr>
                                    <td className='out_form_td1'>
                                        <label>Отдел: </label>
                                    </td>
                                    <td className='out_form_td'>
                                        <select onChange={this.changeOtd} value={this.state.otd_id} disabled={this.state.selDis}>
                                            <option key={this.nextUniqueId()} value='-1'></option>
                                            {this.state.data.otd_data && this.state.data.otd_data.map( row => <option key={this.nextUniqueId()} value={row.ot_id}>{row.ot_name}</option>)}     
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                <td className='out_form_td1'>
                                    <label>МОЛ: </label>
                                </td>
                                <td className='out_form_td'>
                                    <select onChange={(e) => { this.setState ({ mol_id: e.target.value})}} value={this.state.mol_id} disabled={this.state.selDis}>
                                        <option key={this.nextUniqueId()} value='-1'></option>
                                        {this.state.mol_data && this.state.mol_data.map( row => <option key={this.nextUniqueId()} value={row.mo_id}>{row.mo_name}</option>)}     
                                    </select>
                                </td>
                                </tr> 
                            </tbody>
                        </table>
                        <div className='combo_div'>
                            <button className='button' onClick={this.outAdd}>Добавить к выписке</button>
                            <button className='button button_green' onClick={this.outTreb}>Требование</button>
                            <button className='button button_red' onClick={this.onClose}>Отмена</button>
                        </div>
                        <table className='out_form_bottom_table'>
                            <thead>
                                <tr>
                                    <th>Наименование</th>
                                    <th>Инв. номер</th>
                                    <th>Кол-во</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.out_arr.equip && this.state.out_arr.equip.map( row => <OutFromRow row={row} key={this.nextUniqueId()} /> )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}