import React from 'react';
import './auth.css';
import axio from 'axios';
import {Redirect} from 'react-router-dom';
//import {withAuth} from '../../../Auth/index'

//import AuthForm from './AuthForm';

export default class Auth extends React.Component{
    constructor() {
        super();
        this.state = {
            login: '',
            password: '',
        };
    }

    componentDidMount () {
        this.props.setUserId(localStorage.getItem('user'));
        this.props.setAt(localStorage.getItem('at'));
        this.props.setRt(localStorage.getItem('rt'));
        console.log(this.props.isAuthorize);
        
        if (localStorage.getItem('at') === ''){
            localStorage.setItem('at', 'asdf');
        }
        axio.defaults.headers.common['at'] = localStorage.getItem('at');
        axio.defaults.headers.common['rt'] = localStorage.getItem('rt');
        axio.defaults.headers.common['us_id'] = localStorage.getItem('user');
    }

    //static contextType = ThemeContext;

    sendAuth = () => {
        /*localStorage.setItem('user', 'res.data.user');
        localStorage.setItem('at',' res.data.token');
        localStorage.setItem('rt', 'res.data.refreshToken');
        localStorage.setItem('userName', 'res.data.us_name');*/
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
            this.props.setUserId(res.data.user);
            this.props.setAt(res.data.token);
            this.props.setRt(res.data.refreshToken);
            localStorage.setItem('user', res.data.user);
            localStorage.setItem('at', res.data.token);
            localStorage.setItem('rt', res.data.refreshToken);
            localStorage.setItem('userName', res.data.us_name);
            this.props.setAuthorize(true);
            this.props.setUserName(res.data.us_name);
            console.log(res.data.us_name)
            axio.defaults.headers.common['at'] = res.data.token;
            axio.defaults.headers.common['rt'] = res.data.refreshToken;
            axio.defaults.headers.common['us_id'] = res.data.user;
            
        });
        
        console.log(this.props)
    }

    render() {
        return (
            <div className='auth'>
                <div className='auth_form'>
                    Логин:<input onChange={(e) => {this.setState({ login: e.target.value})}} value={this.state.login}></input>
                    Проль:<input type='password' onChange={(e) => {this.setState({password: e.target.value})}} value={this.state.password}></input>
                    <button onClick={this.sendAuth} className='button'>Авторизоваться</button>
                </div>
                {this.props.isAutorize ? <Redirect to='/'/> : null}
            </div>
    
        );
    }
}

//Auth.contextType = ThemeContext;

