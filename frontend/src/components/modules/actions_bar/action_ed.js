import React from 'react';
import './actions.css';
import {NavLink} from 'react-router-dom';


function Action_ed () {
    return (
        <div className="Action_ed">
            <NavLink className="action__button actions__button_pos" to="/sklad/edit/save">
                Сохранить
            </NavLink>
            <NavLink className="action__button actions__button_pos" to="/sklad/edit/cancel">
                Отменить
            </NavLink>
            <NavLink className="action__button actions__button_pos" to="/sklad/edit/delete">
                Удалить
            </NavLink>
        </div>
    );
}

export default Action_ed;