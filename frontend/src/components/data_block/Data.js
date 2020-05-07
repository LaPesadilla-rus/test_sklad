import React, {Component} from 'react';
import './data_block.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

/*const BlockItem = (props) => {
    let path = './edit/block/' + props.id;
    return <NavLink className="Block" to={path}>{props.name}</NavLink>
}

function Data (props) {
    return (
        <div className="Data">
            <BlockItem name="BLOCK1" id="1"/>
            <BlockItem name="BLOCK2" id="2"/>
            <BlockItem name="BLOCK3" id="3"/>
            <BlockItem name="BLOCK4" id="4"/>
            <BlockItem name="BLOCK5" id="5"/>
        </div>
    );
}

export default Data;
*/
const BlockItem = (props) => {
    let path = './edit/block/' + props.id;
    return <NavLink className="Block" to={path} >
            <label>{props.name} {props.kod} Кол-во: 10шт Дата: {props.date}</label>
        </NavLink>
}

export default class Data extends Component{
    constructor() {
        super();
        this.state = {
            equips: [],
        };
    }

    componentDidMount = () => {
        axios.get('./all').then(res=>{
            console.log(res.data);
            this.setState({
                equips: res.data
            });
        });
    }
    //{this.state.equips.map( e_id => <NavLink className="Block" to='./edit/block/'>{e_id}</NavLink>)}
            

    render() {
        return (
            <div className="Data">
                <NavLink className="Block" to='./edit/block/'>
                    <label>Оперативная память KLDSA456 Кол-во: 10шт Дата:20.20.2020</label>   
                </NavLink>
                {this.state.equips.map( id => <BlockItem key={id.e_id} date={id.to_char} kod={id.e_kod} name={id.te_name} id={id.e_id} />)}
            </div>
        );
    }
}

/*
<BlockItem name="BLOCK1" id="1"/>
                <BlockItem name="BLOCK2" id="2"/>
                <BlockItem name="BLOCK3" id="3"/>
                <BlockItem name="BLOCK4" id="4"/>
                <BlockItem name="BLOCK5" id="5"/>
*/