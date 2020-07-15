import React, {Component} from 'react';
import axio from 'axios';
import modalMove from '../../modules/otdel/modal/modalMove'

export default class Zauvki_form_send extends Component{
    constructor() {
        super();
        
        this.state = {
            value: 'Введите описание заявки',
            otd_data: [],
            cat: [],
            val_cat: ''

        } 
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }
	
componentDidMount (){
    axio.get('/sklad/new/kat').then(res=>{
        console.log(res)
        this.setState({
            cat: res.data
        });
    });
}

changeKat (e){
    console.log(e.target.value)
}
    render() {
        return (
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">     
                        <p>Форма заполнения заявки</p><table>
                            <tbody>
                             <tr>
                            <td align="left">Категория </td> 
                            <td><select onChange={this.changeKat} value={this.state.val_cat}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.cat.map( id => <option key={id.kat_id} value={id.kat_id}>{id.kat_name}</option>)}
                            </select>
                            </td>
                            </tr>
                        <tr >
                            <td align="left">Тип </td> 
                             <td><select></select>
                             </td>
                             </tr>
                         <tr><td align="left">Марка </td> 
                             <td><select></select>
                              </td> 
                             </tr>
                            <tr ><td colSpan='3'><textarea className='Text'value={this.state.value} onChange={this.handleChange}>Введите описание заявки</textarea></td></tr>
                            <tr><td><button  type='submit'>Отправить</button></td>
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