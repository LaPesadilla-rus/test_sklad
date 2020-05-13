import React, {Component} from 'react';
import './header.css';

export default class Header extends Component{
    render (){
        return (
            <div className="header header_pos">
                <div className="nameSite"> Склад 9000 </div>
                <div className="login"> Пользователь: Поьзователь1</div>
            </div>
        );
    }
}