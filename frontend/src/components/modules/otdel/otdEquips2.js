import React, {Component} from 'react';
import './otdMain.css';
import axio from 'axios';

export default class OtdEquips2 extends Component{
    constructor(){
        super();
        this.state ={
            isEditOpen: false,
            txt: '',
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, false);
        (this.props.reg) ? console.log('button_red') : console.log('false');  
    }

    clickMove = () => {
        this.props.clickEquip(this.props.row);     
    }

    clickAct = () => {
        if (this.props.clickAct){
            this.props.clickAct(this.props.row);
        }
        //console.log(this.props.row)
    }

    openEdit = () => {
        let open = this.state.isEditOpen;

        if (open && this.state.txt !== this.props.row.bl_prim){
            let data = {
                bl_id: this.props.row.bl_id,
                txt: this.state.txt,
            }
            axio.post('/otdel/prim/update', {data}).then(res=>{
                this.setState({
                    data: res.data
                });
                this.props.onReboot();
            });
            console.log('send ' + this.state.txt)
        }
        this.setState({ isEditOpen: true, txt: this.props.row.bl_prim});
    }

    handleClickOutside =(e) => {
        if (e.target.localName !== 'textarea' && e.target.cellIndex !== 6 && this.state.isEditOpen){
            let open = this.state.isEditOpen;
            
            if (open && this.state.txt !== this.props.row.bl_prim){
                let data = {
                    bl_id: this.props.row.bl_id,
                    txt: this.state.txt,
                }
                axio.post('/otdel/prim/update', {data}).then(res=>{
                    this.setState({
                        data: res.data
                    });
                    this.props.onReboot();
                });
            }

            this.setState({ isEditOpen: false});
        }
    }

    render() {
        let button_item = `button_item`;
        if (this.props.row.kat_name === 'Основные средства'){
            button_item += ` kat_osn`;
        }
        if (this.props.row.kat_name === 'Картриджи'){
            button_item += ` kat_kartr`;
        }
        let spsButton = <div className='button_container'> <div className='button button_yellow' onClick={this.clickAct}>Списать</div></div>
        
        return (
                <tr className={`button sklad_table_row `+((this.props.reg) ? 'otd_button_red' : button_item)+`  otdel_grow`} >
                    <td onClick={this.clickMove}>{this.props.mol && this.props.mol}</td>
                    <td onClick={this.clickMove}>{this.props.row.bl_inv_num}</td>
                    <td onClick={this.clickMove}>{this.props.row.equip_name}</td>
                    <td onClick={this.clickMove}>{this.props.row.bl_buh_name}</td>
                    <td onClick={this.clickMove}>{this.props.row.un_name}</td>
                    <td onClick={this.clickMove}>{this.props.row.bl_amount}</td>
                    <td onClick={this.openEdit}>{(this.state.isEditOpen) ? <textarea onChange={(e) => {this.setState({ txt: e.target.value})}} 
                                                                                    value={this.state.txt}/> 
                                                                        : this.props.row.bl_prim}</td>
                    <td>{(this.props.reg !== '1') ? spsButton : ''}</td>
                </tr>
        );
    }
}

/*<div className='combo_div'>
                    <div className='button button_item otdel_grow ' onClick={this.clickMove}>{this.props.row.equip_name}</div>
                    {(this.props.reg !== '1') ? spsButton : ''}
                    
        </div>*/

