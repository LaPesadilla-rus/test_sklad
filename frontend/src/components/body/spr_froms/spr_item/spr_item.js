import React, {Component}  from 'react';
import './spr_item.css';
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
            show: { visibility: 'visible'},
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

        console.log(this.state.item);

        var err = '';
        if (data.item == ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err == ''){
            alert(err);
        }else{
            axio.post('/spr/save', {data}).then(res => {
            console.log(res.data);
            if (res.data = 'POST COMPLITE') {
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
        if (data.item == ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err == ''){
            alert(err);
        }else{
            axio.post('/spr/update', {data}).then(res => {
            console.log(res.data);
            if (res.data = 'POST COMPLITE') {
                alert('Сохранение успешно');
            }else{
                alert('Данные не удалось сохранить');
            }
            });
            console.log('Submit Event : ' + this.state.item);
        }
    }

    componentDidMount = event => {
        if (this.props.item){
            this.setState({
                item: this.props.item,
                table: this.props.table,
                id_item: this.props.id_item,
                show: this.props.style,
            })
        }else{
            this.setState({
                item: '',
                table: this.props.table,
                show: this.props.style,
            })
        }
        //console.log( this.props.table)
    }

    HideBlock = () => {
        /*this.setState({
            show: { visibility: 'hidden'}
        })*/
        this.props.onVisibleChange('hidden');
        //console.log('hidden');
    }

    render (props) {
        let form
        const a = this.props.show_block;

        /*this.setState({
            show: this.props.style
        })*/

        if (this.props.item){
            form = <form onSubmit={this.handleUpdate}>
                        <div>
                            <p>Справочник: {this.props.name}</p>
                            <input name='inpt' type='text' onChange={this.ChangeUnit} value={this.state.item}></input>
                        </div>
                        <div>
                            <button type='submit' className='action__button'>Сохранить изменения</button>
                            <button type='button' className='action__button out_button' onClick={this.HideBlock}>Отмена</button>
                        </div>
                    </form>
        }else{
            form = <form onSubmit={this.handleSubmit}>
                        <div>
                            <p>Справочник: {this.props.name}</p>
                            <input name='inpt' type='text' onChange={this.ChangeUnit} value={this.state.item}></input>
                        </div>
                        <div>
                            <button type='submit' className='action__button'>Сохранить</button>
                            <button type='button' className='action__button out_button' onClick={this.HideBlock}>Отмена</button>
                        </div>
                    </form>
        }

        

        return (
                <div className='background_abs background_abs_pos' style={this.state.show}>
                    <div className="spr_units spr_units_pos">
                        {form}
                    </div>
                </div>
        );
    }
}
