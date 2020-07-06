import React, {Component} from 'react';
import './auth.css';
import axio from 'axios';

export default class Auth extends Component{
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
        };
    }

    primFiltr = () => {
        var data = {
            flDate1: this.state.flDate1,
            flDate2: this.state.flDate2,
            invNum: this.state.invNum,
            contrNum: this.state.contrNum,
        }
        axio.post('/zurnal/postupl', {data}).then(res=>{
            console.log(res.data)
            this.setState({
                data: res.data
            })
        });
        this.setState({buttonStatus: 0});
    }

    sendAuth = () => {
        console.log(this.state.login + ' ' + this.state.password);
        if (this.state.login === ''){
            alert('Не веден логин');
            return 0;
        }
        if (this.state.password === ''){
            alert("Не введен пароль");
            return 0;
        }
        let data = {
            login: this.state.login,
            password: this.state.password
        }
        axio.post('/auth/login', {data}).then(res=>{
            console.log(res.data)
        });
    }

    render() {
        return (
            <div className='auth'>
                <div className='auth_form'>
                    Логин:<input onChange={(e) => {this.setState({ login: e.target.value})}} value={this.state.login}></input>
                    Проль:<input type='password' onChange={(e) => {this.setState({password: e.target.value})}} value={this.state.password}></input>
                    <button onClick={this.sendAuth} className='button'>Авторизоваться</button>
                </div>
            </div>
    
        );
    }
}

