import React, {Component}  from 'react';
import './spr_units.css';
import axio from 'axios';
import {NavLink} from 'react-router-dom';

export default class Spr_units extends Component {
    constructor (props) {
        super(props);
        this.state = {
            item: '',
            inp: '',
            table:'',
            id_item: '',
        };
    }

    ChangeUnit = e => {
        this.setState({item: e.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            item: this.state.item,
            table: this.state.table,
            id_item: this.state.id_item
        }      

        //console.log(this.state.item);

        var err = '';
        if (data.item === ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err === ''){
            alert(err);
        }else{
            axio.post('/spr/save', {data}).then(res => {
            console.log(res.data);
            if (res.data === 'POST COMPLITE') {
                alert('Редактирование успешно');
            }else{
                alert('Данные не удалось сохранить');
            }
            });
            console.log('Submit Event : ' + this.state.item);
        }
    }

    handleUpdate = event => {
        event.preventDefault();
        const data = {
            item: this.state.item,
            table: this.state.table,
            id_item: this.state.id_item
        } 
        console.log('Update Event : ' + this.state.item);

        var err = '';
        if (data.item === ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err === ''){
            alert(err);
        }else{
            axio.post('/spr/update', {data}).then(res => {
            console.log(res.data);
            if (res.data === 'POST COMPLITE') {
                alert('Сохранение успешно');
                this.SaveComplite()
            }else{
                alert('Данные не удалось сохранить');
            }
            });
            console.log('Submit Event : ' + this.state.item);
        }
    }

    SaveComplite = () => {
        this.props.onSave('abc');
        //this.props.location.state.reb;
    }

    componentDidMount = event => {
        if (this.props.location.state.item){
            this.setState({
                item: this.props.location.state.item,
                table: this.props.location.state.table,
                id_item: this.props.location.state.id_item,
            })
        }else{
            this.setState({
                item: '',
                table: this.props.location.state.table,
            })
        }
        //console.log( this.props.location.state.table)
    }

    render (props) {
        let form
        if (this.props.location.state.item){
            form = <form onSubmit={this.handleUpdate}>
                        <div>
                            <p>Справочник: {this.props.location.state.name}</p>
                            <input name='inpt' type='text' onChange={this.ChangeUnit} value={this.state.item}></input>
                        </div>
                        <div>
                            <button type='submit' className='action__button'>Сохранить изменения</button>
                            <NavLink className='action__button out_button' to={{pathname: '/spr/all', state: { reboot: 'reboot' }}}>Отмена</NavLink>
                        </div>
                    </form>
        }else{
            form = <form onSubmit={this.handleSubmit}>
                        <div>
                            <p>Справочник: {this.props.location.state.name}</p>
                            <input name='inpt' type='text' onChange={this.ChangeUnit} value={this.state.item}></input>
                        </div>
                        <div>
                            <button type='submit' className='action__button'>Сохранить</button>
                            <NavLink className='action__button out_button' to={{pathname: '/spr/all', state: { reboot: 'reboot' }}}>Отмена</NavLink>
                        </div>
                    </form>
        }

        

        return (
                <div className='background_abs background_abs_pos'>
                    <div className="spr_units spr_units_pos">
                        {form}
                    </div>
                </div>
        );
    }
}
