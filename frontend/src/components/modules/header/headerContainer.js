import React from 'react';
import {connect} from 'react-redux';

//import { setUserId, setAt, setRt, setAuthorize} from '../../../store/auth/action';
import Header from './header';

class HeaderContainer extends React.Component {
    render (){
        return(
            <Header userName={this.props.userName}
            />
        )
    }
}

const pushStateToProps = (state) => {
    return{
        userName: state.auth.userName,
    };
};

const pushDispatchToProps = {
};

export default connect(pushStateToProps, pushDispatchToProps)(HeaderContainer);