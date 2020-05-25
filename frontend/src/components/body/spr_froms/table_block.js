import React, {Component} from 'react';
import './spr_block.css';
import TableBlockItem from './table_block_item.js';
import SprItem from './spr_item/spr_item.js';
import NewEquip from './new_equip/new_equip.js';

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
            isModalOpen: false,
            isModalEquip: false,
            onReboot: '',
        }
    }

    componentDidMount = () =>{
        this.setState({
            onReboot: this.props.onReboot,
        })
    }

    ukey (name){
        un++;
        return (name + '_' + un);
    }

    changeModal = () => {
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    changeEquip = () => {
        this.setState(state => ({ isModalEquip: !state.isModalEquip}))
    }

    render(){
        let block;
        if (this.props.type === 'equip'){
            block = <div onClick={this.changeEquip} className="data-table__body data-table__body_pos spr_block_text">+</div>
        }else{
            block = <div onClick={this.changeModal} className="data-table__body data-table__body_pos spr_block_text">+</div>
        }
        return(
            <div className='spr_block spr_block_pos'>
                <button className='spr_block_heder' >{this.props.name}</button>
                {block}
                <div className='spr_block_data'>
                    {this.props.items.map(id => <TableBlockItem key={this.ukey(this.props.table)} act={this.props.act} 
                        reb={this.props.reb} table={this.props.table} onReboot={this.props.onReboot} hrf='redact' 
                        name={this.props.name} id_item={id.id} item={id.item} type={this.props.type}/>)}
                </div>
                {this.state.isModalOpen &&
                    <SprItem onClose={this.changeModal} onReboot={this.props.onReboot} act='submit' name={this.props.name} table={this.props.table} type={this.props.type}/>
                }
                {this.state.isModalEquip &&
                    <NewEquip onClose={this.changeEquip} onReboot={this.props.onReboot} act='submit' name={this.props.name} table={this.props.table}/>
                }
            </div>
        )
    }
}