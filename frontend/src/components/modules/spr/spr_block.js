import React, {Component} from 'react';
import './spr_block.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import TableBlock from './table_block.js';
import Relation from './relation/relationContainer'

export default class Spr_block extends Component {
    constructor(props) {
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            main: [],
            isModalOpen: false,
            isRelationOpen: false,
        };
    }

    RebootData = () => {
        axio.get('/spr/all').then(res=>{
            this.setState({
                main:  res.data,
            });
        });
    }

    componentDidMount = () => {
        axio.get('/spr/all').then(res=>{
            this.setState({
                main:  res.data,
            });
        });    
    }

    changeModal = () => {
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    changeRelation = () => {
        this.setState(state => ({ isRelationOpen: !state.isRelationOpen}))
    }

    render(props){
        return(
            <div>
                <button className='button' onClick={this.changeRelation}>Создать связь</button>
                <div className='spr_block_main'>
                    {this.state.main.map((id, index )=> 
                    <TableBlock key={this.nextUniqueId()} onReboot={this.RebootData} name={id.name} table={id.table} items={id.item} type={id.type} />)}
                </div>
                {this.state.isRelationOpen && <Relation onClose={this.changeRelation}/>}
            </div>
        )
    }          
}