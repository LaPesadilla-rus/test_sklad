import React, {Component} from 'react';
import './data_table.css';
import {NavLink} from 'react-router-dom';
import axio from 'axios';

const BlockItem = (props) => {
    let path = './edit/' + props.id;
    return <div><NavLink className="data-table__body data-table__body_pos"  to={path} ><tr>
            <td className='data-table__cell data-table__cell_pos cell_1'>{props.kat}</td> 
            <td className='data-table__cell data-table__cell_pos cell_2'>{props.kod}</td> 
            <td className='data-table__cell data-table__cell_pos cell_3'>{props.name}</td>
            <td className='data-table__cell data-table__cell_pos cell_4'>{props.units}</td>
            <td className='data-table__cell data-table__cell_pos cell_5'>{props.kol}</td>
            <td className='data-table__cell data-table__cell_pos cell_6'>{props.prim}</td>
        </tr></NavLink></div>
}

export default class Data extends Component{
    constructor() {
        super();
        this.state = {
            equips: [],
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const a = event.target.parentElement.attributes[1].value;
        //console.log(event.target.parentElement.attributes[1].value);
        this.props.history.push('/sklad/edit/' + a);

        const data = {
            id: a
        }

        axio.post('/sklad/edit', {data}).then(res => {
            console.log(res.data);
            if (res.data === 'POST COMPLITE') {
                //alert('Сохранение успешно');
            }else{
                alert('Данные не удалось сохранить');
            }
        });
    }

    componentDidMount = () => {
        axio.get('./all').then(res=>{
            console.log(res.data);
            this.setState({
                equips: res.data
            });
        });
    }
    //{this.state.equips.map( e_id => <NavLink className="Block" to='./edit/block/'>{e_id}</NavLink>)}
            

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <table className="data-table data-table_pos">
                    <thead>
                        <tr className="data-table__head data-table__body_pos" onClick={this.handleSubmit} id='123'>
                            <th className='data-table__cell data-table__cell_pos cell_1'>Категория</th> 
                            <th className='data-table__cell data-table__cell_pos cell_2'>Инв номер</th> 
                            <th className='data-table__cell data-table__cell_pos cell_3'>Наименование</th>
                            <th className='data-table__cell data-table__cell_pos cell_4'>Ед.изм</th>
                            <th className='data-table__cell data-table__cell_pos cell_5'>Остаток</th>
                            <th className='data-table__cell data-table__cell_pos cell_6'>Примечание</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="data-table__body data-table__body_pos">
                            <td className='data-table__cell data-table__cell_pos  cell_1'>Основные средства</td> 
                            <td className='data-table__cell data-table__cell_pos  cell_2'>ПД00000033642</td> 
                            <td className='data-table__cell data-table__cell_pos  cell_3'>Моторизированный кронштейн Brateck PLB M0544</td>
                            <td className='data-table__cell data-table__cell_pos  cell_4'>шт</td>
                            <td className='data-table__cell data-table__cell_pos  cell_5'>15</td>
                            <td className='data-table__cell data-table__cell_pos  cell_6'>ВКС (конф-зал)</td>
                        </tr>
                        {this.state.equips.map( id => <BlockItem key={id.st_id} kol={id.st_amount} date={id.to_char} 
                            kod={id.st_inv_num} kat={id.kat_name} id={id.st_id} units={id.un_name} 
                            name={id.te_name + ' ' + id.eq_name} prim={id.st_prim} />)}
                    </tbody>
                </table>
            </form>
        );
    }
}
