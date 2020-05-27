import React from 'react';
import './body.css';
import Header from './header/header.js';
import Actions from './actions_bar/actions.js';
import Data_Block from './data_block/data_block.js';
import Spr_forms from './spr_froms/spr_forms.js';
import New_equip from './spr_froms/new_equip/new_equip';
import Relation from './spr_froms/relation/relationContainer.js';
import {Route} from 'react-router-dom';

function Body () {
    return (
            <div className="body body_pos">
                <Header />
                <Route path='/sklad' component={Actions}/>
                <Route path='/reports/all' component={Actions}/>
                <Route path='/sklad' component={Data_Block}/>

                
                <Route path='/spr' component={Spr_forms}/>
                <Route path='/newequip' component={New_equip}/>
                <Route path='/rel' component={Relation}/>
            </div>
    );
}

export default Body;