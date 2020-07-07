import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

const { Provider, Consumer: AuthConsumer} = React.createContext({
    isAuthorized: false
});

class AuthProvider extends Component {
    state = { isAutorized: false }

    authorize = () => {
        this.setState({ isAuthorized:true}, () => {
            this.props.history.push('/private');
        });
    }

    render(){
        const {isAuthorized} = this.state;

        return(
            <Provider value={{isAuthorized, authorize: this.authorize}}>
                {this.props.children}
            </Provider>
        );
    }
}


export function withAuth(WrappedCmponent){
    return class AuthHOC extends Component {
        render (){
            return (
                <AuthConsumer>
                    {contexProps => (
                        <WrappedCmponent {...contexProps} {...this.props}/>
                    )}
                </AuthConsumer>
            )
        }
    }
};

const AuthProviderWithRouter = withRouter(AuthProvider)

export { AuthProviderWithRouter as AuthProvider };

/**
 * не забыть {...contextProps}
 */