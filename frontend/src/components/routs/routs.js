import React, {Component} from 'react';
import './routs.css';
//import Header from '../body/header/header.js';
import Header from '../modules/header/headerContainer'
//import Actions from '../modules/actions_bar/actions';
import SkladMain from '../pages/sklad_main/sklad_main';
import SprForms from '../pages/spr/spr_forms.js';
import NewEquip from '../modules/spr/new_equip/new_equip';
import Relation from '../modules/spr/relation/relationContainer';
import OtdelMain from '../pages/otdel/OtdelMain';
import Zurnal from '../pages/zurnal/zurnal';
import Auth from '../pages/auth/authContainer';
import {Route, Redirect} from 'react-router-dom';
import Zauvki from '../../components/pages/zauavki/Zauavki'

//import { PrivateRoute } from '../pages/auth/PrivateRoute';

const ThemeContext = React.createContext('light');

export default class Routs extends Component {
    
   

    render(){
        //console.log(this.props)
        return (
            <div className="body body_pos">
                <ThemeContext.Provider value='test'>
                    <Header />
                    
                   {/*<Route path='/sklad' component={SkladMain}/>*/}
                    {<Route path='/sklad' render = { props => this.props.isAuthorize ? <SkladMain {...this.props} /> : <Redirect to='/auth'/>} />}

                    <Route path='/otdel' component={OtdelMain}/>

                    {<Route path='/zurnal' component={Zurnal}/>}

                    <Route path='/auth' component={Auth}/>

                    <Route path='/reports' component={Zauvki}/>


                    <Route path='/spr' component={SprForms}/>
                    <Route path='/newequip' component={NewEquip}/>
                    <Route path='/rel' component={Relation}/>
                </ThemeContext.Provider>
            </div>
    );
    }
    
}

//export default Routs;

/**
 * <Route path='/sklad' component={Actions}/>
                <Route path='/reports/all' component={Actions}/>
 */