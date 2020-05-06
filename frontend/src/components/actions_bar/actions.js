import React, {Component} from 'react';
import {NavLink, Route} from 'react-router-dom';
import './actions.css';
import Action_new from './action_new.js'
import Action_ed from './action_ed.js'
import Action_s from './action_s.js'

export default class Actions extends Component{
    render (){
        return (
            <div className="Actions">
                <Route path='/sklad/all' component={Action_new}/>
                <Route path='/sklad/edit/' component={Action_ed}/>
                <Route path='/sklad/new/' component={Action_s}/>
            </div>
        );
    }
}