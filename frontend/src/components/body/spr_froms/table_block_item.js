import React, {Component} from 'react';
import './spr_block.css';
import Spr_item from './spr_item/spr_item.js';
import Modal_warn from './spr_item/modal_warn.js';
import axio from 'axios';

export default class Table_block_item extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            items: [],
            table: '',
            isModalOpen: false,
            isWarnOpen: false,
            isDeleteData: false,
        }

        this.componentDidMount = event =>{
            this.setState({
                name: props.name,
                items: props.items,
                table: props.table,
            })
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
        //console.log(res.data);
        if (res.data = 'DELETE COMPLITE') {
            alert('Данные удалены');
            this.props.onReboot();
        }else{
            alert('Данные не удалось сохранить');
        }
        //console.log('Submit Event : ' + res.data);
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
                        <Spr_item onClose={this.changeModal} onReboot={this.props.onReboot} act='update' id_item={this.props.id_item} item={this.props.item} name={this.props.name} table={this.props.table} />
                    }
                    {this.state.isWarnOpen &&
                        <Modal_warn onClose={this.changeWarn} onDel={this.handleDelete} />
                    }
                </div>
                <div className='delete_button' onClick={this.changeWarn}><label>x</label></div>
            </div>
            
        )
    }
}