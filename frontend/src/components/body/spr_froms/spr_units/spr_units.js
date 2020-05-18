import React, {Component}  from 'react';
import './spr_units.css';
import axio from 'axios';
import {NavLink} from 'react-router-dom';

export default class Spr_units extends Component {
    constructor () {
        super();
        this.state = {
            units: '',
        };
    }

    ChangeUnit = e => {
        this.setState({units: e.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            units: this.state.units,
        }      

        console.log(this.state.units);

        var err = '';
        if (data.units == ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err == ''){
            alert(err);
        }else{
            axio.post('/units/save', {data}).then(res => {
            console.log(res.data);
            if (res.data = 'POST COMPLITE') {
                alert('Сохранение успешно');
            }else{
                alert('Данные не удалось сохранить');
            }
            });
        }
    }

    render () {
        return (
                <div className='background_abs background_abs_pos'>
                    <div className="spr_units spr_units_pos">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <p>Ед. измерения: </p>
                                <input name='units' onChange={this.ChangeUnit} value={this.state.value}></input>
                            </div>
                            <div>
                                <button type='submit' className='action__button'>Сохранить</button>
                                <NavLink className='action__button out_button' to='/spr'>Отмена</NavLink>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}
