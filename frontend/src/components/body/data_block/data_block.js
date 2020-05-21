import React from 'react';
import './data_block.css';
import Data_table from './data_table/data_table.js'
import Input_form from './input_form/input_form.js'
//import Users from './components/Users.js';
//import Users from '../Users.js'
import {Route} from 'react-router-dom';

function Data_Block () {
    return (
            <div className="datablock datablock_pos">
                <Route path='/sklad/all' component={Data_table}/>
                <Route path='/reports/all' component={Data_table}/>

                <Route path='/sklad/edit' component={Input_form}/>
                <Route path='/sklad/new' component={Input_form}/>
            </div>
    );
}

export default Data_Block;





