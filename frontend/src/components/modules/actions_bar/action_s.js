import React from 'react';
import './actions.css';
import {NavLink} from 'react-router-dom';


function Action_s () {
    return (
        <div className="Action_s">
            <NavLink className="action__button actions__button_pos" to="/sklad/new/save">
                Сохранить
            </NavLink>
            <NavLink className="action__button actions__button_pos" to="/sklad/new/cancel">
                Отменить
            </NavLink>
        </div>
    );
}

export default Action_s;