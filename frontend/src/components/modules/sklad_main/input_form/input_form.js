import React, {Component} from 'react';
import './input_form.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import SprItem from '../../spr/spr_item/spr_item';
import Autocomplite from '../../../simple_comp/autocomplite/autocomplite';
import NewEquip from '../../spr/new_equip/new_equip';

const BlockItem = (props) => {
    return  <tr className="data-table__body data-table__body_pos">
                <td className='data-table__cell data-table__cell_pos cell_1'>{props.kat}</td> 
                <td className='data-table__cell data-table__cell_pos cell_2'>{props.inv_num}</td> 
                <td className='data-table__cell data-table__cell_pos cell_3'>{props.name}</td>
                <td className='data-table__cell data-table__cell_pos cell_4'>{props.units}</td>
                <td className='data-table__cell data-table__cell_pos cell_5'>{props.kol}</td>
                <td className='data-table__cell data-table__cell_pos cell_6'>{props.prim}</td>
            </tr>        
}

export default class Input_form extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            name: '',
            provider: '1',
            units: '1',
            f_name: '1',
            kol: '',
            date: '',
            prim: '',
            inv_num: '',
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
    }

    handleSaveAndCopy = event => {
        var units = parseInt(this.state.units);
        //var equip_name = this.state.equip_name;
        var prov = parseInt(this.state.provider);
        console.log(this.state.prov_data.find(items => items.pr_id === prov).pr_name)
        const data = {
            equip_name: this.state.equip_name,
            units_name: this.state.units_data.find(items => items.un_id === units).un_name,
            f_name: this.state.f_name,
            kol: this.state.kol,
            date: this.state.date,
            prim: this.state.prim,
            inv_num: this.state.inv_num,
            provider: this.state.prov_data.find(items => items.pr_id === prov).pr_name,
        };
        var stat = this.saveDB(data);
        if (stat){
            this.setState({
                hyst_data: [...this.state.hyst_data, data]
            });
        }
            
        
    };

    
    ClearTable = () => {
        this.setState({ hyst_data: []})
    };

    saveDB = (arr) => {
        var err = '';
        console.log(arr)
        var stat = false
        if (arr.inv_num === ''){
            err = err + 'Инвентарный номер не введен! ';
        }
        if (arr.equip_name === ''){
            err = err + 'Оборудование не выбрано! ';
        }
        if (arr.provider === ''){
            err = err + 'Поставщик не выбран! ';
        }
        if (arr.kol === ''){
            err = err + 'Количество не введено! ';
        }
        if (arr.date === ''){
            err = err + 'Дата не введена! ';
        }
        if (err !== ''){
            alert(err);
        }else{
            stat = true;
        }
        //console.log(err)
        return stat;
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            name: this.state.name,
            e_type: this.state.e_type,
            f_name: this.state.f_name,
            kol: this.state.kol,
            date: this.state.date,
            prim: this.state.prim,
        }

        this.setState({
            hyst_data: data
        });
        

        console.log(this.setState.hyst_data);

        var err = '';
        if (data.name === ''){
            err = err + 'Инвентарный номер не введен!';
        }
        if (data.kol === ''){
            err = err + 'Количество не введено!';
        }
        if (data.date === ''){
            err = err + 'Дата не введена!';
        }
        if (!err === ''){
            alert(err);
        }else{
            console.log(data);
            /*axio.post('/sklad/new/save', {data}).then(res => {
            console.log(res.data);
            if (res.data = 'POST COMPLITE') {
                alert('Сохранение успешно');
                this.props.history.push('/sklad/all');
            }else{
                alert('Данные не удалось сохранить');
            }
            });*/
        }

        this.ClearTable();
        
    }

    handleChange = event => {
        if (event.target.name === 'name')
            this.setState({name: event.target.value});
        //console.log(event.target.name);
    };

    ChangeDate = event => {
        this.setState({date: event.target.value});
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
        var arr = this.props.equip_arr;
        var id = false
        arr.forEach(function(item){
            if (item.eq_name === val){
                id =  true;
            }
        })
        return (id)
    }


    render () {
        return (
            <div className="input_form input_form_pos">
                <form onSubmit={this.handleSubmit}>
                    <table className='input_form__table input_form__table_pos'>
                        <thead>
                        <tr>
                            <th className='cell_name'>
                                <p>Поставщик </p>
                            </th>
                            <th className='cell_content'>
                                <select id="elem_type" name='e_type' onChange={this.ChangeProvider}>
                                    {this.state.prov_data.map( id => <option key={id.pr_id} value={id.pr_id}>{id.pr_name}</option>)}     
                                </select>
                                
                            </th>
                            <th><div onClick={this.changeModal} className="data-table__body data-table__body_pos spr_block_text"><label>+</label></div></th>
                            <th className='cell_name'>
                                <p>Номер договора</p>
                            </th>
                            <th className='cell_content'><input></input></th>
                            <th className='cell_name'>
                                <p>Дата договора</p>
                            </th>
                            <th className='cell_content'><input type="date" name='date' onChange={this.ChangeDate}></input></th>
                        </tr>
                        </thead>
                    </table>
                    <table className='input_form__table input_form__table_pos'>
                        <tbody>
                        <tr>
                            <td className='cell_name' ><p>Поиск оборудования</p></td>
                            <td ><Autocomplite modelText={this.state.equip_name} items_arr={this.state.full_name} setText={this.setText}/></td>
                        </tr>
                        <tr>
                            <td><p><button type='button' className='button' onClick={this.changeSelectEquip}>Выбрать оборудование</button></p></td>
                            <td><p><button type='button' className='button' onClick={this.changeNewEquip}>Добавить оборудование</button></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Инвентарный номер</p></td>
                            <td><p><input onChange={(e) => {this.setState({inv_num: e.target.value})}} value={this.state.inv_num}></input></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Ед. измерения</p></td>
                            <td><p><select id="elem_type" name='e_type' onChange={(e) => { console.log(e.target.text); this.setState({units: e.target.value})}} value={this.state.units}>
                                {this.state.units_data.map( id => <option key={id.un_id} title={id.un_name} value={id.un_id}>{id.un_name}</option>)}  
                            </select></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Количество</p></td>
                            <td><p><input name='kol' type='number' onChange={this.ChangeKol}></input></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Примечание</p></td>
                            <td><p><textarea name='prim' onChange={this.ChangePrim}></textarea></p></td>
                        </tr>
                        
                        </tbody>
                    </table>
                    <div className='input_form__bb input_form__bb_pos'>
                        <button type='submit' className="button">
                            Сохранить
                        </button>
                        <button type='button' onClick={this.handleSaveAndCopy} className="button" >
                            Сохранить и дублировать
                        </button>
                        <button type='reset' className="button button_red" >
                            Отмена
                        </button>
                    </div>
                </form>
                <table className="data-table data-table_pos">
                    <thead>
                        <tr className="data-table__head data-table__body_pos" onClick={this.handleSubmit} id='123'>
                            <th className='data-table__cell data-table__cell_pos cell_1'>Категория</th> 
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
                                                                kod='AAAA' kat='KAT' id='12' units={id.units_name} prim={id.prim} inv_num={id.inv_num}
                                                                name={id.equip_name}
                                                            />)
                        }
                       
                    </tbody>
                </table>
                {this.state.isModalOpen &&
                    <SprItem onClose={this.changeModal} onReboot={this.onReboot} act='submit' name='Поставщик' table='provider_spr'/>
                }
                {this.state.isNewEquip &&
                    <NewEquip onClose={this.changeNewEquip} act='insert' />
                }
                {this.state.isSelectEquip &&
                    <NewEquip 
                        onClose={this.changeSelectEquip} setText={this.setText} 
                        act='select' equip_arr={this.state.equip_arr} 
                        setText={this.setText} equip_name={this.state.equip_name} 
                        marka_data={this.state.marka_data} type_data={this.state.type_data}
                    />
                }

            </div>
        );
    }
    
}

/*
 <tr className="data-table__body data-table__body_pos">
                            <td className='data-table__cell data-table__cell_pos  cell_1'>Основные средства</td> 
                            <td className='data-table__cell data-table__cell_pos  cell_2'>ПД00000033642</td> 
                            <td className='data-table__cell data-table__cell_pos  cell_3'>Моторизированный кронштейн Brateck PLB M0544</td>
                            <td className='data-table__cell data-table__cell_pos  cell_4'>шт</td>
                            <td className='data-table__cell data-table__cell_pos  cell_5'>15</td>
                            <td className='data-table__cell data-table__cell_pos  cell_6'>ВКС (конф-зал)</td>
                        </tr>


<tr>
                            <td className='cell_name'><p>Категория</p></td>
                            <td><select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.kat_data.map( id => <option key={id.kat_id} value={id.kat_id}>{id.kat_name}</option>)}  
                            </select></td>
                        </tr> 
                        <tr>
                            <td className='cell_name'><p>Модель оборудования</p></td>
                            <td><p><input></input></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Тип оборудования</p></td>
                            <td><p><select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.type_data.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}  
                            </select></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Привязка</p></td>
                            <td><p><input name='prim' onChange={this.ChangePrim}></input></p></td>
                        </tr>
                        */


/*
<div>
                        <p>Филиал </p>
                        <p>Категория </p>
                        <p>Инв номер </p>
                        <p>Номенклатура</p>
                        <p>Ед. измерения</p>
                        <p>Кол-во</p>
                    </div>
                    <div>
                        <p><input name='name' onChange={this.handleChange}></input> </p>
                        <p>
                            <select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.type_data.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}
                                  
                            </select> 
                        </p>
                        <p>
                            <select id="fact_name" name='f_name' onChange={this.ChangeFirm}>
                            {this.state.man_data.map( id => <option key={id.m_id} value={id.m_id}>{id.m_name}</option>)}
                                
                            </select> 
                        </p>
                        <p><input name='kol' type='number' onChange={this.ChangeKol}></input> </p>
                        <p><input type="date" name='date' onChange={this.ChangeDate}></input> </p>
                    </div>
*/

/*
            <p>Название элемента <input></input></p>
            <p>Тип элемента <input></input></p>
            <p>Производитель <input></input></p>
            <p>Дата ввода <input></input></p>

*/
/*
<div className="Element">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <p>Филиал </p>
                        <p>Категория </p>
                        <p>Инв номер </p>
                        <p>Номенклатура</p>
                        <p>Ед. измерения</p>
                        <p>Кол-во</p>
                    </div>
                    <div>
                        <p><input name='name' onChange={this.handleChange}></input> </p>
                        <p>
                            <select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.type_data.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}
                                  
                            </select> 
                        </p>
                        <p>
                            <select id="fact_name" name='f_name' onChange={this.ChangeFirm}>
                            {this.state.man_data.map( id => <option key={id.m_id} value={id.m_id}>{id.m_name}</option>)}
                                
                            </select> 
                        </p>
                        <p><input name='kol' type='number' onChange={this.ChangeKol}></input> </p>
                        <p><input type="date" name='date' onChange={this.ChangeDate}></input> </p>
                    </div>
                    <button type='submit' className="action_block">
                        Сохранить
                    </button>
                    <button type='reset' className="action_block" >
                        Отменить
                    </button>
                </form>
            </div>
            */