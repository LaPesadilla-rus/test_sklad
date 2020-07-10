import React, {Component} from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';

import PostuplRow from './postuplRow';


export default class Postupl extends Component{
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
                                <th className='thead'>Дата поступления</th>
                                <th className='thead'>Инвентарый номер</th>
                                <th className='thead'>Наименование</th>
                                <th className='thead'>Наименование по бух.уч.</th>
                                <th className='thead'>Ед. изм.</th>
                                <th className='thead'>Кол-во</th>
                                <th className='thead'>Пользователь</th>
                                <th className='thead'>Номер договора</th>
                                <th className='thead'>Дата договора</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map(row => <PostuplRow key={this.nextUniqueId()} row={row}/>)}
                        </tbody>
                    </table>  
                </div>
        );
    }
}

