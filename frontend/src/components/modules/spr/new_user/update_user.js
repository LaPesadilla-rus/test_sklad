import React, {Component}  from 'react';
import './new_user.css';
import axio from 'axios';
import UnicId from 'react-html-id';

import ModalInfo from '../../../simple_comp/modal_info/modalInfo';

export default class UpdateUser extends Component {
    
    constructor (props) {
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            login: '',
            pass1: '',
            pass2:'',
            role: '',
            isShowMessage: false,
            errTxt: '',
            color: '',
            name: '',
            login_data: [],
            log_id: ''
        };
    }

    onSubmith = event => {
        event.preventDefault();

        const data = {
            pass1: this.state.pass1,
            pass2: this.state.pass2,
            role: this.state.role,
            name: this.state.name,
            log_id: this.state.log_id
        }
        console.log(data)      
        var err = '';
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
            axio.post('/users/upd', {data}).then(res => {
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

    componentDidMount = () => {
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
        axio.get('/user/list').then( res => {
            this.setState({
                login_data: res.data
            });
        })
    }

    showMessage = (val) => {
        this.setState(state => ({ isShowMessage : !state.isShowMessage, color: val}))
    }

    changeLogin = (e) => {
        let val = e.target.value;
        
        this.state.login_data.forEach( row => {
            if( row.us_id === parseInt(val)){
                this.setState({
                    name: row.us_name,
                    role: row.us_role
                })
            }
        })

        this.setState({
            log_id: val
        })
    }

    render () {
        return (
                <div className='background_modal background_modal_pos'>
                    <div className="modal modal_pos">
                        <div>
                            <label>Обновление данных</label>
                        </div>
                        <div>
                            <label>Логин: </label>
                            <select onChange={this.changeLogin} value={this.state.log_id}>
                                <option value='-1'></option>
                                {this.state.login_data && this.state.login_data.map( row => <option key={this.nextUniqueId()} value={row.us_id}>{row.us_login}</option>)}     
                            </select>
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
