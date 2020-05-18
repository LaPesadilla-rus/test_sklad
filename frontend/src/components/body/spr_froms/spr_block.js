import React, {Component} from 'react';
import './spr_block.css';
import {NavLink} from 'react-router-dom';
import axio from 'axios';
import UnicId from 'react-html-id';

const BlockItem = (props) => {
    let path = './spr/' + props.name;
    return <div className="spr_block_data_item" ><NavLink className="spr_block_nav"  to={path} >{props.item}</NavLink></div>
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
            main: {    item: [],
                        name: '',
                        ref: '',    
                    },
            units: [],
            kat: [],
        
        };
    }

    componentDidMount = () => {
        axio.get('./spr/all').then(res=>{
            console.log(res.data[1].main);
            this.setState({
                main: res.data[1].main,
                //kat: res.data.kat, 
            });
        });

        /*axio.get('./spr/kat').then(res=>{
            console.log(res.data);
            this.setState({
                kat: res.data.item
            });
        });*/
        console.log(this.state.main);
    }

    render(){
        return(
            <div className='spr_block_main'>
                <div className='spr_block spr_block_pos'>
                    <div className='spr_block_heder'>Ед. измерения</div>
                    <NavLink className="data-table__body data-table__body_pos"  to='/spr/units' >+</NavLink>
                    <div className='spr_block_data'>
                        {/*this.state.units.map( id => <BlockItem key={this.nextUniqueId()} name='units' item={id.un_name} />)*/}
                    </div>
                </div>
                <div className='spr_block spr_block_pos'>
                    <div className='spr_block_heder'>Категории</div>
                    <NavLink className="data-table__body data-table__body_pos"  to='/spr/units' >+</NavLink>
                    <div className='spr_block_data'>
                        {/*this.state.kat.map( id => <BlockItem key={this.nextUniqueId()} name='units' item={id.kat_name} />)*/}
                    </div>
                </div>

                
            </div>
        )
    }          
}