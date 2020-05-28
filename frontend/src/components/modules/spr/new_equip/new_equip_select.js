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
            <div className='new_eq_sel'>
                <div className='new_eq_sel_col1'>{this.props.zagolovok}</div>
                <div className='new_eq_sel_col2'>
                    <select name='kategor' onChange={this.props.ChangeSelect} value={this.props.id_val}>
                        <option placeholder='----' value='-1'></option>
                        {this.props.data.map( id => <option key={id.id} value={id.id}>{id.name}</option>)}
                    </select>
                </div>
                <div className='new_eq_sel_col3'>
                    <div onClick={this.onChange} value='0' className="data-table__body data-table__body_pos new_eq_plus"><label>+</label></div>
                </div>
            </div>
        )
    }
}