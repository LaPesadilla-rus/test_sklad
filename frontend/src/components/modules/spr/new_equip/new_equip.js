import React, {Component} from 'react';
import './new_equip.css';
import SprItem from '../spr_item/spr_item.js';
import NewEquipSelect from './new_equip_select.js';
import UnicId from 'react-html-id';
import Autocomplite from '../../../simple_comp/autocomplite/autocomplite';
import axio from 'axios';

export default class New_equip extends Component {
    constructor(props){
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
            equip_name: '',
            equip_arr: [],
            isModalOpen: false,
            kat_data: [],
            type_data: [],
            mark_data: [],
        }
    }

    componentDidMount = () =>{
        //console.log(this.props)
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
        console.log(this.props)
        /*axio.post('/spr/equip').then(res=>{
            var mas = []
            for (let n = 0; n < res.data.length; n++){
                mas[n] = res.data[n].item;
            }
            this.setState({
                equip_arr: mas
            });
        });*/

        axio.get('/spr/equip_name').then(res=>{
            var mas = []
            for (let n = 0; n < res.data.length; n++){
                mas[n] = res.data[n].item;
            }
            this.setState({
                equip_arr: mas,
            })
            
        });

    }

    ChangeKategor = (e) =>{
        this.setState({kat: e.target.value});
        this.container.kat = e.target.value;
        var data = { kat: e.target.value};
        axio.post('/sklad/new/type', data).then(res=>{
            this.setState({
                type_data: res.data,
            })
        });
        this.ChangeModelName();
    }

    onReboot = () =>{
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
        this.props.onReboot();
    }

    ChangeType = (e) =>{
        this.setState({type: e.target.value});
        this.container.type = e.target.value;
        this.ChangeModelName();
    }

    ChangeMarka = (e) =>{
        this.setState({marka: e.target.value});
        this.container.marka = e.target.value;
        this.ChangeModelName();
    }

    ChangeModelInp = (e) =>{
        this.setState({model: e.target.value});
        this.container.model = e.target.value;
    }

    changeModal = (e) =>{
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    ModalData = (e) => {
        //console.log(e);
        this.setState({
            name: e.name,
            table: e.table,
        })
        //console.log(e);
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
        /*if (data.marka === ''){
            err = err + 'Производитель не выбран! ';
        }*/
        if (data.marka === '-1'){
            data.marka = '0';
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
                    this.props.onReboot();
                }else{
                    alert('Данные не удалось сохранить');
                }
            });
        }
    }

    handleUpdate = event => {
        event.preventDefault();
        //console.log('Update event')
        const data = {
            kat: this.state.kat,
            type: this.state.type,
            marka: this.state.marka,
            name: this.state.model,
            id_item: this.props.id_item,
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
                //console.log(res.data)
                if (res.data === 'UPDATE COMPLITE') {
                    this.onClose();
                    this.props.onReboot();
                }else{
                    alert('Данные не удалось сохранить');
                }
            });
        }
    }

    //---------------------

    handleSelect = event => {
        event.preventDefault();
        //console.log('Select event ' + this.state.equip_name)

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
            alert(err);
        }else{
            //this.setState({error: null})
            if (!this.props.btn_stat){
                var type = parseInt(this.state.type);
                this.props.type_data.forEach(function(item) {
                    if(item.te_id === type){
                        type = item.te_name
                    }
                })
                var marka = parseInt(this.state.marka);
                this.props.marka_data.forEach(function(item) {
                    console.log(item)
                    if(item.id === marka){
                        marka = item.name
                    }
                })
                //console.log(type + ' ' + marka + ' ' + data.name)
                this.props.setText((type + ' ' + marka + ' ' + data.name));
                //this.props.changeButton(this.props.id_button, (type + ' ' + marka + ' ' + this.props.modelText));
            }
        }
    }

    searchModelName (val) {
        var arr = this.props.equip_arr;
        var id = false
        arr.forEach(function(item){
            if (item.eq_name === val){
                id =  true;
            }
        })
        return (id)
    }

    //--------------------

    ChangeModelName = () => {
        var data = {
            marka: this.container.marka,
            kat: this.container.kat,
            type: this.container.type
        }
        
        axio.post('/spr/equip', data).then(res=>{
            var mas = []
            for (let n = 0; n < res.data.length; n++){
                mas[n] = res.data[n].item;
            }
            console.log(res.data)
            this.setState({
                equip_arr: mas,
                items: res.data,
            })
        });
    }
    
    changeNon = () => {

    }

    onClose= () =>{
        this.props.onClose();
    }

    setText= (val) => {
        this.setState({equip_name: val})
        this.container.model = val;
    }

    

    render(){
        let form;
        if (this.props.act === 'select'){
            form = <form className='new_eq__form' onSubmit={this.handleSelect}>
                        <div className='new_eq_data'>
                            <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeNon} ChangeSelect={this.ChangeKategor} 
                                ModalData={this.ModalData} name='Категория' table='kategor_spr' zagolovok='Выбрать категорию' 
                                data={this.state.kat_data} id_val={this.state.kat} />
                            <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeNon} ChangeSelect={this.ChangeType} 
                                ModalData={this.ModalData} table='type_equip_spr' name='Тип оборудования' zagolovok='Тип оборудования' 
                                data={this.state.type_data} id_val={this.state.type} />
                            <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeModal} ChangeSelect={this.ChangeMarka} 
                                ModalData={this.ModalData} table='marka_equip_spr' name='Производитель' zagolovok='Фирма производитель' 
                                data={this.state.mark_data} id_val={this.state.marka} />
                            <div className='new_eq_sel'>
                                <div className='new_eq_sel_col1'>Введите модель </div>
                                <div className='new_eq_sel_col2'><Autocomplite modelText={this.state.equip_name} items_arr={this.state.equip_arr} setText={this.setText}/></div>
                                <div className='new_eq_sel_col3'></div>
                            </div>
                        </div>
                        <div className='new_eq_data__button'>
                            <button type='submit' className='button button_green' >Выбрать</button>
                            <button type='button' className='button button_red' onClick={this.props.onClose}>Отмена</button>
                        </div>
                    </form>
        }
        if (this.props.act === 'update'){
            form = <form className='new_eq__form' onSubmit={this.handleUpdate}>
                        <div className='new_eq_data'>
                            <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeNon} ChangeSelect={this.ChangeKategor} 
                                ModalData={this.ModalData} name='Категория' table='kategor_spr' zagolovok='Выбрать категорию' 
                                data={this.state.kat_data} id_val={this.state.kat} />
                            <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeNon} ChangeSelect={this.ChangeType} 
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
                            <button type='submit' className='button button_green' >Редактировать</button>
                            <button type='button' className='button button_red' onClick={this.props.onClose}>Отмена</button>
                        </div>
                    </form>
        }
        if (this.props.act === 'insert'){
            form = <form className='new_eq__form' onSubmit={this.handleSubmit}>
                    <div className='new_eq_data'>
                        <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeNon} ChangeSelect={this.ChangeKategor} 
                            ModalData={this.ModalData} name='Категория' table='kategor_spr' zagolovok='Выбрать категорию' 
                            data={this.state.kat_data} />
                        <NewEquipSelect key={this.nextUniqueId()} onModal={this.changeNon} ChangeSelect={this.ChangeType} 
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
                        <button type='submit' className='button button_green' >Сохранить</button>
                        <button type='button' className='button button_red' onClick={this.props.onClose}>Отмена</button>
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