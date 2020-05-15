import React from 'react';
import './spr_forms.css';
import Spr_units from './spr_units/spr_units.js';
import {Route} from 'react-router-dom';

function Spr_forms () {
    return (
            <div className="spr_forms spr_forms_pos">
                <Spr_units />
            </div>
    );
}

export default Spr_forms;