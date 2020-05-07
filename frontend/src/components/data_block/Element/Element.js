import React, {Component} from 'react';
import './Element.css';
import {NavLink} from 'react-router-dom';
import axio from 'axios';


export default class Element extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            e_type: '1',
            f_name: '1',
            date: '',
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            name: this.state.name,
            e_type: this.state.e_type,
            f_name: this.state.f_name,
            date: this.state.date
        }

        axio.post('/sklad/new/save', {data}).then(res => {
            console.log(res.data);
        });
    }

    handleChange = event => {
        if (event.target.name = 'name')
            this.setState({name: event.target.value});
        console.log(event.target.name);
    };

    ChangeDate = event => {
        this.setState({date: event.target.value});
    };

    ChangeType = event => {
        this.setState({e_type: event.target.value});
    };

    ChangeFirm = event => {
        this.setState({f_name: event.target.value});
    };

    


    render () {
        return (
            <div className="Element">
                <form onSubmit={this.handleSubmit}>
                <div>
                    <p>Название элемента </p>
                    <p>Тип элемента </p>
                    <p>Производитель </p>
                    <p>Дата ввода </p>
                </div>
                <div>
                    <p><input name='name' onChange={this.handleChange}></input> </p>
                    <p>
                        <select id="elem_type" name='e_type' onChange={this.ChangeType}>
                            <option value="1">Оперативная память</option>
                            <option value="2">Жесткий диск</option>   
                        </select> 
                    </p>
                    <p>
                        <select id="fact_name" name='f_name' onChange={this.ChangeFirm}>
                            <option value="1">Производитель 1</option>
                            <option value="2">Производитель 2</option>
                        </select> 
                    </p>
                    <p><input type="date" name='date' onChange={this.ChangeDate}></input> </p>
                </div>
                <button type='submit' className="action_block">Сохранить</button>
                </form>
            </div>
        );
    }
    
}
    

/*
            <p>Название элемента <input></input></p>
            <p>Тип элемента <input></input></p>
            <p>Производитель <input></input></p>
            <p>Дата ввода <input></input></p>

*/