import React, {Component} from 'react';
import './actions.css';
//import Users from './components/Users.js';
//import Users from '../Users.js'
import {NavLink} from 'react-router-dom';

export default class Action_new extends Component{
    render (){
        return (
                <NavLink className="action_block" to="/sklad/new">
                    Новый
                </NavLink>
        );
    }
}