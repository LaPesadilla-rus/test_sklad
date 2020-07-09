import React, {Component} from 'react';
import './zurnal.css';
import axio from 'axios';
import UnicId from 'react-html-id';

import Postupl from './vkladki/postupl.js';
import Vipiska from './vkladki/vipiska';
import Spisano from './vkladki/spisano';
import Moving from './vkladki/moving';


export default class Zurnal extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            buttonStatus: 0,
            data: [],
            flDate1: '',
            flDate2: '',
            flDate3: '',
            flDate4: '',
            invNum: '',
            contrNum: '',
            txt: ''
        };
    }

    changeButton = (val) => {
        this.setState({
            buttonStatus: val,
        })
    }

    postupl = () => {
        var data = {
            flDate1: this.state.flDate1,
            flDate2: this.state.flDate2,
            flDate3: this.state.flDate3,
            flDate4: this.state.flDate4,
            invNum: this.state.invNum,
            contrNum: this.state.contrNum,
        }
        axio.post('/zurnal/postupl', {data}).then(res=>{
            console.log(res.data)
            this.setState({
                data: res.data
            })
        });
        this.setState({
            buttonStatus: 0,
            txt: 'Поступления'
        });
    }
    vipiska = () => {
        var data = {
            flDate1: this.state.flDate1,
            flDate2: this.state.flDate2,
            invNum: this.state.invNum,
            contrNum: this.state.contrNum,
        }
        axio.post('/zurnal/vipiska', {data}).then(res=>{
            console.log(res.data)
            this.setState({
                data: res.data
            })
        });
        this.setState({
            buttonStatus: 1,
            txt: "Выписка"
        });
    }

    spisano = () => {
        var data = {
            flDate1: this.state.flDate1,
            flDate2: this.state.flDate2,
            invNum: this.state.invNum,
            contrNum: this.state.contrNum,
        }
        axio.post('/zurnal/spisano', {data}).then(res=>{
            //console.log(res.data)
            this.setState({
                data: res.data
            })
        });
        this.setState({
            buttonStatus: 2,
            txt: "Списано"
        });
    }

    moving = () => {
        var data = {
            flDate1: this.state.flDate1,
            flDate2: this.state.flDate2,
            invNum: this.state.invNum,
            contrNum: this.state.contrNum,
        }
        axio.post('/zurnal/moving', {data}).then(res=>{
            //console.log(res.data)
            this.setState({
                data: res.data
            })
        });
        this.setState({
            buttonStatus: 3,
            txt: "Перемещения"
        });
    }

    sbrosFiltr = () => {
        this.setState({
            flDate1: '',
            flDate2: '',
            invNum: '',
            contrNum: ''
        })
    }

    primFiltr = () => {
        var data = {
            flDate1: this.state.flDate1,
            flDate2: this.state.flDate2,
            invNum: this.state.invNum,
            contrNum: this.state.contrNum,
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
                <button className='button' onClick={this.vipiska}>Выписка</button>
                <button className='button' onClick={this.spisano}>Списано</button>
                <button className='button' onClick={this.moving}>Перемещения</button>
                <div className='zurnal_block'>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>Дата поступления</label>
                                </td>
                                <td>
                                    <label>С </label>
                                    <input type='date' onChange={(e) => {this.setState({flDate1: e.target.value})}} value={this.state.flDate1}></input>
                                    <label>По</label>
                                    <input type='date' onChange={(e) => {this.setState({flDate2: e.target.value})}} value={this.state.flDate2}></input>
                                </td>
                                <td>
                                    <label>Инвентарный номер:</label>
                                    <input onChange={(e) => {this.setState({invNum: e.target.value})}} value={this.state.invNum}></input>
                                </td>
                            </tr>
                            {(this.state.buttonStatus === 0) ? <tr>
                                                                    <td>
                                                                        <label>Дата контракта</label>
                                                                    </td>
                                                                    <td>
                                                                        <label>С </label>
                                                                        <input type='date' onChange={(e) => {this.setState({flDate3: e.target.value})}} value={this.state.flDate3}></input>
                                                                        <label>По</label>
                                                                        <input type='date' onChange={(e) => {this.setState({flDate4: e.target.value})}} value={this.state.flDate4}></input>
                                                                    </td>
                                                                    <td>
                                                                        <label>Номер договора:</label>
                                                                        <input onChange={(e) => {this.setState({contrNum: e.target.value})}} value={this.state.contrNum}></input>
                                                                    </td>
                                                                </tr>
                                                                : null}
                            
                        </tbody>
                    </table>
                    <button className='button button_red' onClick={this.sbrosFiltr}>Сбросить</button>
                </div>

                <div className='zurnal_block'>    

                    {(this.state.buttonStatus === 0) ? <Postupl data={this.state.data} txt={this.state.txt} /> : null}
                    {(this.state.buttonStatus === 1) ? <Vipiska data={this.state.data} txt={this.state.txt} /> : null}
                    {(this.state.buttonStatus === 2) ? <Spisano data={this.state.data} txt={this.state.txt} /> : null}
                    {(this.state.buttonStatus === 3) ? <Moving  data={this.state.data} txt={this.state.txt} /> : null}

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

