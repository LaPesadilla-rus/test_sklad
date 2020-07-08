import React, {Component} from 'react';
import './sklad_main.css';
import Data_table from '../../modules/sklad_main/data_table/data_table'
import Input_form from '../../modules/sklad_main/input_form/input_form.js'
//import Users from './components/Users.js';
//import Users from '../Users.js'
import {Route} from 'react-router-dom';

export default class Data_Block extends Component {
    render(){
        return (
            <div className="datablock datablock_pos">
                {<Route path='/sklad/all' component={Data_table}/>}
                <Route path='/reports/all' component={Data_table}/>

                {/*<Route path='/sklad/all' render = { props => this.props.isAuthorize ? <Data_table {...this.props} /> : <Redirect to='/auth'/>} />*/}

                <Route path='/sklad/edit' component={Input_form}/>
                <Route path='/sklad/new' component={Input_form}/>
            </div>
    );
    }
    
}

//export default Data_Block;





