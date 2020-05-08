import React, {Component} from 'react';
import './data_block.css';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import {
    withRouter
  } from "react-router-dom";

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
    let path = './edit/' + props.id;
    return <NavLink className="Block" to={path} >
            <label>{props.name}</label>
            <label>{props.kod}</label> 
            <label>{props.kol} шт</label> 
            <label>{props.date}</label>
        </NavLink>
}

export default class Data extends Component{
    constructor() {
        super();
        this.state = {
            equips: [],
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const a = event.target.parentElement.attributes[1].value;
        //console.log(event.target.parentElement.attributes[1].value);
        this.props.history.push('/sklad/edit/' + a);

        const data = {
            id: a
        }

        axios.post('/sklad/edit', {data}).then(res => {
            console.log(res.data);
            if (res.data = 'POST COMPLITE') {
                alert('Сохранение успешно');
            }else{
                alert('Данные не удалось сохранить');
            }
        });
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
                <form onSubmit={this.handleSubmit}>
                <div  className="Block-head" onClick={this.handleSubmit} id='123' >
                         
                            <label>Категория</label>
                            <label>Инвентарный номер</label> 
                            <label>Кол-во</label> 
                            <label>Дата</label>
                 
                           
                    </div>
                    {this.state.equips.map( id => <BlockItem key={id.e_id} kol={id.e_kol} date={id.to_char} kod={id.e_kod} name={id.te_name} id={id.e_id} />)}
                </form>
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