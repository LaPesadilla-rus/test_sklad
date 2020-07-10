import React, {Component} from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';

import MovingRow from './movingRow';


export default class Moving extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            buttonStatus: 0,
        };
    }


    render() {
        return (    
                <div>   
                    <label>{this.props.txt}</label> 
                    <table className='zurnal_block_table'>
                        <thead>
                            <tr>
                                <th className='thead'>Дата перемещения</th>
                                <th className='thead'>Инвентарый номер</th>
                                <th className='thead'>Наименование</th>
                                <th className='thead'>Наименование по бух.уч.</th>
                                <th className='thead'>Пользователь</th>
                                <th className='thead'>Старый МОЛ</th>
                                <th className='thead'>Старый отдел</th>
                                <th className='thead'>Новый МОЛ</th>
                                <th className='thead'>Новый отдел</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map(row => <MovingRow key={this.nextUniqueId()} row={row}/>)}
                        </tbody>
                    </table>  
                </div>
        );
    }
}

