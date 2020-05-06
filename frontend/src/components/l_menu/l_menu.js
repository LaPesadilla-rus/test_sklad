import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './l_menu.css';

export default class Menu extends Component{
    render (){
        return (
            <div className="Menu">
                MENU
                <NavLink className="button_block" activeClassName="act" to="/sklad/all">
                    Склад
                </NavLink> 
                <NavLink className="button_block" activeClassName="act" to="/reports/all">
                    Заявки
                </NavLink> 
            </div>
        );
    }
}

/*
                <div className="button_block">
                    <NavLink to='/sklad'>Склад</NavLink>
                </div> 
                <div className="button_block" to="/reports">
                    <NavLink to='/reports'>Заявки</NavLink>
                </div> 
*/