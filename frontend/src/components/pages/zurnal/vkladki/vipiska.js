import React, {Component} from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';

import VipiskaRow from './vipiskaRow';


export default class Vipiska extends Component{
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
                                <th className='thead'>Дата выписки</th>
                                <th className='thead'>Наименование</th>
                                <th className='thead'>Инвентарый номер</th>
                                <th className='thead'>Ед. изм.</th>
                                <th className='thead'>Кол-во</th>
                                <th className='thead'>Пользователь</th>
                                <th className='thead'>МОЛ</th>
                                <th className='thead'>Отдел</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map(row => <VipiskaRow key={this.nextUniqueId()} row={row}/>)}
                        </tbody>
                    </table>  
                </div>
        );
    }
}

