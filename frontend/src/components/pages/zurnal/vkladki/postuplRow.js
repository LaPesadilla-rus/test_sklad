import React, {Component} from 'react';
import '../zurnal.css';
//import axio from 'axios';
import UnicId from 'react-html-id';


export default class PostuplRow extends Component{
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
                        <tbody>
                            <tr>
        <td className='thead'>{this.props.row}</td>
                                <td className='thead'>Наименование</td>
                                <td className='thead'>Ед. изм.</td>
                                <td className='thead'>Кол-во</td>
                                <td className='thead'>Пользователь</td>
                                <td className='thead'>Номер договора</td>
                            </tr>
                        </tbody>
                    </table>
                </div>   
        );
    }
}

