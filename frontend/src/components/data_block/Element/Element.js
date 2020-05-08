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
            kol: '',
            date: '',
            type_data: [],
            man_data: [],
        };

    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            name: this.state.name,
            e_type: this.state.e_type,
            f_name: this.state.f_name,
            kol: this.state.kol,
            date: this.state.date
        }
        var err = '';
        if (data.name == ''){
            err = err + 'Инвентарный номер не введен!';
        }
        if (data.kol == ''){
            err = err + 'Количество не введено!';
        }
        if (data.date == ''){
            err = err + 'Дата не введена!';
        }
        if (!err == ''){
            alert(err);
        }else{
            console.log(data);
            axio.post('/sklad/new/save', {data}).then(res => {
            console.log(res.data);
            if (res.data = 'POST COMPLITE') {
                alert('Сохранение успешно');
                this.props.history.push('/sklad/all');
            }else{
                alert('Данные не удалось сохранить');
            }
        });
        }
        
    }

    handleChange = event => {
        if (event.target.name = 'name')
            this.setState({name: event.target.value});
        //console.log(event.target.name);
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

    ChangeKol = event => {
        this.setState({kol: event.target.value});
    };

    componentDidMount = () => {
        axio.get('./new/type').then(res=>{
            console.log(res.data);
            this.setState({
                type_data: res.data
            });
        });
        axio.get('./new/man').then(res=>{
            console.log(res.data);
            this.setState({
                man_data: res.data
            });
        });
    }


    render () {
        return (
            <div className="Element">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <p>Инвентарный номер </p>
                        <p>Тип элемента </p>
                        <p>Производитель </p>
                        <p>Количество </p>
                        <p>Дата ввода </p>
                    </div>
                    <div>
                        <p><input name='name' onChange={this.handleChange}></input> </p>
                        <p>
                            <select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.type_data.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}
                                  
                            </select> 
                        </p>
                        <p>
                            <select id="fact_name" name='f_name' onChange={this.ChangeFirm}>
                            {this.state.man_data.map( id => <option key={id.m_id} value={id.m_id}>{id.m_name}</option>)}
                                
                            </select> 
                        </p>
                        <p><input name='kol' type='number' onChange={this.ChangeKol}></input> </p>
                        <p><input type="date" name='date' onChange={this.ChangeDate}></input> </p>
                    </div>
                    <button type='submit' className="action_block">
                        Сохранить
                    </button>
                    <button type='reset' className="action_block" >
                        Отменить
                    </button>
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