import React, {Component} from 'react';
import './actions.css';
//import Users from './components/Users.js';
//import Users from '../Users.js'
import {NavLink} from 'react-router-dom';

export default class Action_new extends Component{
    render (){
        return (
                <div className = 'Action_new'>
                    <NavLink className="action__button actions__button_pos new_button" to="./new">
                        Поступление
                    </NavLink>
                    <NavLink className="action__button actions__button_pos" to="/sklad/out">
                        Выписка
                    </NavLink>
                    <NavLink className="action__button actions__button_pos out_button" to="./new">
                        Просмотр движений
                    </NavLink>
                    <NavLink className="action__button actions__button_pos info_button" to="/spr/all">
                        Справочники
                    </NavLink>
                </div>
        );
    }
}