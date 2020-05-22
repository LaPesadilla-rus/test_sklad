import React, {Component} from 'react';
import './spr_block.css';
import SprItem from './spr_item/spr_item.js';
import ModalWarn from './spr_item/modal_warn.js';
import axio from 'axios';

export default class Table_block_item extends Component {
    constructor(props){
        super(props);
        this.state={
            items: [],
            isModalOpen: false,
            isWarnOpen: false,
            isDeleteData: false,
        }
    }

    changeModal = () => {
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    changeWarn =() => {
        this.setState(state => ({ isWarnOpen: !state.isWarnOpen}))
    }

    handleDelete = () => {
        const data = {
            table: this.props.table,
            id_item: this.props.id_item
        }      
        axio.delete('/spr/delete', {data}).then(res => {
            if (res.data === 'DELETE COMPLITE') {
                //alert('Данные удалены');
                this.props.onReboot();
            }else{
                alert('Данные не удалось сохранить');
            }
        });  
    }

    render(){
        return(
            <div  className="spr_block_data_line">
                <div className="spr_block_data_item" >
                    <div onClick={this.changeModal} className="spr_block_nav">
                        <label>{this.props.item}</label>
                    </div>
                    {this.state.isModalOpen &&
                        <SprItem onClose={this.changeModal} onReboot={this.props.onReboot} act='update' id_item={this.props.id_item} item={this.props.item} name={this.props.name} table={this.props.table} />
                    }
                    {this.state.isWarnOpen &&
                        <ModalWarn onClose={this.changeWarn} onDel={this.handleDelete} />
                    }
                </div>
                <div className='delete_button' onClick={this.changeWarn}><label>x</label></div>
            </div>
            
        )
    }
}