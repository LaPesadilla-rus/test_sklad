import React, {Component} from 'react';
import './otdelModal.css';

import axio from 'axios';

export default class ModalMove extends Component{
    constructor(){
        super();
        this.state = {
            otd_data: [],
            mol_data: [],
            otd_sel: '',
            mol_sel: '',
        }
    }

    componentDidMount = () =>{
        var arr = [];
        this.props.separ_data.otd.forEach(row => {
            arr.push(row);
        })
        this.setState({
            otd_data: arr,
        })
    }

    changeOtdel = (e) => {
        this.setState({ otd_sel: e.target.value});
        var arr = [];
        var val = parseInt(e.target.value);
        this.props.separ_data.mol.forEach(row => {
            if (val === row.mo_otd_id)
            arr.push(row);
        });
        if (arr.length === 0) {
            this.setState({
                mol_sel: '',
            })
        }
        this.setState({
            mol_data: arr,
        })
    }

    equipMove = (e) => {
        e.preventDefault();
        var otd_id = this.state.otd_sel,
            mol_id = this.state.mol_sel,
            data = [],
            err = '';
        if(otd_id.length === 0 || otd_id === '-1'){
            err = 'Новое отделение не выбрано';
        }
        if (err.length !== 0){
            alert(err);
        }else{
            if(mol_id.length === 0 || mol_id === '-1'){
                mol_id = '';
                data= {
                    bl_id: this.props.bl_id,
                    otd_id: otd_id
                }
            }else{
                data= {
                    bl_id: this.props.bl_id,
                    otd_id: otd_id,
                    mol_id: mol_id,
                }
            }
            axio.post('/otdel/moveEQ', {data}).then(res=>{
               if (res.data !== 'MOVE COMPLITE'){
                   alert('Ошибка перемещения');
               }else{
                    this.props.onClose();
                    this.props.onReboot();
                    
               }
            });
            
        }
    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">
                    <form onSubmit={this.equipMove} className="otdel_modal">
                        <p>Перемещение</p>
                            <label>Старый отдел: {this.props.oldOtd}</label>
                        <div className='combo_div'>
                            <label>Новый отдел: </label>
                            <select onChange={this.changeOtdel} value={this.state.otd_sel}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.otd_data.map( id => <option key={id.ot_id} value={id.ot_id}>{id.ot_name}</option>)}
                            </select>
                        </div>
                        <p>Для неофициального перемещения 
                            МОЛ не выбирается</p>
                            <label>Старый мол: {this.props.row.mo_name}</label>
                        <div className='combo_div'>
                            <label>Новый МОЛ: </label>
                            <select onChange={(e) => {this.setState({ mol_sel: e.target.value})}} value={this.state.mol_sel}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.mol_data.map( id => <option key={id.mo_id} value={id.mo_id}>{id.mo_name}</option>)}
                            </select>
                        </div>
                        <div className='combo_div'>
                            <button className='button' type='submit'>Переместить</button>
                            <button className='button button_red' onClick={this.props.onClose}>Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}