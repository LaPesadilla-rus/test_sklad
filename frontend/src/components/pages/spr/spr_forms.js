import React, {Component} from 'react';
import './spr_forms.css';
import Spr_units from '../../modules/spr/spr_units/spr_units';
import Spr_block from '../../modules/spr/spr_block';
import {Route} from 'react-router-dom';

export default class Spr_forms extends Component {
//function Spr_forms () {
    render(){
        return (
                <div className="spr_forms spr_forms_pos">
                    <Route path='/spr/all/redact' component={Spr_units}/>
                    <Route path='/spr' component={Spr_block}/>
                </div>
        );
    }
}

//export default Spr_forms;