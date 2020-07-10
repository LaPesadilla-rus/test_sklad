import React from 'react';
import './App.css';
import Menu from './components/modules/l_menu/l_menuContainer';
//import Body from './components/body/body.js';
import Routs from './components/routs/routs';
import AuthContainer from './components/pages/auth/authContainer'

import {BrowserRouter} from 'react-router-dom';

import { setUserId, setAt, setRt, setAuthorize, setUserName, setUserRole} from './store/auth/action';
import {connect} from 'react-redux';

class AppContainer extends React.Component {
    
    componentDidMount (){
        //console.log(localStorage.getItem('at'))
        if(localStorage.getItem('at')){
            this.props.setAuthorize(true);
            this.props.setAt(localStorage.getItem('At'));
            this.props.setRt(localStorage.getItem('Rt'));
            this.props.setUserName(localStorage.getItem('userName'))
            this.props.setUserRole(localStorage.getItem('role'))
        }
    }

    render(){
        return (
            <BrowserRouter>
              <div className="back">
                <div className="App">
                    {this.props.isAuthorize ?  <div className="App">
                        <Menu />
                        <Routs {...this.props}/>
                    </div> : <div className="App"><AuthContainer/></div>}
                  
                </div> 
              </div>
            </BrowserRouter>
          );
    }
  
}

//export default AppContainer;
const pushStateToProps = (state) => {
    return{
        user: state.auth.user,
        at: state.auth.at,
        rt: state.auth.rt,
        isAuthorize: state.auth.isAuthorize,
        role: state.auth.role
    };
};

const pushDispatchToProps = {
    setUserId,
    setAt,
    setRt,
    setAuthorize,
    setUserName,
    setUserRole
};

export default connect(pushStateToProps, pushDispatchToProps)(AppContainer);
