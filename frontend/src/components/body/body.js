import React from 'react';
import './body.css';
import Header from './header/header.js';
import Actions from './actions_bar/actions.js';
import Data_Block from './data_block/data_block.js';
import {Route} from 'react-router-dom';

function Body () {
    return (
            <div className="body body_pos">
                <Header />
                <Route path='/sklad/all' component={Actions}/>
                <Route path='/reports/all' component={Actions}/>
                <Data_Block />
            </div>
    );
}

export default Body;