import React, {Component} from 'react';
import './actions.css';
import {NavLink} from 'react-router-dom';


function Action_s () {
    return (
        <div className="Action_s">
            <NavLink className="action_block" to="/sklad/new/save">
                Сохранить
            </NavLink>
            <NavLink className="action_block" to="/sklad/new/cancel">
                Отменить
            </NavLink>
        </div>
    );
}

export default Action_s;