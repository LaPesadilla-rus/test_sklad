import React, {Component} from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';

import SpisanoRow from './spisanoRow';


export default class Spisano extends Component{
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
                                <th className='thead'>Дата списания</th>
                                <th className='thead'>Акт</th>
                                <th className='thead'>Номер акта</th>
                                <th className='thead'>Инвентарый номер</th>
                                <th className='thead'>Наименование</th>
                                <th className='thead'>Наименование по бух.уч.</th>
                                <th className='thead'>Кол-во</th>
                                {/*<th className='thead'>Ед. изм.</th>
                                <th className='thead'>Кол-во</th>*/}
                                <th className='thead'>Пользователь</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map(row => <SpisanoRow key={this.nextUniqueId()} row={row}/>)}
                        </tbody>
                    </table>  
                </div>
        );
    }
}

