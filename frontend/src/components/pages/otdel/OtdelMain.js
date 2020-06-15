import React, {Component} from 'react';
import './OtdelMain.css';
import axio from 'axios';
import UnicId from 'react-html-id';

import OtdBlock from '../../modules/otdel/otdBlock.js';
//import { otd_data } from '../../../../../backend/controllers/otdel';

export default class OtdelMain extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            data: [],
        };
    }

    componentDidMount = () => {
        axio.get('/otdel/all2').then(res=>{
            this.setState({
                data: res.data
            });
        });
    }

    onReboot = () => {
        axio.get('/otdel/all2').then(res=>{
            this.setState({
                data: res.data
            });
        });
    }


            
    Click = () => {
        //console.log(this.state.data.otd_data.length)
        this.state.data.otd_data.map(row => {console.log(row); return 0;})
        this.onReboot();
    }
    render() {
        return (
            <div className='otdel_base'>   
            <div className='otdel_main'>
                <select>otd</select>
                <select>mol</select>
                <input></input>
                <button className='button'>Применить фильтр</button>
                <button className='button'>Сбросить фильтр</button>
            </div>
                {(this.state.data.otd_data) ? this.state.data.otd_data.map(row => <OtdBlock key={this.nextUniqueId()} 
                                                                                                data={this.state.data}
                                                                                                row={row}
                                                                                                onReboot={this.onReboot}/>) : ''}  
            </div>
        );
    }
}
/**
 * <button onClick={this.Click}>asdsad</button>
 */

