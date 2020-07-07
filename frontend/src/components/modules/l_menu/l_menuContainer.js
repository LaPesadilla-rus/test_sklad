import React from 'react';
import {connect} from 'react-redux';

import { setUserId, setAt, setRt, setAuthorize} from '../../../store/auth/action';
import LMenu from './l_menu';

class LMenuContainer extends React.Component {
    render (){
        return(
            <LMenu user={this.props.user} at={this.props.at} rt={this.props.rt} isAuthorize={this.props.isAuthorize}
            setUserId={this.props.setUserId} setAt={this.props.setAt} setRt={this.props.setRt} setAuthorize={this.props.setAuthorize}/>
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
};

export default connect(pushStateToProps, pushDispatchToProps)(LMenuContainer);