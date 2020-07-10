import React from 'react';
import {connect} from 'react-redux';

import { setUserId, setAt, setRt, setAuthorize, setUserName, setUserRole} from '../../../store/auth/action';
import Auth from './auth';

class AuthContainer extends React.Component {
    render (){
        return(
            <Auth user={this.props.user} at={this.props.at} rt={this.props.rt} isAuthorize={this.props.isAuthorize} role={this.props.role}
            setUserId={this.props.setUserId} setAt={this.props.setAt} setRt={this.props.setRt} setAuthorize={this.props.setAuthorize} 
            setUserName={this.props.setUserName} setUserRole={this.props.setUserRole}/>
        )
    }
}

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
    setUserRole,
};

export default connect(pushStateToProps, pushDispatchToProps)(AuthContainer);