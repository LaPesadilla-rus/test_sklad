import React from 'react';
import './App.css';
import Menu from './components/modules/l_menu/l_menuContainer';
import Loader from './components/simple_comp/loader/loader';
import ModalInfo from './components/simple_comp/modal_info/modalInfo';
//import Body from './components/body/body.js';
import Routs from './components/routs/routs';
import AuthContainer from './components/pages/auth/authContainer'

import {BrowserRouter} from 'react-router-dom';

import { setUserId, setAt, setRt, setAuthorize, setUserName, setUserRole} from './store/auth/action';
import {connect} from 'react-redux';
import axio from 'axios';
//const axiosApiInstance = axio.create();

class AppContainer extends React.Component {
    
    componentDidMount = async() => {
        //console.log(localStorage.getItem('at'))
        if(localStorage.getItem('at')){
            this.props.setAuthorize(true);
            let data = {
                us_id: localStorage.getItem('user'),
                at: localStorage.getItem('at'),
                rt: localStorage.getItem('rt'),
            }
            await axio.post('/auth/logCheck', {data}).then(res=>{
                if(res.status === 200){
                    this.props.setAuthorize(true);
                    this.props.setAt(localStorage.getItem('at'));
                    this.props.setRt(localStorage.getItem('rt'));
                    this.props.setUserName(localStorage.getItem('userName'))
                    this.props.setUserRole(localStorage.getItem('role'))
                }else{
                    this.props.setAuthorize(false);
                    //window.location.href = 'http://localhost:3000/auth'
                }
            });
            
        }
    }
    componentDidUpdate = () => {
        //модификация заголовков
        /*axio.interceptors.request.use(
            config => {
                const token = localStorage.getItem('rt');
                //console.log(token)
                if (token) {
                    config.headers['Authorization'] = token;
                }
                // config.headers['Content-Type'] = 'application/json';
                return config;
            },
            error => {
                Promise.reject(error)
            });*/
        axio.interceptors.response.use( (res) => {
            return res
        }, function (err) {
            if (err.response){
                if (err.response.status === 403){
                    window.location.href = '/auth'
                }
            }
           
            return Promise.reject(err)
        })
    }

    render(){
        return (
            <BrowserRouter>
              <div className="back">
              {this.props.loader_status && <Loader/>}
              {this.props.message_state && <ModalInfo/>}
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
        role: state.auth.role,
        loader_status: state.loader.loader_state,
        message_state: state.message.message_state,
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
