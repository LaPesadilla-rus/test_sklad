import React, {Component} from 'react';
import axio from 'axios';
import UnicId from 'react-html-id';
export default class Zauvki_form_change extends Component{
 
    constructor() {
        super();
        this.state = {
            value: 'Введите описание заявки',
            otd_data: [],
            cat: [],
            val_cat: '',
            val_mar: '',
            mar: [],
            type: [],
            val_type: '',
            sel_per: '',
            sel_ar:[]
        } 
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
      componentDidMount (){
        axio.get('/sklad/new/kat').then(res=>{
            console.log(res.data)
            this.setState({
                cat: res.data
            });
        });
       axio.get('/sklad/new/marka').then(res=>{
                this.setState({
                    mar: res.data
                });
            });   
            axio.get('/sklad/new/type').then(res=>{
             console.log(res.data)
                this.setState({
                    type: res.data
                });
            });  
    }
    onClose = () => {
        this.props.clf();
    }
    changeKat = (e) => {
        this.setState({ val_cat: e.target.value})
        var arr = [];
        var val= e.target.value;
        this.state.type.map(id => {
            if (parseInt(val)=== id.te_kat_id){
                arr.push(id); }
                
            })
            if (arr.length === 0){
                this.setState({
                    val_type:'',
                })
            }
            this.setState({
                sel_ar: arr
            })
    }
    changeMar =(e)=>{
     this.setState({ val_mar: e.target.value})
    }
    changeType = (e)=>{
        this.setState({ val_type: e.target.value})
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
                            <td align="left">Категория </td><td><select  onChange={this.changeKat} value={this.state.val_cat}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.cat.map( id => <option key={id.kat_id} value={id.kat_id}>{id.kat_name}</option>)}
                            </select></td></tr>
                        <tr>
                        <td align="left">Тип </td> 
                             <td><select onChange={this.changeType} value={this.state.val_type}>
                             <option placeholder='----' value='-1'></option>
                             {this.state.sel_ar.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}
                             </select>
                             </td></tr>
                        <tr>
                            <td align="left"> Марка </td><td><select onChange={this.changeMar} value={this.state.val_mar}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.mar.map( id => <option key={id.id} value={id.id}>{id.name}</option>)}
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