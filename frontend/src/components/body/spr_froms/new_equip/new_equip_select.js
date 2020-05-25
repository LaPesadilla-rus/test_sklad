import React, {Component} from 'react';
import './new_equip.css';


export default class New_equip_select extends Component {
    constructor (props){
        super(props);
        this.state={
            isModalOpen: false,
        }
    }

    onChange = () =>{
        var data = {
            name: this.props.name,
            table: this.props.table,
        }
        this.props.ModalData(data);
        this.props.onModal();
    }

    render(){
        return(
            <div>
                <table>
                    <tbody><tr>
                        <td>{this.props.zagolovok}</td>
                        <td>
                        <select name='kategor' onChange={this.props.ChangeSelect} value={this.props.id_val}>
                            <option placeholder='----' value='-1'></option>
                            {this.props.data.map( id => <option key={id.id} value={id.id}>{id.name}</option>)}
                        </select>
                        </td>
                        <td><div onClick={this.onChange} value='0' className="data-table__body data-table__body_pos spr_block_text"><label>+</label></div></td>
                    </tr></tbody>
                </table>
            </div>
        )
    }
}