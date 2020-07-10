import React, {Component}  from 'react';
import './new_user.css';
import axio from 'axios';

import ModalInfo from '../../../simple_comp/modal_info/modalInfo';

export default class New_user extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            login: '',
            pass1: '',
            pass2:'',
            role: '',
            isShowMessage: false,
            errTxt: '',
            color: '',
            name: ''
        };
    }

    onSubmith = event => {
        event.preventDefault();

        const data = {
            login: this.state.login,
            pass1: this.state.pass1,
            pass2: this.state.pass2,
            role: this.state.role,
            name: this.state.name,
        }
        console.log(data)      
        var err = '';
        if (data.login === ''){
            err = err + 'Логин не введен! ';
            //console.log(err)
        }
        if (data.pass1 !== data.pass2 || data.pass1 === '' || data.pass2 === ''){
            err = err + 'Пароли не совпадают! ';
        }
        if (data.role === '-1' || data.role === ''){
            err = err + "Роль не выбрана";
        }
        if (err !== ''){
            //console.log(err)
            this.setState({ errTxt: err});
            this.showMessage(0);
        }else{
            axio.post('/users/new', {data}).then(res => {
                if (res.data === 'SAVE COMPLITE') {
                this.setState({ errTxt: 'Сохранение успешно'});
                this.showMessage(1);
                //this.props.onReboot();
                this.props.onClose();
                }else{
                    this.setState({ errTxt: 'Не сохранено'});
                    this.showMessage(0);
                }
            });
            
        }
    }

    handleUpdate = event => {
        event.preventDefault();
        const data = {
            item: this.state.item_name,
            table: this.state.table,
            id_item: this.state.id_item
        } 
        var err = '';
        if (data.item === ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err === ''){
            alert(err);
        }else{
            axio.post('/spr/update', {data}).then(res => {
            //console.log(res.data);
            if (res.data === 'UPDATE COMPLITE') {
                //alert('Редактирование успешно');
                this.props.onReboot();
                this.onClose();
            }else{
                alert('Данные не удалось сохранить');
            }
            //console.log('Update Event : ' + res.data);
            });
            
        }
    }

    componentDidMount = event => {
        //console.log(this.props)
        if (this.props.item){
            this.setState({
                item_name: this.props.item,
                table: this.props.table,
                id_item: this.props.id_item,
                show: this.props.style,
            })
        }else{
            this.setState({
                table: this.props.table,
                show: this.props.style,
            })
        }
    }

    showMessage = (val) => {
        this.setState(state => ({ isShowMessage : !state.isShowMessage, color: val}))
    }

    render () {
        return (
                <div className='background_modal background_modal_pos'>
                    <div className="modal modal_pos">
                        <div>
                            <label>Логин: </label>
                            <input onChange={(e) => {this.setState({ login: e.target.value})}} value={this.state.login}></input>
                        </div>
                        <div>
                            <label>Пароль: </label>
                            <input type='password' onChange={(e) => {this.setState({ pass1: e.target.value})}} value={this.state.pass1}></input>
                        </div>
                        <div>
                            <label>Повторите пароль: </label>
                            <input type='password' onChange={(e) => {this.setState({ pass2: e.target.value})}} value={this.state.pass2}></input>
                        </div>
                        <div>
                            <label>Выводимое имя: </label>
                            <input onChange={(e) => {this.setState({ name: e.target.value})}} value={this.state.name}></input>
                        </div>
                        <div>
                            <p><label>Роли: 0-админ</label></p>
                            <p><label>Роли: 1-пользователь</label></p>
                            <p><label>Роли: 777-гость</label></p>
                        </div>
                        <div>
                            <label>Роль: </label>
                            <select onChange={(e) => {this.setState({ role: e.target.value})}} value={this.state.role}>
                                <option value='-1'>---</option>
                                <option value='0'>0</option> 
                                <option value='1'>1</option>
                                <option value='777'>777</option>
                            </select>
                        </div>
                        <div className='modal_button_div'>
                            <button type='submit' onClick={this.onSubmith} className='action__button'>Сохранить</button>
                            <button type='button' className='action__button out_button' onClick={this.props.onClose}>Отмена</button>
                        </div>
                    </div>
                    {
                        this.state.isShowMessage && <ModalInfo showMessage={this.showMessage} txt={this.state.errTxt} color={this.state.color} />
                    }
                </div>
        );
    }
}
