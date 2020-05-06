import React, {Component} from 'react';
import './header.css';

export default class Header extends Component{
    render (){
        return (
            <div className="Header">
                <div className="NameSite"> SKALD </div>
                <div className="Login"> USER: 123</div>
            </div>
        );
    }
}