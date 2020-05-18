import React, {Component} from 'react';
import './spr_block.css';
import {NavLink, Link} from 'react-router-dom';
import axio from 'axios';
import UnicId from 'react-html-id';
import Spr_unit from './spr_units/spr_units.js';

const BlockItem = (props) => {
    let path = './spr/' + props.name;
    return <div className="spr_block_data_item" ><Link className="spr_block_nav"  to={{
        pathname: path,
        state: { data: props.item }
      }} >{props.item}</Link></div>
}

const BlockItem2 = (props) => {
    let path = './spr/' + props.name;
    return <div className='spr_block spr_block_pos'>
                <div className='spr_block_heder'>Категории</div>
                <NavLink className="data-table__body data-table__body_pos"  to='/spr/units' >+</NavLink>
                <div className='spr_block_data'>
                    <div className="spr_block_data_item" ><NavLink className="spr_block_nav"  to={path} >{props.item}</NavLink></div>
                </div>
            </div>
}

export default class Spr_block extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            main: [],
            units: [],
            kat: [],
        
        };
    }

    componentDidMount = () => {
        axio.get('./spr/all').then(res=>{
            console.log(res.data[0]);
            this.setState({
                //main:  res.data,
                kat: res.data.kat,
                units: res.data.units, 
            });
            console.log(this.state.main);
        });

        /*axio.get('./spr/kat').then(res=>{
            console.log(res.data);
            this.setState({
                kat: res.data.item
            });
        });*/
        
    }

    render(){
        return(
            <div className='spr_block_main'>
                <div className='spr_block spr_block_pos'>
                    <div className='spr_block_heder'>Ед. измерения</div>
                    <NavLink className="data-table__body data-table__body_pos"  to='/spr/units' >+</NavLink>
                    <div className='spr_block_data'>
                        {this.state.units.map( id => <BlockItem key={this.nextUniqueId()} name='units' item={id.un_name} />)}
                    </div>
                </div>
                <div className='spr_block spr_block_pos'>
                    <div className='spr_block_heder'>Категории</div>
                    <NavLink className="data-table__body data-table__body_pos"  to='/spr/units' >+</NavLink>
                    <div className='spr_block_data'>
                        {this.state.kat.map( id => <BlockItem key={this.nextUniqueId()} name='units' item={id.kat_name} />)}
                    </div>
                </div>  
            </div>
        )
    }          
}