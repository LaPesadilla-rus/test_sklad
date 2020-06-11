import React, {Component} from 'react';
import './act.css';

export default class Column1427 extends Component{

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.indx}</td>
                    <td>{this.props.data.te_name}</td>
                    <td>{this.props.data.un_name}</td>
                    <td>1</td>
                </tr>
            </React.Fragment>
        );
    }
}