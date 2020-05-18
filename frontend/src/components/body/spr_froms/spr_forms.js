import React, {Component} from 'react';
import './spr_forms.css';
import Spr_units from './spr_units/spr_units.js';
import Spr_block from './spr_block.js';
import {Route} from 'react-router-dom';

export default class Spr_forms extends Component {
//function Spr_forms () {
    render(){
        return (
                <div className="spr_forms spr_forms_pos">
                    <Route path='/spr/units' component={Spr_units}/>
                    <Route path='/spr' component={Spr_block}/>
                </div>
        );
    }
}

//export default Spr_forms;