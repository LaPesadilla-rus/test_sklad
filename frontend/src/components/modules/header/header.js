import React, {Component} from 'react';
import './header.css';

export default class Header extends Component{
    render (){console.log(this.props)
        return (
            <div className="header header_pos">
                <div className="nameSite"> Склад </div>
                <div className="login"> Пользователь: {this.props.userName}</div>
            </div>
        );
    }
}