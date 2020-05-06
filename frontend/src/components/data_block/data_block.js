import React, {Component} from 'react';
import './data_block.css';
import Data from './Data.js'
import Element from './Element/Element.js'
//import Users from './components/Users.js';
//import Users from '../Users.js'
import {Route} from 'react-router-dom';

function Data_Block () {
    return (
            <div className="DataBlock">
                <Route path='/sklad/all' component={Data}/>
                <Route path='/reports/all' component={Data}/>

                <Route path='/sklad/edit/' component={Element}/>
                <Route path='/sklad/new' component={Element}/>
            </div>
    );
}

export default Data_Block;





