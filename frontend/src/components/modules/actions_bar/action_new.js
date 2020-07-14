import React, {Component} from 'react';
import './actions.css';
//import Users from './components/Users.js';
//import Users from '../Users.js'
import { NavLink } from 'react-router-dom';
import { MdAddBox, MdCreateNewFolder, MdFolder } from 'react-icons/md';
import { IconContext } from "react-icons";

export default class Action_new extends Component{

    render (){
        return (
                <div className = 'button_container'>
                    <IconContext.Provider value={{size: "25"}}>
                        <button onClick={this.props.changeNew} className="button" >
                        <MdCreateNewFolder /> <label>Поступление</label>
                        </button>
                        <button className="button" onClick={this.props.changeOut}>
                            <MdAddBox /> <label>Выписка</label>
                        </button>
                        <NavLink className="button" to="/spr/all">
                            <MdFolder /> <label>Справочники</label>
                        </NavLink>
                    </IconContext.Provider>
                </div>
        );
    }
}