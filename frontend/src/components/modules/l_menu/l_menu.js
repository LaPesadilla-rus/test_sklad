import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './l_menu.css';
import { MdAssignment, MdPersonPin, MdDvr, MdExitToApp } from "react-icons/md";

export default class Menu extends Component{
    render (){
        return (
            <div className="Menu">
                <p>Меню</p>
                <NavLink className="button_block" activeClassName="act" to="/sklad/all">
                    <MdAssignment/><label>Склад</label>
                </NavLink> 
                <NavLink className="button_block" activeClassName="act" to="/otdel">
                    <MdPersonPin/><label>Отделение</label>
                </NavLink>
                <NavLink className="button_block" activeClassName="act" to="/reports/all">
                    <MdDvr/><label>Заявки</label>
                </NavLink> 
                <NavLink className="button_block" activeClassName="ext" to="/exit">
                    <MdExitToApp/><label>Выход</label>
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