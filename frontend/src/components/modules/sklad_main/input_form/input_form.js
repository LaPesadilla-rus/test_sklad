import React, {Component} from 'react';
import './input_form.css';
import axio from 'axios';
import PropTypes from 'prop-types';
import UnicId from 'react-html-id';
import SprItem from '../../spr/spr_item/spr_item';
import Autocomplite from '../../../simple_comp/autocomplite/autocomplite';
import NewEquip from '../../spr/new_equip/new_equip';

const BlockItem = (props) => {
    return  <tr className="data-table__body data-table__body_pos">
                <td className='data-table__cell data-table__cell_pos cell_1'>{props.dogvr_num}</td> 
                <td className='data-table__cell data-table__cell_pos cell_2'>{props.inv_num}</td> 
                <td className='data-table__cell data-table__cell_pos cell_3'>{props.name}</td>
                <td className='data-table__cell data-table__cell_pos cell_4'>{props.units}</td>
                <td className='data-table__cell data-table__cell_pos cell_5'>{props.kol}</td>
                <td className='data-table__cell data-table__cell_pos cell_6'>{props.prim}</td>
            </tr>        
}

export default class Input_form extends Component {
    constructor(props) {
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            name: '',
            provider: '',
            units: '0',
            f_name: '1',
            kol: '',
            date: '',
            prim: '',
            inv_num: '',
            dogvr_num: '',
            mol: '',
            type_data: [],
            kat_data: [],
            prov_data: [],
            marka_data: [],
            units_data: [],
            hyst_data: [],
            full_name: [],
            equip_arr: [],
            isModalOpen: false,
            isNewEquip: false,
            isSelectEquip: false,
            equip_name: '',
        };

    }

    componentDidMount = () => {
        axio.get('./new/type').then(res=>{
            this.setState({
                type_data: res.data
            });
        });
        axio.get('/sklad/new/marka').then(res=>{
            this.setState({
                marka_data: res.data
            });
        });
        axio.get('./new/provider').then(res=>{
            this.setState({
                prov_data: res.data
            });
        });
        axio.get('./new/units').then(res=>{
            this.setState({
                units_data: res.data
            });
        });
        axio.get('./new/kat').then(res=>{
            this.setState({
                kat_data: res.data
            });
        });
        axio.get('/spr/equip/fullname').then(res=>{
            var mas = []
            for (let n = 0; n < res.data.length; n++){
                mas[n] = res.data[n].item;
            }
            this.setState({
                full_name: mas,
                equip_arr: res.data,
            });
        });
        if (this.props.row){
            //var id_item = this.props.row.st_id;
            //console.log(this.props.row)
            this.setState({
                provider: this.props.row.st_pr_id,
                units: this.props.row.st_un_id,
                kol: this.props.row.st_amount,
                date: this.props.row.to_char,
                inv_num: this.props.row.st_inv_num,
                dogvr_num: this.props.row.st_contr_num,
                equip_name: this.props.row.te_name + ' ' + this.props.row.eq_name,
            });
            if (this.props.row.st_prim) {
                this.setState({
                    prim: this.props.row.st_prim
                })
            }
        }
        //console.log(this.props)
        /*console.log(this.props)
        if (isEmpty(this.props.id_item)) {
            const id_item = this.props.id_item;
            console.log(id_item)
        }else{
            console.log('empty')
        }*/
    }

    handleSaveAndCopy = event => {
        event.preventDefault();
        var units = parseInt(this.state.units);
        var prov = parseInt(this.state.provider);
        var txt = this.state.equip_name;
        if (!this.searchNameInArr(txt, this.state.equip_arr) ) {
            alert("Оборудования нет в базе!")
            return;
        }
        if(this.state.provider === '-1' || this.state.provider.length === 0){
            alert("Поставщик не выбран!")
            return;
        }
        const data = {
            equip_name: this.state.equip_name,
            equip_id: this.state.equip_arr.find(items => items.item === txt).eq_id,
            units_name: this.state.units_data.find(items => items.un_id === units).un_name,
            units_id: this.state.units,
            f_name: this.state.f_name,
            kol: this.state.kol,
            date: this.state.date,
            prim: this.state.prim,
            inv_num: this.state.inv_num,
            provider: this.state.prov_data.find(items => items.pr_id === prov).pr_name,
            provider_id: this.state.provider,
            dogvr_num: this.state.dogvr_num,
            user: 'admin',
        };
        var stat = this.saveDB(data);
        var n = this.state.hyst_data.length
        if (stat){
            if (n > 0) {
                if(this.state.hyst_data[n-1].dogvr_num !== this.state.dogvr_num || this.state.hyst_data[n-1].date !== this.state.date || this.state.hyst_data[n-1].provider !== data.provider){
                        stat = false;
                        this.setState({
                            hyst_data: [data],
                            equip_name: '',
                            inv_num: '',
                            kol: '',
                            prim: '',
                        });
                        return;
                        
                }
            }
            this.setState({
                hyst_data: [...this.state.hyst_data, data],
                equip_name: '',
                inv_num: '',
                kol: '',
                prim: '',
            });
        }
    };

    
    ClearTable = () => {
        this.setState({ hyst_data: []})
    };

    saveDB = (data) => {
        var err = '';
        //console.log(data)
        var stat = false
        if (data.inv_num === ''){
            err = err + 'Инвентарный номер не введен! ';
        }
        if (data.dogvr_num === ''){
            err = err + 'Номер договора не введен! ';
        }
        if (data.equip_name === ''){
            err = err + 'Оборудование не выбрано! ';
        }
        if (data.provider === ''){
            err = err + 'Поставщик не выбран! ';
        }
        if (data.kol === ''){
            err = err + 'Количество не введено! ';
        }
        if (data.date === ''){
            err = err + 'Дата не введена! ';
        }
        if (err !== ''){
            alert(err);
        }else{
            stat = true;
            axio.post('/sklad/new/save', {data}).then(res => {
                console.log(res.data);
                if (res.data === 'POST COMPLITE') {
                    alert('Сохранение успешно');
                }else{
                    alert('Данные не удалось сохранить');
                }
            });
        }
        return stat;
    }

    handleSubmit = () => {
        //event.preventDefault();
        var units = parseInt(this.state.units);
        var prov = parseInt(this.state.provider);
        var txt = this.state.equip_name;
        if (!this.searchNameInArr(txt, this.state.equip_arr) ) {
            alert("Оборудования нет в базе!")
            return;
        }
        if(this.state.provider === '-1' || this.state.provider.length === 0){
            alert("Поставщик не выбран!")
            return;
        }
        const data = {
            equip_name: this.state.equip_name,
            equip_id: this.state.equip_arr.find(items => items.item === txt).eq_id,
            units_name: this.state.units_data.find(items => items.un_id === units).un_name,
            units_id: this.state.units,
            f_name: this.state.f_name,
            kol: this.state.kol,
            date: this.state.date,
            prim: this.state.prim,
            inv_num: this.state.inv_num,
            provider: this.state.prov_data.find(items => items.pr_id === prov).pr_name,
            provider_id: this.state.provider,
            dogvr_num: this.state.dogvr_num,
            user: 'admin',
        };
        var stat = this.saveDB(data);
        if (stat){
            this.ClearTable();
            this.setState({
                equip_name: '',
                inv_num: '',
                kol: '',
                prim: '',
                provider: '-1',
                date: '',
                dogvr_num: '',
            });
            this.props.onReboot();
            this.ChangeProvider({target: {value: '-1'}});
        }
    }

    handleUpdate = event => {
        if(this.state.provider === '-1' || this.state.provider.length === 0){
            alert("Поставщик не выбран!")
            return;
        }
        const data = {
            equip_name: this.state.equip_name,
            equip_id: this.props.row.eq_id,
            units_name: this.props.row.un_name,
            units_id: this.state.units,
            f_name: this.state.f_name,
            kol: this.state.kol,
            date: this.state.date,
            prim: this.state.prim,
            inv_num: this.state.inv_num,
            provider: this.props.row.pr_name,
            provider_id: this.state.provider,
            dogvr_num: this.state.dogvr_num,
            st_id: this.props.row.st_id,
            user: 'Admin',
            row: this.props.row,
        };
        var err = '';
        //console.log(data)
        if (data.inv_num === ''){
            err = err + 'Инвентарный номер не введен! ';
        }
        if (data.dogvr_num === ''){
            err = err + 'Номер договора не введен! ';
        }
        if (data.equip_name === ''){
            err = err + 'Оборудование не выбрано! ';
        }
        if (data.provider === ''){
            err = err + 'Поставщик не выбран! ';
        }
        if (data.kol === ''){
            err = err + 'Количество не введено! ';
        }
        if (data.date === ''){
            err = err + 'Дата не введена! ';
        }
        if (err !== ''){
            alert(err);
        }else{
            axio.post('/sklad/new/update', {data}).then(res => {
                //console.log(res.data);
                if (res.data === 'POST COMPLITE') {
                    //alert('Update успешно');
                    this.props.onClose();
                    this.props.onReboot();
                }else{
                    alert('Данные не удалось сохранить');
                }
            });
        }
    }

    handleChange = event => {
        if (event.target.name === 'name')
            this.setState({name: event.target.value});
        //console.log(event.target.name);
    };

    ChangeDate = event => {
        this.setState({date: event.target.value});
        console.log(event.target.value)
    };
  
    ChangeProvider = event => {
        this.setState({provider: event.target.value});
        //console.log(event.target.value);
    };

    ChangeFirm = event => {
        this.setState({f_name: event.target.value});
    };

    ChangeKol = event => {
        this.setState({kol: event.target.value});
    };

    ChangePrim = e =>{
        this.setState({prim: e.target.value});
    };

    changeModal = () => {
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    changeNewEquip = () => {
        this.setState(state => ({ isNewEquip: !state.isNewEquip}))
    }

    changeSelectEquip = () => {
        this.setState(state => ({ isSelectEquip: !state.isSelectEquip}))
    }

    onReboot = () =>{
        axio.get('./new/provider').then(res=>{
            this.setState({
                prov_data: res.data
            });
        });
        axio.get('/spr/equip/fullname').then(res=>{
            var mas = []
            for (let n = 0; n < res.data.length; n++){
                mas[n] = res.data[n].item;
            }
            this.setState({
                full_name: mas,
                equip_arr: res.data,
            });
        });
    }

    setText= (val) => {
        this.setState({equip_name: val})
    }

    searchNameInArr (val,arr) {
        //arr = this.props.equip_arr;
        var id = false
        arr.forEach(function(item){
            if (item.item === val){
                id =  true;
            }
        })
        return (id)
    }

    handleOut = () => {
        console.log(this.props.id_item)
        var data = {
            id_item: this.props.id_item,
            mol: '1',
            user: 'admin',
            kol: '1',
        }

        axio.post('/sklad/out', {data}).then(res => {
            console.log(res.data);
            if (res.data === 'UPDATE COMPLITE') {
                alert('Заявка отправлена успешно');
            }else{
                alert('Данные не удалось отправить');
            }
        });
    }
    // Загрузка файла!!!!
    /*handleDownload = () => {
        const data = {
            user: 'admin',
            test: 'asd'
        }
        const FileDownload = require('js-file-download');
        
        axio.post('/sklad/download', {data},  { responseType: 'arraybuffer' }).then(res => {
            FileDownload(res.data, '14-23.xlsx');
        });
    }*/

    render () {
        let redactItem = <div className='input_form__bb input_form__bb_pos'>
                        <button type='button' onClick={this.handleUpdate} className="button">
                            Редактировать
                        </button>
                        
                        <button type='button' onClick={this.props.onClose} className="button button_red" >
                            Отмена
                        </button>
                    </div>;
        let newItem = <div className='input_form__bb input_form__bb_pos'>
                        <button type='button' onClick={this.handleSubmit} className="button">
                            Сохранить
                        </button>
                        <button type='button' onClick={this.handleSaveAndCopy} className="button" >
                            Сохранить и дублировать
                        </button>
                        <button type='button' onClick={this.props.onClose} className="button button_red" >
                            Отмена
                        </button>
                    </div>;
        let oldEquip = <tr>
                            <td className='cell_name' ><p>Оборудование:  </p></td>
                            <td ><label>{this.state.equip_name}</label></td>
                        </tr>;
        let newEquip = <tr>
                            <td className='cell_name' ><p>Поиск оборудования</p></td>
                            <td ><Autocomplite modelText={this.state.equip_name} items_arr={this.state.full_name} setText={this.setText}/></td>
                        </tr>;
        return (
            <div className='background_modal background_modal_pos'>
                    <div className="modal modal_pos">
            <div className="input_form input_form_pos">
                <form onSubmit={this.handleSubmit}>
                    <table className='input_form__table input_form__table_pos'>
                        <thead>
                        <tr>
                            <th className='cell_name'>
                                <p>Поставщик </p>
                            </th>
                            <th className='cell_content'>
                                <select id="elem_type" name='e_type' onChange={this.ChangeProvider} value={this.state.provider}>
                                    <option key={this.nextUniqueId()} value='-1'></option>
                                    {this.state.prov_data.map( id => <option key={this.nextUniqueId()} value={id.pr_id}>{id.pr_name}</option>)}     
                                </select>
                                
                            </th>
                            <th><div onClick={this.changeModal} className="data-table__body data-table__body_pos spr_block_text"><label>+</label></div></th>
                            <th className='cell_name'>
                                <p>Номер договора</p>
                            </th>
                            <th className='cell_content'><input type='text' onChange={(e) => {this.setState({ dogvr_num: e.target.value})}} value={this.state.dogvr_num} ></input></th>
                            <th className='cell_name'>
                                <p>Дата договора</p>
                            </th>
                            <th className='cell_content'><input type="date" name='date' onChange={this.ChangeDate} value={this.state.date}></input></th>
                        </tr>
                        </thead>
                    </table>
                    <table className='input_form__table input_form__table_pos'>
                        <tbody>
                            {this.props.row ? oldEquip : newEquip}
                            {!this.props.row && <tr>
                                                    <td><button type='button' className='button' onClick={this.changeSelectEquip}>Выбрать оборудование</button></td>
                                                    <td><button type='button' className='button' onClick={this.changeNewEquip}>Добавить оборудование</button></td>
                                                </tr>}
                            <tr>
                                <td className='cell_name'><p>Инвентарный номер</p></td>
                                <td><input onChange={(e) => {this.setState({inv_num: e.target.value})}} value={this.state.inv_num}></input></td>
                            </tr>
                            <tr>
                                <td className='cell_name'><p>Ед. измерения</p></td>
                                <td><select id="elem_type" name='e_type' onChange={(e) => { console.log(e.target.text); this.setState({units: e.target.value})}} value={this.state.units}>
                                    {this.state.units_data.map( id => <option key={this.nextUniqueId()} title={id.un_name} value={id.un_id}>{id.un_name}</option>)}  
                                </select></td>
                            </tr>
                            <tr>
                                <td className='cell_name'><p>Количество</p></td>
                                <td><input name='kol' type='number' onChange={this.ChangeKol} value={this.state.kol}></input></td>
                            </tr>
                            <tr>
                                <td className='cell_name'><p>Примечание</p></td>
                                <td><textarea name='prim' onChange={this.ChangePrim} value={this.state.prim}></textarea></td>
                            </tr>

                        </tbody>
                    </table>
                    {this.props.row ? redactItem : newItem}
                </form>
                {!this.props.row && <table className="data-table data-table_pos">
                    <thead>
                        <tr className="data-table__head data-table__body_pos" onClick={this.handleSubmit} id='123'>
                            <th className='data-table__cell data-table__cell_pos cell_1'>Номер договора</th> 
                            <th className='data-table__cell data-table__cell_pos cell_2'>Инв номер</th> 
                            <th className='data-table__cell data-table__cell_pos cell_3'>Наименование</th>
                            <th className='data-table__cell data-table__cell_pos cell_4'>Ед.изм</th>
                            <th className='data-table__cell data-table__cell_pos cell_5'>Кол-во</th>
                            <th className='data-table__cell data-table__cell_pos cell_6'>Примечание</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.hyst_data.map( id =>  <BlockItem 
                                                                key={this.nextUniqueId()} kol={id.kol} date='20.20.2020' 
                                                                kod='AAAA' dogvr_num={id.dogvr_num} id='12' units={id.units_name} prim={id.prim} inv_num={id.inv_num}
                                                                name={id.equip_name}
                                                            />)
                        }
                       
                    </tbody>
                </table>}
                
                {this.state.isModalOpen &&
                    <SprItem onClose={this.changeModal} onReboot={this.onReboot} act='submit' name='Поставщик' table='provider_spr'/>
                }
                {this.state.isNewEquip &&
                    <NewEquip onClose={this.changeNewEquip} onReboot={this.onReboot} act='insert' />
                }
                {this.state.isSelectEquip &&
                    <NewEquip 
                        onClose={this.changeSelectEquip} onReboot={this.onReboot} 
                        act='select' equip_arr={this.state.equip_arr} 
                        setText={this.setText} equip_name={this.state.equip_name} 
                        marka_data={this.state.marka_data} type_data={this.state.type_data}
                    />
                }

            </div>
            </div>
            </div>
            
        );
    }
}

BlockItem.propTypes = {
    id_item: PropTypes.string
  };