import React, {Component} from 'react';
import './input_form.css';
import axio from 'axios';
import UnicId from 'react-html-id';


const BlockItem = (props) => {
    return  <tr className="data-table__body data-table__body_pos">
                <td className='data-table__cell data-table__cell_pos cell_1'>{props.kat}</td> 
                <td className='data-table__cell data-table__cell_pos cell_2'>{props.name}</td> 
                <td className='data-table__cell data-table__cell_pos cell_3'></td>
                <td className='data-table__cell data-table__cell_pos cell_4'>{props.units}</td>
                <td className='data-table__cell data-table__cell_pos cell_5'>{props.kol}</td>
                <td className='data-table__cell data-table__cell_pos cell_6'>{props.prim}</td>
            </tr>        
}

/*
 /*<NavLink className="data-table__body data-table__body_pos"  to={path} ><tr>
            <td className='data-table__cell data-table__cell_pos cell_1'>{props.kat}</td> 
            <td className='data-table__cell data-table__cell_pos cell_2'>{props.kod}</td> 
            <td className='data-table__cell data-table__cell_pos cell_3'></td>
            <td className='data-table__cell data-table__cell_pos cell_4'>{props.units}</td>
            <td className='data-table__cell data-table__cell_pos cell_5'>{props.kol}</td>
            <td className='data-table__cell data-table__cell_pos cell_6'></td>
        </tr></NavLink>*/

export default class Input_form extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            name: '',
            e_type: '1',
            f_name: '1',
            kol: '',
            date: '',
            prim: '',
            type_data: [],
            kat_data: [],
            man_data: [],
            units_data: [],
            hyst_data: [],
        };

    }

    handleSaveD = event => {
        const data = {
            name: this.state.name,
            e_type: this.state.e_type,
            f_name: this.state.f_name,
            kol: this.state.kol,
            date: this.state.date,
            prim: this.state.prim,
        };
        //Заготовка проверки на изменение шапки
        const hyst = this.state.hyst_data;
        const indx = hyst[hyst.length - 1];
        if ((hyst.length > 0) && (indx.prim === data.prim)) {
            console.log(indx.prim + ' ' + data.prim);
        }
        //--
        this.setState({
            hyst_data: [...this.state.hyst_data, data]
        });
    };

    
    ClearTable = e => {
        e.preventDefault();
        var arr = this.state.hyst_data;
        arr.splice(0,arr.length);
        this.setState({
            hyst_data: arr
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            name: this.state.name,
            e_type: this.state.e_type,
            f_name: this.state.f_name,
            kol: this.state.kol,
            date: this.state.date,
            prim: this.state.prim,
        }

        this.setState({
            hyst_data: data
        });
        

        console.log(this.setState.hyst_data);

        var err = '';
        if (data.name === ''){
            err = err + 'Инвентарный номер не введен!';
        }
        if (data.kol === ''){
            err = err + 'Количество не введено!';
        }
        if (data.date === ''){
            err = err + 'Дата не введена!';
        }
        if (!err === ''){
            alert(err);
        }else{
            console.log(data);
            /*axio.post('/sklad/new/save', {data}).then(res => {
            console.log(res.data);
            if (res.data = 'POST COMPLITE') {
                alert('Сохранение успешно');
                this.props.history.push('/sklad/all');
            }else{
                alert('Данные не удалось сохранить');
            }
            });*/
        }
        
    }

    handleChange = event => {
        if (event.target.name = 'name')
            this.setState({name: event.target.value});
        //console.log(event.target.name);
    };

    ChangeDate = event => {
        this.setState({date: event.target.value});
    };
  
    ChangeType = event => {
        this.setState({e_type: event.target.value});
        console.log(event.target.value);
    };

    ChangeFirm = event => {
        this.setState({f_name: event.target.value});
    };

    ChangeKol = event => {
        this.setState({kol: event.target.value});
    };

    ChangePrim = e =>{
        this.setState({prim: e.target.value});
    };

    componentDidMount = () => {
        axio.get('./new/type').then(res=>{
            //console.log(res.data);
            this.setState({
                type_data: res.data
            });
        });
        axio.get('./new/manufact').then(res=>{
            //console.log(res.data);
            this.setState({
                man_data: res.data
            });
        });
        axio.get('./new/units').then(res=>{
            //console.log(res.data);
            this.setState({
                units_data: res.data
            });
        });
        axio.get('./new/kat').then(res=>{
            //console.log(res.data);
            this.setState({
                kat_data: res.data
            });
        });
    }


    render () {
        return (
            <div className="input_form input_form_pos">
                <form onSubmit={this.handleSubmit, this.ClearTable}>
                    <table className='input_form__table input_form__table_pos'>
                        <thead>
                        <tr>
                            <th className='cell_name'>
                                <p>Поставщик </p>
                            </th>
                            <th><select id="elem_type" name='e_type' onChange={this.ChangeType}>
                            {this.state.man_data.map( id => <option key={id.m_id} value={id.m_id}>{id.m_name}</option>)}     
                            </select></th>
                            <th className='cell_name'>
                                <p>Номер договора</p>
                            </th>
                            <th><input></input></th>
                            <th className='cell_name'>
                                <p>Дата договора</p>
                            </th>
                            <th><input type="date" name='date' onChange={this.ChangeDate}></input></th>
                        </tr>
                        </thead>
                    </table>
                    <table className='input_form__table input_form__table_pos'>
                        <tbody>
                        <tr>
                            <td className='cell_name'><p>Категория</p></td>
                            <td><select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.kat_data.map( id => <option key={id.kat_id} value={id.kat_id}>{id.kat_name}</option>)}  
                            </select></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Инвентарный номер</p></td>
                            <td><p><input></input></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Тип оборудования</p></td>
                            <td><p><select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.type_data.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}  
                            </select></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Модель оборудования</p></td>
                            <td><p><input></input></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Ед. измерения</p></td>
                            <td><p><select id="elem_type" name='e_type' onChange={this.ChangeType} value={this.state.value}>
                                {this.state.units_data.map( id => <option key={id.un_id} value={id.un_id}>{id.un_name}</option>)}  
                            </select></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Количество</p></td>
                            <td><p><input name='kol' type='number' onChange={this.ChangeKol}></input></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Примечание</p></td>
                            <td><p><input name='prim' onChange={this.ChangePrim}></input></p></td>
                        </tr>
                        <tr>
                            <td className='cell_name'><p>Привязка</p></td>
                            <td><p><input name='prim' onChange={this.ChangePrim}></input></p></td>
                        </tr>
                        </tbody>
                    </table>
                    <div className='input_form__bb input_form__bb_pos'>
                        <button type='submit' className="input_form__button input_form__button_pos">
                            Сохранить
                        </button>
                        <button type='button' onClick={this.handleSaveD} className="input_form__button input_form__button_pos" >
                            Сохранить и дублировать
                        </button>
                        <button type='reset' className="input_form__button input_form__button_pos cancel_button" >
                            Отмена
                        </button>
                    </div>
                </form>
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
                        {this.state.hyst_data.map( id =>  <BlockItem key={this.nextUniqueId()} kol={id.kol} date='20.20.2020' 
                            kod='AAAA' kat={id.name} id='12' units='шт' prim={id.prim} />)}
                       
                    </tbody>
                </table>

            </div>
        );
    }
    
}

/*
<div>
                        <p>Филиал </p>
                        <p>Категория </p>
                        <p>Инв номер </p>
                        <p>Номенклатура</p>
                        <p>Ед. измерения</p>
                        <p>Кол-во</p>
                    </div>
                    <div>
                        <p><input name='name' onChange={this.handleChange}></input> </p>
                        <p>
                            <select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.type_data.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}
                                  
                            </select> 
                        </p>
                        <p>
                            <select id="fact_name" name='f_name' onChange={this.ChangeFirm}>
                            {this.state.man_data.map( id => <option key={id.m_id} value={id.m_id}>{id.m_name}</option>)}
                                
                            </select> 
                        </p>
                        <p><input name='kol' type='number' onChange={this.ChangeKol}></input> </p>
                        <p><input type="date" name='date' onChange={this.ChangeDate}></input> </p>
                    </div>
*/

/*
            <p>Название элемента <input></input></p>
            <p>Тип элемента <input></input></p>
            <p>Производитель <input></input></p>
            <p>Дата ввода <input></input></p>

*/
/*
<div className="Element">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <p>Филиал </p>
                        <p>Категория </p>
                        <p>Инв номер </p>
                        <p>Номенклатура</p>
                        <p>Ед. измерения</p>
                        <p>Кол-во</p>
                    </div>
                    <div>
                        <p><input name='name' onChange={this.handleChange}></input> </p>
                        <p>
                            <select id="elem_type" name='e_type' onChange={this.ChangeType}>
                                {this.state.type_data.map( id => <option key={id.te_id} value={id.te_id}>{id.te_name}</option>)}
                                  
                            </select> 
                        </p>
                        <p>
                            <select id="fact_name" name='f_name' onChange={this.ChangeFirm}>
                            {this.state.man_data.map( id => <option key={id.m_id} value={id.m_id}>{id.m_name}</option>)}
                                
                            </select> 
                        </p>
                        <p><input name='kol' type='number' onChange={this.ChangeKol}></input> </p>
                        <p><input type="date" name='date' onChange={this.ChangeDate}></input> </p>
                    </div>
                    <button type='submit' className="action_block">
                        Сохранить
                    </button>
                    <button type='reset' className="action_block" >
                        Отменить
                    </button>
                </form>
            </div>
            */