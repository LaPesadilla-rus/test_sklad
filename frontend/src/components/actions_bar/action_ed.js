import React, {Component} from 'react';
import './actions.css';
import {NavLink} from 'react-router-dom';


function Action_ed () {
    return (
        <div className="Action_ed">
            <NavLink className="action_block" to="/sklad/edit/save">
                Сохранить
            </NavLink>
            <NavLink className="action_block" to="/sklad/edit/cancel">
                Отменить
            </NavLink>
            <NavLink className="action_block" to="/sklad/edit/delete">
                Удалить
            </NavLink>
        </div>
    );
}

export default Action_ed;