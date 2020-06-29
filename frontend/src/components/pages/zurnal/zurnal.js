import React, {Component} from 'react';
import './zurnal.css';
import axio from 'axios';
import UnicId from 'react-html-id';

import Postupl from './vkladki/postupl.js';


export default class Zurnal extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            buttonStatus: 0,
            data: [],
        };
    }

    changeButton = (val) => {
        this.setState({
            buttonStatus: val,
        })
    }

    postupl = () => {
        var data = {
            flDate1: '',
            flDate2: '',
            invNum: '',
            contNum: '',
        }
        axio.post('/zurnal/postupl', {data}).then(res=>{
            console.log(res.data)
            this.setState({
                data: res.data
            })
        });
        this.setState({buttonStatus: 0});
    }

    render() {
        return (
            <div className='zurnal_fon'>
                <button className='button' onClick={this.postupl}>Поступления</button>
                <button className='button' onClick={(e) => {this.setState({buttonStatus: 1})}}>Выписка</button>
                <button className='button' onClick={(e) => {this.setState({buttonStatus: 2})}}>Списано</button>

                <div className='zurnal_block'> 
                    <label>С </label>
                    <input type='date'></input>
                    <label>По</label>
                    <input type='date'></input>    
                    <label>Инвентарный номер:</label>
                    <input ></input>
                    <label>Номер договора:</label>
                    <input></input>
                    <button className='button button_green'>Применить</button>
                </div>

                <div className='zurnal_block'>    

                    {(this.state.buttonStatus === 0) ? <Postupl data={this.state.data} /> : null}

                </div> 
                {/*<div className='zurnal_block'>    
                    <table>
                        <thead>
                            <tr>
                                {this.state.data.param && this.state.data.param.map(row => <th className='thead'>{row}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                                {this.state.data.data && this.state.data.data.map(row => 
                                <tr>
                                    {row.map(line => 
                                        <td className='thead'>{line}</td>
                                    )}
                                    
                                </tr>
                            )}
                        </tbody>
                    </table>
                                    </div>*/}   
                 
            </div>
        );
    }
}

