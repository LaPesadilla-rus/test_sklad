import React, {Component} from 'react';
import './data_table.css';
import axio from 'axios';

import Actions from '../../actions_bar/action_new';
import DataRow from './data_row';
import InputForm from '../input_form/input_form';
import OutForm from '../out_form/out_form';

export default class Data extends Component{
    constructor() {
        super();
        this.table = {
            row: [],
        }
        this.state = {
            equips: [],
            isEditOpen: false,
            isNewOpen: false,
            isOutOpen: false,
            id_item: '',
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
            //console.log(res.data);
            if (res.data === 'POST COMPLITE') {
                //alert('Сохранение успешно');
            }else{
                alert('Данные не удалось сохранить');
            }
        });
    }

    componentDidMount = () => {
        axio.get('./all').then(res=>{
            //console.log(res.data);
            this.setState({
                equips: res.data
            });
        });
    }

    onReboot = () => {
        axio.get('./all').then(res=>{
            //console.log(res.data);
            this.setState({
                equips: res.data
            });
        });
    }

    changeEdit = (row) => {
        //this.setState({ id_item: val })
        this.table.data = row;
        this.setState(state => ({ isEditOpen: !state.isEditOpen}));
    }

    changeNew = (val) => {
        this.setState(state => ({ isNewOpen: !state.isNewOpen}));
    }

    changeOutForm = () => {
        this.setState(state => ({ isOutOpen: !state.isOutOpen}));
    }
    //{this.state.equips.map( e_id => <NavLink className="Block" to='./edit/block/'>{e_id}</NavLink>)}
            

    render() {
        return (
            <div>
                {<Actions changeNew={this.changeNew} changeOut={this.changeOutForm} />}
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
                        {this.state.equips.map( id => <DataRow key={id.st_id} 
                                                                changeEdit={this.changeEdit}
                                                                row={id} />)}
                    </tbody>
                </table>
            </form>
            {this.state.isEditOpen &&
                    <InputForm row={this.table.data} equips_arr={this.state.equips}  onClose={this.changeEdit} onReboot={this.onReboot}/>
                }
            {this.state.isNewOpen &&
                    <InputForm id_item=''  onClose={this.changeNew} onReboot={this.onReboot}/>
                }
            {this.state.isOutOpen &&
                    <OutForm onClose={this.changeOutForm} onReboot={this.onReboot}/>
                }
            </div>
        );
    }
}

/**
 * <tr className="data-table__body data-table__body_pos">
                            <td className='data-table__cell data-table__cell_pos  cell_1'>Основные средства</td> 
                            <td className='data-table__cell data-table__cell_pos  cell_2'>ПД00000033642</td> 
                            <td className='data-table__cell data-table__cell_pos  cell_3'>Моторизированный кронштейн Brateck PLB M0544</td>
                            <td className='data-table__cell data-table__cell_pos  cell_4'>шт</td>
                            <td className='data-table__cell data-table__cell_pos  cell_5'>15</td>
                            <td className='data-table__cell data-table__cell_pos  cell_6'>ВКС (конф-зал)</td>
                        </tr>
 */
