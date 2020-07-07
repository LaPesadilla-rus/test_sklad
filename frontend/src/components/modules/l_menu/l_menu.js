import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './l_menu.css';
import { MdAssignment, MdPersonPin, MdDvr, MdExitToApp, MdFilterFrames } from "react-icons/md";

export default class Menu extends Component{

    exitButton = () =>{
        this.props.setAuthorize(false);
        localStorage.setItem('user', '');
        localStorage.setItem('at', '');
        localStorage.setItem('rt', '');
        this.props.setUserId('');
        this.props.setAt('');
        this.props.setRt('');
    }

    render (){
        return (
            <div className="Menu">
                <div className="absolute_block">
                    <p>Меню</p>
                    <NavLink className="button_block" activeClassName="act" to="/sklad/all">
                        <MdAssignment/><label>Склад</label>
                    </NavLink> 
                    <NavLink className="button_block" activeClassName="act" to="/otdel">
                        <MdPersonPin/><label>Отделение</label>
                    </NavLink>
                    <NavLink className="button_block" activeClassName="act" to="/zurnal">
                        <MdFilterFrames/><label>Журналы</label>
                    </NavLink>
                    <NavLink className="button_block" activeClassName="act" to="/reports/all">
                        <MdDvr/><label>Заявки</label>
                    </NavLink> 
                    <div className="button_block" onClick={this.exitButton}>
                        <MdExitToApp/><label>Выход</label>
                    </div> 
                </div>
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