import React, {Component} from 'react';
import './zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';


export default class Zurnal extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            buttonStatus: 0,
        };
    }

    changeButton = (val) => {
        this.setState({
            buttonStatus: val,
        })
    }

    render() {
        /*let akt = <th>Акт</th>
                  <th>Номер акта</th>;*/


        return (
            <div className='zurnal_fon'>
                <button className='button' onClick={(e) => {this.setState({buttonStatus: 0})}}>Поступления</button>
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
                    <table>
                        <thead>
                            <tr>
                                <th className='thead'>Дата</th>
                                <th className='thead'>Наименование</th>
                                <th className='thead'>Ед. изм.</th>
                                <th className='thead'>Кол-во</th>
                                <th className='thead'>Пользователь</th>
                                {(this.state.buttonStatus === 0) ? <th className='thead'>Номер договора</th> : null}
                                {(this.state.buttonStatus === 1) ? <th className='thead'>МОЛ</th> : null}
                                {(this.state.buttonStatus === 1) ? <th className='thead'>Отдел</th> : null}
                                {(this.state.buttonStatus === 2) ? <th className='thead'>Акт</th> : null}
                                {(this.state.buttonStatus === 2) ? <th className='thead'>Номер акта</th> : null}
                                
                            </tr>
                        </thead>
                    </table>
                </div>   
                 
            </div>
        );
    }
}

