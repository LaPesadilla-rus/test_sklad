import React, { Component } from 'react';

const { Provider, Consumer: AuthConsumer} = React.createContext({
    isAuthorized: false
});

class AuthProvider extends Component {
    state = { isAutorized: false }

    authorize = () => {
        this.setState({ isAuthorized:true});
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
                        <WrappedCmponent  {...this.props}/>
                    )}
                </AuthConsumer>
            )
        }
    }
};

export { AuthProvider };

/**
 * не забыть {...contextProps}
 */