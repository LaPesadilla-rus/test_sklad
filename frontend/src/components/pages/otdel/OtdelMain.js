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
        this._isMounted = false;
        this.arr = {
            otdel_data: [],
        };
        this.state = {
            otdel_data: [],
            mol_data: [],
            data: [],
            separ_data: [],
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        axio.get('/otdel/all').then(res=>{
            if (this._isMounted){
                this.setState({
                    otdel_data: res.data.otd,
                    mol_data: res.data.mol,
                    data: res.data.data,
                });
            }
            
        });
        axio.get('/otdel/data').then(res=>{
            if (this._isMounted){
                this.setState({
                    separ_data: res.data,
                });
            }
            
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onReboot = () => {
        this.setState({
            otdel_data: [],
            mol_data: [],
            data: [],
            separ_data: [],
        })
        axio.get('/otdel/all').then(res=>{
            if (this._isMounted){
                this.setState({
                    otdel_data: res.data.otd,
                    mol_data: res.data.mol,
                    data: res.data.data,
                });
            }
            
        });
        axio.get('/otdel/data').then(res=>{
            if (this._isMounted){
                this.setState({
                    separ_data: res.data,
                });
            }
            
        });
    }


            
    Click = () => {
        //console.log(this.state)
        this.onReboot();
    }
    render() {
        return (
            <div className='otdel_base'>
                <button onClick={this.Click}>asdsad</button>
                {this.state.otdel_data.map(row => <OtdBlock key={this.nextUniqueId()} 
                                                            otdel_data={this.state.otdel_data}
                                                            mol_data={this.state.mol_data}
                                                            data={this.state.data}
                                                            row={row}
                                                            separ_data={this.state.separ_data}
                                                            onReboot={this.onReboot} />)}
                
            </div>
        );
    }
}

