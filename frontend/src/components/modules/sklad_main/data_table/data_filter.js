import React, {Component} from 'react';
import './data_table.css';
import UnicId from 'react-html-id';
import axio from 'axios';

import { MdDone, MdDeleteForever} from "react-icons/md";

export default class DataFilter extends Component {
    constructor(){
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            kat_id: '',
            inv_txt: '',
            name: '',
            data: [],
        }
    }

    componentDidMount = () => {
        axio.get('/sklad/new/kat').then(res=>{
            this.setState({
                data: res.data
            });
        });
    }

    sbrosButton = () => {
        this.setState({
            kat_id: '-1',
            inv_txt: '',
            name: ''
        })
    }

    primFilter = () => {
        let data = {};

        if (this.state.inv_txt !== ''){
            data.inv_txt = this.state.inv_txt;
        }
        if (this.state.name !== ''){
            data.name = this.state.name
        }
        if (this.state.kat_id !== '' && this.state.kat_id !== '-1'){
            data.kat_id = this.state.kat_id;
        }
        this.props.filterDownload(data)
    }

    render (){
        return(
            <div>
                <label>Категория</label>
                <select onChange={(e) => { this.setState ({ kat_id: e.target.value})}} value={this.state.kat_id}>
                        <option key={this.nextUniqueId()} value='-1'></option>
                        {this.state.data && this.state.data.map( row => <option key={this.nextUniqueId()} value={row.kat_id}>{row.kat_name}</option>)}
                </select>

                <label>Инв. номер</label>
                <input onChange={(e) => {this.setState({ inv_txt: e.target.value})}} value={this.state.inv_txt} ></input>

                <label>Наименование модели</label>
                <input onChange={(e) => {this.setState({ name: e.target.value})}} value={this.state.name} ></input>
                <div className='button_container'>
                    <button className='button button_green' onClick={this.primFilter}><MdDone/>Применить</button>
                    <button className='button' onClick={this.sbrosButton} ><MdDeleteForever/>Сбросить</button>
                </div>
                
            </div>
        )
    }
}