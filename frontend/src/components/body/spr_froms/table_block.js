import React, {Component} from 'react';
import './spr_block.css';
import {NavLink} from 'react-router-dom';
import Table_block_item from './table_block_item.js';
import Spr_item from './spr_item/spr_item.js';

const ButtonRef =(props) => {
    //console.log(props.item);
    let path = '/spr/all/' + props.hrf;
    return <div className="spr_block_data_item" >
                <NavLink className="spr_block_nav" to={{pathname: '/spr/all/redact', state: { reb: props.reb, name: props.name, table: props.table, item: props.item, id_item:props.id_item}}}>
                    {props.item}
                </NavLink>
            </div>
}

var un = 0;

export default class Table_block extends Component {
    constructor(props){
        super(props);
        this.state={
            name: '',
            id: '',
            items: [],
            item: '',
            table: '',
            onclik: props.ClickDiv,
            isModalOpen: false,
            onReboot: '',
        }

        this.componentDidMount = event =>{
            this.setState({
                name: props.name,
                items: props.items,
                table: props.table,
                onclik: props.ClickDiv,
                onReboot: props.onReboot,
            })
        }

    }

    onClickDiv = (e,a) =>{
        console.log('DIV CLICK');
        console.log(this.state.name + ' ' + this.state.table);
    }

    ukey (name){
        un++;
        return (name + '_' + un);
    }

    changeModal = () => {
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    render(){
        return(
            <div className='spr_block spr_block_pos'>
                <button className='spr_block_heder' >{this.props.name}</button>
                <div onClick={this.changeModal} className="data-table__body data-table__body_pos spr_block_text">+</div>
                <div className='spr_block_data'>
                    {this.props.items.map((id , index) => <Table_block_item key={this.ukey(this.props.table)} act={this.props.act} 
                        reb={this.props.reb} table={this.props.table} onReboot={this.props.onReboot} hrf='redact' name={this.props.name} id_item={id.id} item={id.item} />)}
                </div>
                {this.state.isModalOpen &&
                    <Spr_item onClose={this.changeModal} onReboot={this.state.onReboot} act='submit' name={this.props.name} table={this.props.table}/>
                }
            </div>
        )
    }
}