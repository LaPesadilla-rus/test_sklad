import React from 'react';
import {withAuth} from '../../../Auth/index'
import { Redirect } from 'react-router-dom';

export default withAuth (({ isAutorized, autorize}) => 
    isAutorized ? (<Redirect to="/public"/>, console.log(isAutorized)) :
                <div className='auth_form'>
                    Логин:<input ></input>
                    Проль:<input ></input>
                    {console.log(isAutorized)}
                    <button onClick={autorize} className='button'>Авторизоваться</button>
                </div>
)