import React, {Component} from 'react';
import './new_equip.css';


export default class New_equip_select extends Component {
    constructor (props){
        super(props);
        this.state={
            isModalOpen: false,
        }
    }

    onChange = (e) =>{
        /*var data = {
            name: this.props.name,
            table: this.props.table,
        }*/
        //this.props.ModalData(data);
        //this.props.onModal();
    }

    selectChange = (e) => {
        this.props.setText(this.props.id_button,e.target.value);
        this.props.ChangeSelect(e.target.value);
    }

    render(){
        return(
            <div className='new_eq_sel'>
                <div className='new_eq_sel_col1'>{this.props.zagolovok}</div>
                <div className='new_eq_sel_col2'>
                    <select name='kategor' onChange={this.selectChange} value={this.props.Text}>
                        <option placeholder='----' value='-1'></option>
                        {this.props.data.map( id => <option key={id.id} value={id.id}>{id.name}</option>)}
                    </select>
                </div>
                <div className='new_eq_sel_col3'>
                   
                </div>
            </div>
        )
    }
}