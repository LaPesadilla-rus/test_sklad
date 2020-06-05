import React, {Component} from 'react';
import './modalAct.css';

import axio from 'axios';

export default class ModalAct extends Component{
    constructor(){
        super();
        this.state = {
            otd_data: [],
        }
    }

    changeOtdel = (e) => {
        /*this.setState({ otd_sel: e.target.value});
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
        })*/
    }

    equipMove = (e) => {
        e.preventDefault();
        /*var otd_id = this.state.otd_sel,
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
            
        }**/
    }

    onClose = () => {
        this.props.onClose();
    }

    clickAct = (e) => {
        this.props.onClickAct();
    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">
                    <div className="otdel_modal">
                        <p>Выбрать способ списания: </p>
                        <div className='otdel_workspace_equip'>
                            <button className='button' onClick={this.clickAct} value='1'>Акт 14-23</button>
                            <button className='button'>Акт 14-25</button>
                            <button className='button'>Акт 14-27</button>
                            <button className='button'>Акт 14-29</button>
                            <button className='button'>Акт 14-31</button>
                            <button className='button'>Акт 14-33</button>
                            <button className='button'>Дефектная ведомость</button>
                        </div>
                        <div className='combo_div'>
                            <button className='button button_red' onClick={this.onClose}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}