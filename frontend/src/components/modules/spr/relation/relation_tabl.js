import React, {Component} from 'react';
import './relation.css';
import UnicId from 'react-html-id';
import SprItem from '../spr_item/spr_item';
import NewEquipSelect from '../new_equip/new_equip_select_redux.js';
import Autocomplite from './autocomplite.js';
import axio from 'axios';

export default class Relation_tabl extends Component {
    constructor (props){
        super(props);
        UnicId.enableUniqueIds(this);
        this.container = {
            kat: '',
            type: '',
            marka: '',
            model: '',
        }
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
            items: [],
            equip_all: [],
            equip_name_data: [],
            error: '',
            id: '',
        }
    }

    componentDidMount = () =>{
        //console.log(store.getState())
        
        axio.get('/spr/equip_name').then(res=>{
            var mas = []
            for (let n = 0; n < res.data.length; n++){
                mas[n] = res.data[n].item;
            }
            this.setState({
                equip_name_data: mas,
                items: res.data,
            })
            
        });
        axio.get('/sklad/kat').then(res=>{
            if (this.props.id_button === '2'){
                this.setState({
                    kat_data: res.data.slice(1),
                })
            }else{
                this.setState({
                    kat_data: res.data.slice(0,1),
                })
            }
            
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

    ChangeModelName = () => {
        var data = {
            marka: this.container.marka,
            kat: this.container.kat,
            type: this.container.type
        }
        //console.log('---')
        axio.post('/spr/equip', data).then(res=>{
            var mas = []
            for (let n = 0; n < res.data.length; n++){
                mas[n] = res.data[n].item;
            }
            this.setState({
                equip_name_data: mas,
                items: res.data,
            })
        });
    }

    ChangeKategor = (e) =>{
        var data = { kat: e};
        axio.post('/sklad/new/type', data).then(res=>{
            this.setState({
                type_data: res.data,
            })
        });
        this.ChangeModelName();
    }

    onReboot = () =>{

    }

    ChangeType = (e) =>{
        //this.setState({type: e});
        //this.ChangeModelName();
    }

    ChangeMarka = (e) =>{
        //this.setState({marka: e});
        //this.ChangeModelName();
    }

    ChangeModelInp = (e) =>{
        this.setState({model: e});
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

    /*handleSubmit = event => {
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
    }*/

    onClose= () =>{
        this.props.onClose();
        this.props.onReboot();
    }

    /*searchType = (value) => {
        var i = this.state.type_data.length;
        while (i--){
            if (this.props.items[i].te_name === value){
                return(this.state.type_data.te_id)
            }
        }
    }*/
    searchModelName (val) {
        var arr = this.state.items;
        var id = false
        arr.forEach(function(item){
            if (item.eq_name === val){
                id =  true;
            }
        })
        return (id)
    }

    addItem = () => {
        const data = {
            marka: this.container.marka,
            kat: this.container.kat,
            type: this.container.type,
            name: this.container.model,
        }   
        console.log(this.searchModelName(data.name))   
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
        if (!this.searchModelName(data.name)){
            err = err + 'Модели нет в списке! '
        }
        if (err){
            this.setState({error: err})
        }else{
            this.setState({error: null})
            
            if (!this.props.btn_stat){
                var type = this.props.typeText;
                this.state.type_data.forEach(function(item) {
                    if(item.id == type){
                        type = item.name
                    }
                })
                var marka = this.props.markaText;
                this.state.mark_data.forEach(function(item) {
                    if(item.id == marka){
                        marka = item.name
                    }
                })
                //console.log(type1 + ' ' + marka1 + ' ' + this.props.modelText)
                this.props.changeButton(this.props.id_button, (type + ' ' + marka + ' ' + this.props.modelText));
            }
        }
    }

    cancelClick = () =>{
        if (this.props.btn_stat){
            this.props.changeButton(this.props.id_button);
        }
    }

    changeIdItem = (val) =>{
        this.setState({id: val})
        this.cancelClick();
    }

    setKatText = (e) => {
        this.container.kat = e;
        this.props.setKatText(this.props.id_button,e);
        var data = { kat:  e};
        axio.post('/sklad/new/type', data).then(res=>{
            console.log(res.data)
            this.setState({
                type_data: res.data,
            })
        });
        this.ChangeModelName();
    }

    setTypeText = (e) => {
        this.container.type = e;
        this.props.setTypeText(this.props.id_button,e);
        this.ChangeModelName();
    }

    setMarkaText = (e) => {
        this.container.marka = e;
        this.props.setMarkaText(this.props.id_button,e);
        this.ChangeModelName();
    }

    setModelText = (e) => {
        this.container.model = e;
        this.props.setModelText(this.props.id_button,e);
    }

    render(){
        return(
            <div className='form_box_add'> 
                {this.props.zagl}
                <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.setKatText}
                    Text={this.props.katText} setText={this.setKatText}  id_button={this.props.id_button}
                    ModalData={this.ModalData} name='Категория' table='kategor_spr' zagolovok='Выбрать категорию' 
                    data={this.state.kat_data} id_val={this.state.kat} />
                <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.setTypeText} 
                    Text={this.props.typeText} setText={this.setTypeText}  id_button={this.props.id_button}
                    ModalData={this.ModalData} table='type_equip_spr' name='Тип оборудования' zagolovok='Тип оборудования' 
                    data={this.state.type_data} id_val={this.state.type} />
                <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.setMarkaText}
                    Text={this.props.markaText} setText={this.setMarkaText}  id_button={this.props.id_button}
                    ModalData={this.ModalData} table='marka_equip_spr' name='Производитель' zagolovok='Фирма производитель' 
                    data={this.state.mark_data}  />
                <div className='new_eq_sel'>
                    <div className='new_eq_sel_col1'>Введите модель </div>
                    <div className='new_eq_sel_col2'>
                        <Autocomplite modelText={this.props.modelText} setModelText={this.setModelText} id_item={this.changeIdItem} 
                                        onChange={this.ChangeModelInp} items_full={this.state.items} 
                                        items_arr={this.state.equip_name_data} value={this.state.model}
                                        id_button={this.props.id_button} />
                    </div>
                    <div className='new_eq_sel_col3'></div>
                </div>
                <div className='new_eq_sel'>{this.state.error}</div>
                <div>
                    <button className='button button_red' onClick={this.cancelClick}>Отмена</button>
                    <button className='button' onClick={this.addItem}>Добавить</button>
                </div>
                {this.state.isModalOpen &&
                    <SprItem key={this.nextUniqueId()} onClose={this.changeModal} onReboot={this.onReboot} act='submit' name={this.state.name} table={this.state.table}/>
                }
            </div>
                        
        )
    }
}