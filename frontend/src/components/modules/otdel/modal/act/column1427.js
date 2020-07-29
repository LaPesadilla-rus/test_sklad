import React, {Component} from 'react';
import './act.css';

export default class Column1427 extends Component{

    
    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.indx + 1}</td>
                    <td>{this.props.data.te_name}</td>
                    <td>{this.props.data.un_name}</td>
                    <td>{this.props.data.sp_amount}</td>
                </tr>
            </React.Fragment>
        );
    }
}