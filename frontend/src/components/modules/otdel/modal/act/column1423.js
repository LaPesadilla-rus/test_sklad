import React, {Component} from 'react';
import './act.css';

export default class Column extends Component{
    constructor(){
        super();
        this.state = {
            amount: 1
        }
    }

    componentDidMount = () => {
        /*console.log(this.props)
        this.props.changeAmount(1, this.props.indx);*/
    }

    onChange = (e) => {
        let val = parseInt(e.target.value);
        if (val <= this.props.data.bl_amount && val >= 1){
            this.setState({
                amount: e.target.value
            });
            this.props.changeAmount(val, this.props.indx);
        }
       
    }

    render() {
        return (
            <React.Fragment>
                <tr>
                    <td>{this.props.indx + 1}</td>
                    <td>{this.props.data.equip_text}</td>
                    <td>{this.props.data.bl_inv_num}</td>
                    <td>{this.props.data.un_name}</td>
                    <td>{this.props.data.bl_amount}</td>
                    <td><input type='number' onChange={this.onChange} value={this.state.amount}></input></td>
                </tr>
            </React.Fragment>
        );
    }
}