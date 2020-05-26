import React, {Component} from 'react';
import './new_equip.css';
import SprItem from '../spr_item/spr_item.js';
import NewEquipSelect from './new_equip_select.js';
import UnicId from 'react-html-id';
import axio from 'axios';

export default class New_equip extends Component {
    constructor(props){
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            kat: '',
            type: '',
            marka: '',
            model: '',
            name: '',
            table: '',
            isModalOpen: false,
            kat_data: [],
            type_data: [],
            mark_data: [],
        }
    }

    componentDidMount = () =>{
        axio.get('/sklad/kat').then(res=>{
            this.setState({
                kat_data: res.data,
            })
        });
        
        axio.get('/sklad/new/marka').then(res=>{
            this.setState({
                mark_data: res.data,
            })
        });
        if (this.props.id_item){
            var data = { id: this.props.id_item};
            axio.post('/spr/equip', data).then(res=>{
                this.setState({
                    model: res.data[0].eq_name,
                    kat: res.data[0].eq_kat_id,
                    marka: res.data[0].eq_mark_id,
                    type: res.data[0].eq_type_id,
                });
                this.ChangeKategor({target: {value: res.data[0].eq_kat_id}});
            });
        }else{
            data = { kat: '0'};
            axio.post('/sklad/new/type', data).then(res=>{
                this.setState({
                    type_data: res.data,
                })
            });
        }

    }

    ChangeKategor = (e) =>{
        this.setState({kat: e.target.value});
        var data = { kat: e.target.value};
        axio.post('/sklad/new/type', data).then(res=>{
            this.setState({
                type_data: res.data,
            })
        });
    }

    onReboot = () =>{

    }

    ChangeType = (e) =>{
        this.setState({type: e.target.value});
    }

    ChangeMarka = (e) =>{
        this.setState({marka: e.target.value});
    }

    ChangeModelInp = (e) =>{
        this.setState({model: e.target.value});
    }

    changeModal = (e) =>{
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    ModalData = (e) => {
        console.log(e);
        this.setState({
            name: e.name,
            table: e.table,
        })
        console.log(e);
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            kat: this.state.kat,
            type: this.state.type,
            marka: this.state.marka,
            name: this.state.model,
        }      
        var err = '';
        console.log(data)
        if (data.kat === '' ){
            err = err + 'Категория не выбрана! ';
        }
        if (data.type === ''){
            err = err + 'Тип оборудования не выбран! ';
        }
        if (data.marka === ''){
            err = err + 'Производитель не выбран! ';
        }
        if (data.name === ''){
            err = err + 'Модель не заполнена! ';
        }
        if (err){
            alert(err);
        }else{
            axio.post('/equip/save', {data}).then(res => {
                if (res.data === 'INSERT COMPLITE') {
                    this.onClose();
                }else{
                    alert('Данные не удалось сохранить');
                }
            });
        }
    }

    handleUpdate = event => {
        event.preventDefault();
        console.log('Update event')
        const data = {
            kat: this.state.kat,
            type: this.state.type,
            marka: this.state.marka,
            name: this.state.model,
            id_item: 1,
            table: 'equip_spr',
        }      
        var err = '';
        if (data.kat === '' ){
            err = err + 'Категория не выбрана! ';
        }
        if (data.type === ''){
            err = err + 'Тип оборудования не выбран! ';
        }
        if (data.marka === ''){
            err = err + 'Производитель не выбран! ';
        }
        if (data.name === ''){
            err = err + 'Модель не заполнена! ';
        }
        if (err){
            alert(err);
        }else{
            axio.post('/equip/update', {data}).then(res => {
                console.log(res.data)
                if (res.data === 'UPDATE COMPLITE') {
                    this.onClose();
                }else{
                    alert('Данные не удалось сохранить');
                }
            });
        }
    }

    onClose= () =>{
        this.props.onClose();
        this.props.onReboot();
    }

    render(){
        let form;
        if (this.props.act === 'update'){
            form = <form className='new_eq__form' onSubmit={this.handleUpdate}>
                        <div className='new_eq_data'>
                            <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeKategor} 
                                ModalData={this.ModalData} name='Категория' table='kategor_spr' zagolovok='Выбрать категорию' 
                                data={this.state.kat_data} id_val={this.state.kat} />
                            <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeType} 
                                ModalData={this.ModalData} table='type_equip_spr' name='Тип оборудования' zagolovok='Тип оборудования' 
                                data={this.state.type_data} id_val={this.state.type} />
                            <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeMarka} 
                                ModalData={this.ModalData} table='marka_equip_spr' name='Производитель' zagolovok='Фирма производитель' 
                                data={this.state.mark_data} id_val={this.state.marka} />
                            <div className='new_eq_sel'>
                                <div className='new_eq_sel_col1'>Введите модель </div>
                                <div className='new_eq_sel_col2'><input className='input' onChange={this.ChangeModelInp} value={this.state.model}></input></div>
                                <div className='new_eq_sel_col3'></div>
                            </div>
                        </div>
                        <div className='new_eq_data__button'>
                            <button type='submit' className='action__button' >Редактировать</button>
                            <button type='button' className='action__button out_button' onClick={this.props.onClose}>Отмена</button>
                        </div>
                    </form>
        }else{
            form = <form className='new_eq__form' onSubmit={this.handleSubmit}>
                    <div className='new_eq_data'>
                        <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeKategor} 
                            ModalData={this.ModalData} name='Категория' table='kategor_spr' zagolovok='Выбрать категорию' 
                            data={this.state.kat_data} />
                        <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeType} 
                            ModalData={this.ModalData} table='type_equip_spr' name='Тип оборудования' zagolovok='Тип оборудования' 
                            data={this.state.type_data} />
                        <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeMarka} 
                            ModalData={this.ModalData} table='marka_equip_spr' name='Производитель' zagolovok='Фирма производитель' 
                            data={this.state.mark_data} />
                        <div className='new_eq_sel'>
                            <div className='new_eq_sel_col1'>Введите модель </div>
                            <div className='new_eq_sel_col2'><input className='input' onChange={this.ChangeModelInp} value={this.state.model}></input></div>
                            <div className='new_eq_sel_col3'></div>
                        </div>
                    </div>
                    <div className='new_eq_data__button'>
                        <button type='submit' className='action__button' >Сохранить</button>
                        <button type='button' className='action__button out_button' onClick={this.props.onClose}>Отмена</button>
                    </div>
                </form>
        }

        return(
            <div className='background_modal background_modal_pos'>
            <div className='new_eq'>
                {form}
                {this.state.isModalOpen &&
                    <SprItem key={this.nextUniqueId()} onClose={this.changeModal} onReboot={this.onReboot} act='submit' name={this.state.name} table={this.state.table}/>
                }

            </div>
            </div>
        )
    }
}