import React, {Component} from 'react';
import './header.css';

export default class Header extends Component{
    render (){
        return (
            <div className="Header">
                <div className="NameSite"> Склад 9000 </div>
                <div className="Login"> Пользователь: Поьзователь1</div>
            </div>
        );
    }
}