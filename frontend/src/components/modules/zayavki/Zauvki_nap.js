import React, {Component} from 'react';
import axio from 'axios';
export default class Zauvki_nap extends React.Component {
        constructor() {
            super();  
            this.state = {
              val_cat:[],
              isEditOpen: false
            } 
        }
    onClick = () => {
        this.props.Look(this.props.row);
    }

    Delete_za = event =>{
        event.preventDefault();
        axio.post('/zauvki/delete_zauvka').then(res => {
            if (res=== 'DELETE COMPLITE') {
                alert('elf');
            }else{
               alert('Не khfsd');
            }
        });
    }
	render (){ 
    //    console.log(this.props)
    return ( <tr width='100%' className='oi' onClick={this.onClick}> 
    <td>{this.props.row.za_num}</td>
    <td>{this.props.row.kat_name}</td>
    <td>{this.props.row.te_name}</td>
    <td>{this.props.row.ma_name}</td>
    <td>{this.props.row.value}</td>
    <td>{this.props.row.za_status}</td>
    <td><button className='del'onClick={this.Delete_za} ></button></td>
    </tr> );}
}