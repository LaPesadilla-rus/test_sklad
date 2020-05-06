import React, {Component} from 'react';
import axios from 'axios';

export default class Users extends Component{
    constructor() {
        super();
        this.state = {
            users: "Not have any users"
        };
    }

    componentDidMount = () => {
        axios.get('./users').then(response=>{
            console.log(response);
            this.setState({
                users: response.data[0].u_login
            });
        });
    }

    render() {
        return (
            <div>
                <button>Get users</button>
                <h1> Number of users: {this.state.users} </h1>
            </div>
        );
    }
}