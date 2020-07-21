import React, {Component} from 'react';
import './relationWatch.css';
import UnicId from 'react-html-id';
import axio from 'axios';

import Autocomplite from '../../../simple_comp/autocomplite/autocomplite';

export default class RelationWatch extends Component {
    constructor (props){
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            kat_data: [],
            data: [],
            equip_name: ''
        }
    }

    componentDidMount = async () =>{
        await axio.get('/spr/filter_data').then(res=>{
            this.setState({
                data: res.data,
            });
            console.log(res.data)
        });
    }

    onClose = () => {
        this.props.onClose();
    }

    setText = (val) => {
        this.setState({
            equip_name: val
        })
    }

    render(){
        return(
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">
                    <div className='relation_watch'>
                        <div className='watch_filter'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label>Категория</label>
                                        </td>
                                        <td>
                                        <select onChange={this.ChangeProvider} value={this.state.provider}>
                                            <option key={this.nextUniqueId()} value='-1'></option>
                                            {this.state.data.kat && this.state.data.kat.map( id => <option key={this.nextUniqueId()} value={id.kat_id}>{id.kat_name}</option>)}     
                                        </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <label>Тип</label>
                                        </td>
                                        <td>
                                            <select onChange={this.ChangeProvider} value={this.state.provider}>
                                                <option key={this.nextUniqueId()} value='-1'></option>
                                                {this.state.data.type && this.state.data.type.map( id => <option key={this.nextUniqueId()} value={id.te_id}>{id.te_name}</option>)}     
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <label>Марка</label>
                                        </td>
                                        <td>
                                            <select onChange={this.ChangeProvider} value={this.state.provider}>
                                                <option key={this.nextUniqueId()} value='-1'></option>
                                                {this.state.data.marka && this.state.data.marka.map( id => <option key={this.nextUniqueId()} value={id.ma_id}>{id.ma_name}</option>)}     
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                        <label>Модель</label>
                                        </td>
                                        <td>
                                            <Autocomplite modelText={this.state.equip_name} items_arr={this.state.data.equip_name} setText={this.setText}/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>
                        asdasdasd
                        <button className='button button_green'>Показать</button>
                        <button className='button button_red' onClick={this.onClose}>Закрыть</button>
                    </div>
                </div>
            </div>
        )
    }
}