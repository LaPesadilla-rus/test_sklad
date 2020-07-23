import React, {Component} from 'react';
import axio from 'axios';
import './Zauvki_form.css'
export default class Zauvki_nap extends React.Component {
        constructor() {
            super();  
            this.state = {
              val_cat:[],
              isEditOpen: false,
              val_cat_ch: '',
              val_type_ch:'',
              val_mar_ch:'',
              sel_per_ch:'',
              zav_status_ch:'',
              za_id:''
            } 
        }
    onClick = () => {
        this.props.Look(this.props.row);
    }
    onReboot = () =>{
        axio.get('/zauvki/all_zauvki').then(res=>{
          console.log(res.data)
              this.setState({
                  arr: res.data.rows
              });
          });
        }
    Delete = ()=>{
        const data = {
            val_cat_ch: this.props.row.kat_name,
            val_type_ch: this.props.row.te_name,
            val_mar_ch: this.props.row.ma_nam,
            sel_per_ch: this.props.row.za_txt,
            zav_status_ch: this.props.row.za_status,
            za_id:this.props.row.za_id
        }
        axio.post('/zauvki/delete_zauvka', {data}).then(res => {
            if (res.data === 'DELETE COMPLITE') {
                this.onReboot()
                alert('Заявка удалена');
            }else{
               alert('Ошибка удаления заявки');
            }
        });
    }

	render (){ 
    console.log(this.props)
    return ( <tr width='100%' className='oi' > 
    <td onClick={this.onClick}>{this.props.row.za_num}</td>
    <td onClick={this.onClick}>{this.props.row.kat_name}</td>
    <td onClick={this.onClick}>{this.props.row.te_name}</td>
    <td onClick={this.onClick}>{this.props.row.ma_name}</td>
    <td onClick={this.onClick}>{this.props.row.za_txt}</td>
    <td onClick={this.onClick}>{this.props.row.za_status}</td>
    <td><button className='del'onClick={this.Delete}>X</button></td>
    </tr> );}
}