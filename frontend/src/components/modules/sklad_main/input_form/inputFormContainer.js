import React from 'react';
import {connect} from 'react-redux';

import { setUserId, setAt, setRt, setAuthorize, setUserName} from '../../../store/auth/action';
import InputForm from './input_form';

class InputFormContainer extends React.Component {
    render (){
        return(
            <InputForm user={this.props.user} at={this.props.at} rt={this.props.rt} isAuthorize={this.props.isAuthorize}
            setUserId={this.props.setUserId} setAt={this.props.setAt} setRt={this.props.setRt} setAuthorize={this.props.setAuthorize} 
            setUserName={this.props.setUserName}/>
        )
    }
}

const pushStateToProps = (state) => {
    return{
        user: state.auth.user,
        at: state.auth.at,
        rt: state.auth.rt,
        isAuthorize: state.auth.isAuthorize
    };
};

const pushDispatchToProps = {
    setUserId,
    setAt,
    setRt,
    setAuthorize,
    setUserName,
};

export default connect(pushStateToProps, pushDispatchToProps)(InputFormContainer);