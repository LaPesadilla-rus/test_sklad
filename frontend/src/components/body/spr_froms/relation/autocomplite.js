import React, {Component} from 'react';
import './relation.css';
import UnicId from 'react-html-id';
import axio from 'axios';

export default class Autocomplite extends Component {
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



    render(){
        return(
            <div className='autocomplite'>
                 <input></input>
                 <ul>
                     <li></li>
                 </ul>
            </div>
        )
    }
}