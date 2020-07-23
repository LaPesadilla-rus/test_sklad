import React, {Component} from 'react';
import axio from 'axios';
import Header from '../header/header'
export default class Zauvki_form_send extends Component{
    constructor() {
        super();
        this.state = {
            otd_data: [],
            cat: [],
            val_cat: '',
            val_mar: '',
            mar: [],
            type: [],
            val_type: '',
            sel_per: '',
            sel_ar: [],
            textar: '',
            zav_n: '',
            arr: [],
            zav_status: 'Отправлено',
            us_id: ''
        } 
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.setState({textar: e.target.value});
        //console.log(this.state.textar)
      }
ChangeStatus(e){
    this.setState({zav_status: e.target.value});

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
    //    console.log(res.data)
        this.setState({
            type: res.data
        });
    });  
}

changeKat = (e) => {
    this.setState({ val_cat: e.target.value});
    var arr = [];
    var val= e.target.value;
    this.state.type.map(id => {
     //   console.log(id)
        if (parseInt(val)=== id.te_kat_id){
            arr.push(id); }
        })
        if (arr.length === 0) {
            this.setState({
                val_type: '',
            })
        }
        this.setState({
            sel_ar: arr
        })
}
changeMar = (e)=>{
 this.setState({ val_mar: e.target.value})
}
changeType = (e)=>{
    this.setState({ val_type: e.target.value})
    
}

onSubmith = event => {
    event.preventDefault();

    const data = {
        val_cat: this.state.val_cat,
        val_type: this.state. val_type,
        val_mar: this.state.val_mar,
        textar: this.state.textar,
        zav_n: this.state.zav_n,
        zav_status: this.state.zav_status,
        us_id: this.state.us_id
    }
    console.log(data)      
    var err = '';
    
    if (data.val_cat === '-1'){
        err = err + "Категория не выбрана";
    }
    if (data.val_mar === '-1'){
        err = err + "Марка не выбрана";
    }
    if (data.val_type === '-1'){
        err = err + "Тип не выбран";}
   
    if (err){
        alert(err)    
    }else{
            axio.post('/zauvki/new_zauvka', {data}).then(res => {
                if (res.data === 'SAVE COMPLITE') {
                    this.props.onReboot();
                    alert('Сохранено');
                }else{
                   alert('Не сохранено');
                }
            });
    }
}

 render() { console.log(this.state.textar)
        return (
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">     
                        <p>Форма заполнения заявки</p><table>
                            <tbody>
                             <tr>
                            <td align="left">Категория </td> 
                            <td><select  onChange={this.changeKat} value={this.state.val_cat}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.cat.map( id => <option key={id.kat_id} value={id.kat_id}>{id.kat_name}</option>)}
                            </select>
                            </td>
                            </tr>
                        <tr >
                            <td align="left">Тип </td> 
                             <td><select onChange={this.changeType} value={this.state.val_type}>
                             <option placeholder='----' value='-1'></option>
                             {this.state.sel_ar.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}
                             </select>
                             </td>
                             </tr>
                         <tr><td align="left">Марка </td> 
                             <td><select onChange={this.changeMar} value={this.state.val_mar}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.mar.map( id => <option key={id.id} value={id.id}>{id.name}</option>)}
                            </select>
                              </td> 
                             </tr>
                            <tr ><td colSpan='3'><textarea name='textar'className='Text'value={this.state.textar} onChange={this.handleChange} >Введите описание заявки</textarea></td></tr>
                            <tr><td><button onClick={this.onSubmith}  type='submit'>Отправить</button></td>
                            <td><button onClick={this.props.showM} type='reset'>Выйти</button></td>
                            </tr>
                            </tbody> 
                         </table>
                        </div> 
            </div>
        );
    }
}

//ModalMoveS

/*
<select onChange={this.changeOtdel} value={this.state.otd_sel}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.otd_data.map( id => <option key={id.ot_id} value={id.ot_id}>{id.ot_name}</option>)}
                            </select>
*/