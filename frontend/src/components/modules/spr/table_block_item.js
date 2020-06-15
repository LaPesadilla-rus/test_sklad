import React, {Component} from 'react';
import './spr_block.css';
import SprItem from './spr_item/spr_item.js';
import ModalWarn from '../../simple_comp/modal_warn/modal_warn';
import NewEquip from './new_equip/new_equip.js';
import axio from 'axios';
import { RiCloseLine } from 'react-icons/ri';
import SprItemTe from './spr_item/spr_item_te';

export default class Table_block_item extends Component {
    constructor(props){
        super(props);
        this.state={
            items: [],
            isModalOpen: false,
            isWarnOpen: false,
            isDeleteData: false,
            isModalEquip: false,
            isModalTe: false,
        }
    }

    changeModal = () => {
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    changeModalTe = () => {
        this.setState(state => ({ isModalTe: !state.isModalTe}));
        //this.props.onReboot();
    }

    changeWarn =() => {
        this.setState(state => ({ isWarnOpen: !state.isWarnOpen}))
    }

    changeEquip =() => {
        this.setState(state => ({ isModalEquip: !state.isModalEquip}))
    }

    handleDelete = () => {
        const data = {
            table: this.props.table,
            id_item: this.props.id_item
        }     
        axio.delete('/spr/delete', {data}).then(res => {
            if (res.data === 'DELETE COMPLITE') {
                this.props.onReboot();
            }else{
                if (res.data.code === '23503'){
                    alert('С этой строкой существует запись')
                }else{
                    alert('Данные не удалось сохранить');
                }
                
            }
        });
        this.changeWarn();

    }

    modalYes = () => {
        this.handleDelete();
    }
    modalNo = () => {
        this.changeWarn()
    }

    render(){
        let block;
        //console.log(this.props.type)
        if (this.props.type === 'equip'){ 
            block = <div onClick={this.changeEquip} className="spr_block_nav">
                        <label>{this.props.item}</label>
                    </div>
        }else if (this.props.type === 'type_equip'){
            block =<div onClick={this.changeModalTe} className="spr_block_nav">
                        <label>{this.props.item}</label>
                    </div>
        }else{
            block = <div onClick={this.changeModal} className="spr_block_nav">
                        <label>{this.props.item}</label>
                    </div>
        }
        return(
            <div  className="spr_block_data_line">
                <div className="spr_block_data_item" >
                    {block}
                    {this.state.isModalOpen &&
                        <SprItem onClose={this.changeModal} 
                                    onReboot={this.props.onReboot} 
                                    act='update' 
                                    id_item={this.props.id_item} 
                                    item={this.props.item} 
                                    name={this.props.name} 
                                    table={this.props.table} />
                    }
                    {this.state.isModalEquip &&
                        <NewEquip onClose={this.changeEquip} 
                                    onReboot={this.props.onReboot} 
                                    act='update' 
                                    id_item={this.props.id_item} 
                                    item={this.props.item} 
                                    name={this.props.name} 
                                    table={this.props.table}
                                    equip_name={this.props.row.equip_name} />
                    }
                    {this.state.isModalTe &&
                        <SprItemTe onClose={this.changeModalTe} 
                                    onReboot={this.props.onReboot} 
                                    act='update'  
                                    item={this.props.item} 
                                    id_item={this.props.id_item} 
                                    name={this.props.name} 
                                    table={this.props.table} 
                                    type={this.props.type}
                                    kat_id={this.props.row.kat_id}/>
                    }
                    {this.state.isWarnOpen &&
                        <ModalWarn text='Вы уверены, что хотите удалить?' clickYes={this.modalYes} clickNo={this.modalNo} />
                    }
                </div>
                <div className='delete_button' onClick={this.changeWarn}><RiCloseLine /></div>
            </div>
            
        )
    }
}