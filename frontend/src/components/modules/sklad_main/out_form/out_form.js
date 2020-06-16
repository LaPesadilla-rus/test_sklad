import React, {Component} from 'react';
import './out_form.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import Autocomplite from '../../../simple_comp/autocomplite/autocomplite';

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
            eq_name: '',

        };
    }

    componentDidMount () {
        var arr = [];
        axio.get('/sklad/out_data').then(res=>{
            res.data.equip_data.map(row => {
                arr.push(row.equip_name);
                return 0;
            })
            this.setState({
                data: res.data,
                eq_data: arr,
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
            if(row.mo_otd_id === e.target.value){
                arr.push(row);
            }
            return 0;
        })
        this.setState ({ 
            otd_id: e.target.value,
            mol_data: arr,
        });
    }

    setNomText = (val) => {
        this.setState({
            eq_name: val
        })
    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">
                    <div className='out_form'>
                        <p>OUT FORM</p>
                        <div className='out_form_div'>
                            <label>Категория: </label>
                            <select onChange={(e) => { this.setState ({ kat_id: e.target.value})}} value={this.state.kat_id}>
                                <option key={this.nextUniqueId()} value='-1'></option>
                                {this.state.data.kat_data && this.state.data.kat_data.map( row => <option key={this.nextUniqueId()} value={row.kat_id}>{row.kat_name}</option>)}     
                            </select>
                        </div>
                        <div className='combo_div'>
                            <label>Номенклатура: </label>
                            <div className='out_form_autoc'><Autocomplite modelText={this.state.eq_name} items_arr={this.state.eq_data} setText={this.setNomText} /></div>
                        </div>
                        <div className='combo_div'>
                            <label>Инв. номер: </label>
                            <div className='out_form_autoc'><Autocomplite  /></div>
                        </div>
                        <div><label>Остаток: </label><label>0</label></div>
                        <div><button className='button'>Найти</button></div>
                        <div><label>Количество: </label><input></input></div>
                        <div>
                            <label>Отдел: </label>
                            <select onChange={this.changeOtd} value={this.state.otd_id}>
                                <option key={this.nextUniqueId()} value='-1'></option>
                                {this.state.data.otd_data && this.state.data.otd_data.map( row => <option key={this.nextUniqueId()} value={row.ot_id}>{row.ot_name}</option>)}     
                            </select>
                        </div>
                        <div>
                            <label>МОЛ: </label>
                            <select onChange={(e) => { this.setState ({ mol_id: e.target.value})}} value={this.state.mol_id}>
                                <option key={this.nextUniqueId()} value='-1'></option>
                                {this.state.mol_data && this.state.mol_data.map( row => <option key={this.nextUniqueId()} value={row.mo_id}>{row.mo_name}</option>)}     
                            </select>
                        </div>
                        <div className='combo_div'>
                            <button className='button'>Добавить к выписке</button>
                            <button className='button button_green'>Требование</button>
                            <button className='button button_red' onClick={this.onClose}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}