import React from 'react';
import './routs.css';
//import Header from '../body/header/header.js';
import Header from '../modules/header/header.js'
//import Actions from '../modules/actions_bar/actions';
import SkladMain from '../pages/sklad_main/sklad_main';
import SprForms from '../pages/spr/spr_forms.js';
import NewEquip from '../modules/spr/new_equip/new_equip';
import Relation from '../modules/spr/relation/relationContainer';
import OtdelMain from '../pages/otdel/OtdelMain';
import Zurnal from '../pages/zurnal/zurnal';
import Auth from '../pages/auth/auth';
import {Route} from 'react-router-dom';

function Routs () {
    return (
            <div className="body body_pos">
                <Header />
                
                <Route path='/sklad' component={SkladMain}/>

                <Route path='/otdel' component={OtdelMain}/>

                <Route path='/zurnal' component={Zurnal}/>

                <Route path='/auth' component={Auth}/>


                <Route path='/spr' component={SprForms}/>
                <Route path='/newequip' component={NewEquip}/>
                <Route path='/rel' component={Relation}/>
            </div>
    );
}

export default Routs;

/**
 * <Route path='/sklad' component={Actions}/>
                <Route path='/reports/all' component={Actions}/>
 */