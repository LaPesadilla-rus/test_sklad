import React, {Component} from 'react';
import axio from 'axios';

import UnicId from 'react-html-id';
export default class Zauvki_form_change extends Component{
 
    constructor() {
        super();
        this.state = {
            value: 'Введите описание заявки',
            otd_data: [],
            cat_ch: [],
            val_cat_ch: '-1',
            val_mar_ch: '-1',
            mar_ch: [],
            type_ch: [],
            val_type_ch: '-1',
            sel_per_ch: '',
            sel_ar_ch:[]
        } 
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
      componentDidMount (){
        axio.get('/sklad/new/kat').then(res=>{
          //  console.log(res.data)
            this.setState({
                cat_ch: res.data
            });
        });
       axio.get('/sklad/new/marka').then(res=>{
                this.setState({
                    mar_ch: res.data
                });
            });   
            axio.get('/sklad/new/type').then(res=>{
            // console.log(res.data)
                this.setState({
                    type_ch: res.data
                });
            });
            console.log(this.props)
         this.setState({ val_cat_ch: this.props.arr.za_kat_id}) 
         this.setState({ val_type_ch: this.props.arr.za_type_id}) 
         this.setState({ val_mar_ch: this.props.arr.za_marka_id}) 
    }
    onClose = () => {
        this.props.clf();
    }
    changesKat = (e) => {
        this.setState({ val_cat_ch: e.target.value})
        var arr_ch = [];
        var val= e.target.value;
        this.state.type_ch.map(id => {
            if (parseInt(val)=== id.te_kat_id){
                arr_ch.push(id); }
                
            })
            if (arr_ch.length === 0){
                this.setState({
                    val_type_ch:'',
                })
            }
            this.setState({
                sel_ar_ch: arr_ch
            })
    }
    changesMar =(e)=>{
     this.setState({ val_mar_ch: e.target.value})
    }
    changesType = (e)=>{
        this.setState({ val_type_ch: e.target.value})
    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
                <div className='modal modal_pos'>
                    {/*<form onSubmit={this.equipMove} className="otdel_modal">*/}
                        <p>Форма редакции заявки</p>
                        <table>
                        <tbody>
                        <tr>
                        <td align="left">Категория </td><td>
                            <select  onChange={this.changesKat} value={this.state.val_cat_ch}>
                                <option placeholder='----' value='-1'></option>
                            {this.state.cat_ch.map( id => <option key={id.kat_id} value={id.kat_id}>{id.kat_name}</option>)}
                            </select></td></tr>
                        <tr>
                        <td align="left">Тип </td> 
                             <td><select onChange={this.changesType} value={this.state.val_type_ch}>
                             <option placeholder='----' value='-1'></option>
                             {this.state.sel_ar_ch.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}
                             </select>
                             </td></tr>
                        <tr>
                            <td align="left"> Марка </td><td><select onChange={this.changesMar} value={this.state.val_mar_ch}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.mar_ch.map( id => <option key={id.id} value={id.id}>{id.name}</option>)}
                            </select></td></tr>
                        <tr>
                            <td colSpan='3'><textarea className='Text'value={this.state.value} onChange={this.handleChange}>Введите описание заявки</textarea></td>
                        </tr>
                        <tr>
                            <td><button type='submit'>Отправить</button></td> 
                            <td><button type='reset' onClick={this.onClose}>Отмена</button></td> 
                            </tr>
                        </tbody></table>
                </div>
            </div>
        );
    }
}

//ModalMoveS