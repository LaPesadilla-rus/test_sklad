import React, {Component} from 'react';
import './relation.css';
import UnicId from 'react-html-id';
import NewEquipSelect from '../new_equip/new_equip_select';
import RelationTabl from './relation_tabl.js';
import axio from 'axios';

export default class Relation extends Component {
    constructor (){
        super();
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
            btn1_show: false,
            btn2_show: false,
            btn1_txt: '',
            btn2_txt: '',
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
            var data = { kat: '0'};
            axio.post('/sklad/new/type', data).then(res=>{
                this.setState({
                    type_data: res.data,
                })
            });
        }

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

    changeButton = (e,val,txt) =>{
        console.log('button: ', val)
        if (e === '1'){
            this.setState(state => ({ btn1_show: !state.btn1_show}))
            this.setState({ btn1_txt: txt})
        }else if (e === '2'){
            this.setState(state => ({ btn2_show: !state.btn2_show}))
            this.setState({ btn2_txt: txt})
        }
    }


    render(){
        let btn1,btn2;
        btn1 = <div className='combo_button'>
                    <button className='button button_yellow'>{this.state.btn1_txt}</button>
                </div>
        btn2 = <div className='combo_button'>
                    <button className='button button_yellow'>{this.state.btn2_txt}</button>
                </div>
        return(
            <div className='box_back_osn'>
                 <div className='box_back_dop'>
                    <div className='form_box'>
                        <RelationTabl changeButton={this.changeButton} id_button='1' btn_stat={this.state.btn1_show} zagl='Основной компонент' />
                        <RelationTabl changeButton={this.changeButton} id_button='2' btn_stat={this.state.btn2_show} zagl='Дочерний компонент' />
                    </div>
                    <div className='active_box'>
                        <div className='active_box_block'>
                            {this.state.btn1_show && btn1}
                        </div>
                        <div className='active_box_block'>
                            {this.state.btn2_show && btn2}
                        </div>
                    </div>
                    <div>
                        <button className='button button_green'>Сохранить</button>
                        <button className='button button_red'>Отмена</button>
                    </div>
                 </div>
            </div>
        )
    }
}