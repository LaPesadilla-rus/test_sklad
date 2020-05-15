import React, {Component}  from 'react';
import './spr_units.css';

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
        if (data.units === ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err === ''){
            alert(err);
        }else{
            /*axio.post('/sklad/new/save', {data}).then(res => {
            console.log(res.data);
            if (res.data = 'POST COMPLITE') {
                alert('Сохранение успешно');
                this.props.history.push('/sklad/all');
            }else{
                alert('Данные не удалось сохранить');
            }
            });*/
        }
    }

    render () {
        return (
                <div className="spr_units spr_units_pos">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <p>Ед. измерения: </p>
                            <input name='units' onChange={this.ChangeUnit} value={this.state.value}></input>
                        </div>
                        <div>
                            <button type='submit' className='action__button'>Сохранить</button>
                            <button className='action__button out_button'>Отмена</button>
                        </div>
                    </form>
                </div>
        );
    }
}
