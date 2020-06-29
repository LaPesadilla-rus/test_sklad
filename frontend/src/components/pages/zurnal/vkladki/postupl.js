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
                <div className='zurnal_block'>    
                    <table>
                        <thead>
                            <tr>
                                <th className='thead'>Дата</th>
                                <th className='thead'>Наименование</th>
                                <th className='thead'>Ед. изм.</th>
                                <th className='thead'>Кол-во</th>
                                <th className='thead'>Пользователь</th>
                                <th className='thead'>Номер договора</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.data.map(row => <PostuplRow row={row}/>)}
                        </tbody>
                    </table>
                </div>   
        );
    }
}

