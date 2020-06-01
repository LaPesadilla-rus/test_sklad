import React, {Component} from 'react';
import './actions.css';
//import Users from './components/Users.js';
//import Users from '../Users.js'
import { NavLink } from 'react-router-dom';
import { MdAddBox, MdCreateNewFolder, MdFolder } from 'react-icons/md';
import { IconContext } from "react-icons";

import InputForm from '../sklad_main/input_form/input_form';

export default class Action_new extends Component{
    render (){
        return (
                <div className = 'Action_new'>
                    <IconContext.Provider value={{size: "25"}}>
                        <button onClick={this.props.changeEdit} className="action__button actions__button_pos new_button" >
                        <MdCreateNewFolder /> <label>Поступление</label>
                        </button>
                        <NavLink className="action__button actions__button_pos" to="/sklad/out">
                            <MdAddBox /> <label>Выписка</label>
                        </NavLink>
                        <NavLink className="action__button actions__button_pos out_button" to="./new">
                            <MdAddBox /> <label>Просмотр движений</label>
                        </NavLink>
                        <NavLink className="action__button actions__button_pos info_button" to="/spr/all">
                            <MdFolder /> <label>Справочники</label>
                        </NavLink>
                    </IconContext.Provider>
                </div>
        );
    }
}