import React, {Component} from 'react';
import './out_form.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import Autocomplite from '../../../simple_comp/autocomplite/autocomplite';
import OutFromRow from './out_form_row.js';

import { connect } from 'react-redux';
import { setLoaderShow, setLoaderHide } from '../../../../store/loader/actions';

class OutForm extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.err_id = '';
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
            buh_name: '',
            out_arr: [],
            otd_name: '',
            mol_name: '',
            selDis: false,

        };
    }

    componentDidMount = async () => {
        var arr = [];
        var arr_inv = [];
        await axio.get('/sklad/out_data').then(res=>{
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

    onReboot () {
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

    changeOtd = (e) => {
        var arr = [];
        this.state.data.mol_data.map(row => {
            if(row.mo_otd_id === parseInt(e.target.value)){
                arr.push(row);
            }
            return 0;
        });
        this.state.data.otd_data.map( row => {
            if (row.ot_id === parseInt(e.target.value)){
                this.setState({
                    otd_name: row.ot_name //нужно отвязать от state
                })
            }
            return 0;
        })
        this.setState ({ 
            otd_id: e.target.value,
            mol_data: arr,
        });
    }

    changeMol = (e) => {
        this.state.data.mol_data.map(row => {
            if(row.mo_id === parseInt(e.target.value)){
                this.setState({
                    mol_name: row.mo_name,
                    mol_id: e.target.value
                })
            }
            return 0;
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

    outAdd = () => {
        var err = '';
        //console.log(this.state.out_arr.length)
        //console.log(this.state.act_row.)
        if (!this.state.act_row.st_inp_date){
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
        if (this.state.out_arr.length === 13){
            err = err + '  Достигнут максимум оборудования для выписки за 1 раз';
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
            arr.otd_name = this.state.otd_name;
            arr.mol_name = this.state.mol_name;
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

    outTreb = async () => {
        if (!this.state.out_arr.equip){
            alert('Таблица выписки пуста! ');
            return 0;
        }else{
            if (this.state.out_arr.equip.length === 0){
                alert('Таблица выписки пуста! ');
                return 0;
            }
        }
        this.props.setLoaderShow();
        var data = this.state.out_arr;
        let mas = {};
        data.user = 'admin';
        await axio.post('/sklad/out', {data}).then(res=>{
            console.log(res.data)
            mas = res.data
        });
        if (mas.errTxt) {
            //console.log(this.state.out_arr.equip[res.data.errPos]);
            var arr = this.state.out_arr;
            arr.equip[mas.errPos].error = true;
            this.err_id = arr.equip[mas.errPos].st_id;
            this.setState({
                out_arr: arr 
            });
            this.props.setLoaderHide();
            this.onReboot();
            this.props.onReboot();
            return 0;
        }else{
            await axio.post('/sklad/out_file', {data},  { responseType: 'arraybuffer' }).then(res=>{
                const FileDownload = require('js-file-download');
                FileDownload(res.data, 'Trebovanie.xlsx');
            });
            this.props.setLoaderHide();
            this.props.onReboot();
            this.props.onClose();
        }
    }

    delRow = (row) => {
        var arr = this.state.out_arr;
        for (var i = 0; i < arr.equip.length; i++){
            if (arr.equip[i].st_id === row.st_id){
                arr.equip.splice(i, 1);
                i = arr.equip.length + 1;
            }
        }
        this.setState({
            out_arr: arr 
        });
        arr = this.state.data;
        for (i = 0; i < arr.equip_data.length; i++){
            if (arr.equip_data[i].st_id === row.st_id && this.err_id !== row.st_id){
                arr.equip_data[i].st_amount = arr.equip_data[i].st_amount + parseInt(row.kol);
            }
        }
        this.setState({
            data: arr 
        });
        if (row.st_id === this.err_id){
            this.err_id = '';
        }console.log(arr.equip.data)
        
    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">
                    <div className='out_form'>
                        <p>Выписка</p>
                        <table>
                            <tbody>
                                {/*<tr>
                                <td className='out_form_td1'>
                                    <label>Категория: </label>
                                </td>
                                <td className='out_form_td'>
                                    <select onChange={(e) => { this.setState ({ kat_id: e.target.value})}} value={this.state.kat_id}>
                                        <option key={this.nextUniqueId()} value='-1'></option>
                                        {this.state.data.kat_data && this.state.data.kat_data.map( row => <option key={this.nextUniqueId()} value={row.kat_id}>{row.kat_name}</option>)}     
                                    </select>
                                </td>
                                </tr>*/}
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
                                <tr><td className='out_form_td1'><label>Наименование по бух.уч.: </label></td><td className='out_form_td'><label>{this.state.buh_name}</label></td></tr>
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
                                    <select onChange={this.changeMol} value={this.state.mol_id} disabled={this.state.selDis}>
                                        <option key={this.nextUniqueId()} value='-1'></option>
                                        {this.state.mol_data && this.state.mol_data.map( row => <option key={this.nextUniqueId()} value={row.mo_id}>{row.mo_name}</option>)}     
                                    </select>
                                </td>
                                </tr> 
                            </tbody>
                        </table>
                        <div className='combo_div'>
                            <button className='button' onClick={this.outAdd}>Добавить к выписке</button>
                            <button className={`button `+((this.state.out_arr.equip && (this.state.out_arr.equip.length > 0) ? `button_green` : `button_gray` ))+``} onClick={this.outTreb}>Требование</button>
                            <button className='button button_red' onClick={this.onClose}>Отмена</button>
                        </div>
                        <table className='out_form_bottom_table'>
                            <thead>
                                <tr>
                                    <th>Наименование</th>
                                    <th>Наименование по бух. уч.</th>
                                    <th>Инв. номер</th>
                                    <th>Кол-во</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.out_arr.equip && this.state.out_arr.equip.map( row => <OutFromRow row={row} key={this.nextUniqueId()} delRow={this.delRow} /> )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

const pushDispatchToProps = {
    setLoaderShow,
    setLoaderHide
};

export default connect(
    '',
    pushDispatchToProps,
)(OutForm)