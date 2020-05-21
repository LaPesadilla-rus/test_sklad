import React, {Component} from 'react';
import './spr_block.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import TableBlock from './table_block.js';

export default class Spr_block extends Component {
    constructor(props) {
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            main: [],
            isModalOpen: false,
        
        };
    }

    RebootData = () => {
        axio.get('./all').then(res=>{
            this.setState({
                main:  res.data,
            });
        });
    }

    componentDidMount = () => {
        axio.get('./all').then(res=>{
            this.setState({
                main:  res.data,
            });
        });    
    }

    changeModal = () => {
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    render(props){
        return(
            <div className='spr_block_main'>
                {this.state.main.map((id, index )=> 
                   <TableBlock key={this.nextUniqueId()} onReboot={this.RebootData} name={id.name} table={id.table} items={id.item} />)}
            </div>
        )
    }          
}