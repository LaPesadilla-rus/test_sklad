import React from 'react';
import './routs.css';
//import Header from '../body/header/header.js';
import Header from '../modules/header/header.js'
import Actions from '../modules/actions_bar/actions';
import Sklad_main from '../pages/sklad_main/sklad_main';
import Spr_forms from '../pages/spr/spr_forms.js';
import New_equip from '../modules/spr/new_equip/new_equip';
import Relation from '../modules/spr/relation/relationContainer';
import {Route} from 'react-router-dom';

function Routs () {
    return (
            <div className="body body_pos">
                <Header />
                <Route path='/sklad' component={Actions}/>
                <Route path='/reports/all' component={Actions}/>
                <Route path='/sklad' component={Sklad_main}/>

                
                <Route path='/spr' component={Spr_forms}/>
                <Route path='/newequip' component={New_equip}/>
                <Route path='/rel' component={Relation}/>
            </div>
    );
}

export default Routs;