import React, {Component} from 'react';
import './data_table.css';
import axio from 'axios';
import { connect } from 'react-redux'; //------

import Actions from '../../actions_bar/action_new';
import DataRow from './data_row';
import InputForm from '../input_form/input_form';
import OutForm from '../out_form/out_form';
import DataFilter from './data_filter';




class Data extends Component{ //убрать экспорт
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
        //console.log(this.table.data)
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
        
        /*let data = this.props.authStore;
        console.log(data)*/
        axio.get('/sklad/all').then(res=>{
            //console.log(res.data);
            this.setState({
                equips: res.data
            });
        });
        //console.log(this.props)
    }

    onReboot = () => {
        axio.get('/sklad/all').then(res=>{
            this.setState({
                equips: res.data
            });
        });
    }

    filterDownload = (data) => {
        axio.post('/sklad/all', {data}).then(res=>{
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
        //console.log(this.props.authStore.auth)
        return (
            <div className='sklad_main_div'>
                
                <div className='sklad_main_group'>
                    <Actions changeNew={this.changeNew} changeOut={this.changeOutForm} />
                </div>
                <div className='sklad_main_group'>
                    <DataFilter filterDownload={this.filterDownload}/>
                </div>
                <div className='scroll'>
                    <form onSubmit={this.handleSubmit}>
                        <table className="sklad_table_body">
                            <thead className="sklad_table_head">
                                <tr className="">
                                    <th className='sklad_table_cell_head'></th>
                                    <th className='sklad_table_cell_head'>Категория</th> 
                                    <th className='sklad_table_cell_head'>Инв номер</th> 
                                    <th className='sklad_table_cell_head'>Наименование</th>
                                    <th className='sklad_table_cell_head'>Наименование по бух уч.</th>
                                    <th className='sklad_table_cell_head'>Ед.изм</th>
                                    <th className='sklad_table_cell_head'>Остаток</th>
                                    <th className='sklad_table_cell_head'>Примечание</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.equips.map( id => <DataRow key={id.st_id} 
                                                                        changeEdit={this.changeEdit}
                                                                        row={id} />)}
                            </tbody>
                        </table>
                    </form>
                </div>
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

export default connect(
    state => ({
        authStore: state.auth
    }),
    dispatch => ({
        testDispatch: dispatch
    }),

)(Data) // название класса

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

 /**
  * <th className='data-table__cell data-table__cell_pos cell_1'>Категория</th> 
                            <th className='data-table__cell data-table__cell_pos cell_2'>Инв номер</th> 
                            <th className='data-table__cell data-table__cell_pos cell_3'>Наименование</th>
                            <th className='data-table__cell data-table__cell_pos cell_3'>Наименование по бух уч.</th>
                            <th className='data-table__cell data-table__cell_pos cell_4'>Ед.изм</th>
                            <th className='data-table__cell data-table__cell_pos cell_5'>Остаток</th>
                            <th className='data-table__cell data-table__cell_pos cell_6'>Примечание</th>
  * 
  * 
  */
