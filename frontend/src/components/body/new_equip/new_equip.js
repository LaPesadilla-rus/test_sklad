import React, {Component} from 'react';
import './new_equip.css';
import SprItem from '../spr_froms/spr_item/spr_item.js';
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
            test: {
                name: 'asd'
            },
            stat: '0',
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
        var data = { kat: '0'};
        axio.post('/sklad/new/type', data).then(res=>{
            this.setState({
                type_data: res.data,
            })
        });
        axio.get('/sklad/new/marka').then(res=>{
            this.setState({
                mark_data: res.data,
            })
        });

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
                    //this.onClose();
                }else{
                    alert('Данные не удалось сохранить');
                }
            });
        }
    }

    render(){
        return(
            <div className='background_modal background_modal_pos'>
            <div className='new_eq'>
                <form className='new_eq__form' onSubmit={this.handleSubmit}>
                    <div className='new_eq_data'>
                        
                    
                    <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeKategor} ModalData={this.ModalData} name='Категория' table='kategor_spr' zagolovok='Выбрать категорию' data={this.state.kat_data} />
                    <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeType} ModalData={this.ModalData} table='type_equip_spr' name='Тип оборудования' zagolovok='Тип оборудования' data={this.state.type_data} />
                    <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeMarka} ModalData={this.ModalData} table='marka_equip_spr' name='Производитель' zagolovok='Фирма производитель' data={this.state.mark_data} />
                    <p>Введите модель <input onChange={this.ChangeModelInp} placeholder={this.state.test.name} value={this.state.model}></input></p>
                    </div>
                    <div className='new_eq_data__button'>
                        <button type='submit' className='action__button' >Сохранить</button>
                        <button type='button' className='action__button out_button'>Отмена</button>
                    </div>
                </form>
                {this.state.isModalOpen &&
                    <SprItem key={this.nextUniqueId()} onClose={this.changeModal} onReboot={this.onReboot} act='submit' name={this.state.name} table={this.state.table}/>
                }

            </div>
            </div>
        )
    }
}