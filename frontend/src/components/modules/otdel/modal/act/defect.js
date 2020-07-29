import React, {Component} from 'react';
import UnicId from 'react-html-id';
import './act.css';
import axio from 'axios';
import { connect } from 'react-redux';
import { setLoaderShow, setLoaderHide } from '../../../../../store/loader/actions';
import { setMessageShow } from '../../../../../store/message/actions';

import Column from './column1423';

class Defect extends Component{
    constructor(){
        super();
        UnicId.enableUniqueIds(this);
        this.osnUpload = [];
        this.dopUpload = [];
        this.dopData = [];
        this.loader = false;
        this.state = {
            osn_sel: '',
            dop_sel: '',
            osn_upload: [],
            dop_upload: [],
            dateExp: '',
            dateRazn: '',
            defTxt: '',
            zakTxt: '',

        }
    }

    componentDidMount () {
        this.dopData = this.props.dop_equip;
        this.dopUpload.push(this.props.row);
        var arr = [];
        arr[0] = this.props.row;
        this.setState({dop_upload: arr }, () => {
            this.changeAmount(1, 0)
        });
        let d = new Date(this.props.row.bl_inp_date)
        let dd = new Date();
        let str = ''
        let fYear = dd.getFullYear() - d.getFullYear();
        str += fYear;
        if (fYear === 0){
            str += ' Лет ';
        }else if ( fYear === 1){
            str += ' Год ';
        }else if (fYear > 1 && fYear < 5){
            str += ' Года ';
        }else if (fYear > 4 || fYear === 1){
            str += ' Лет '
        }
        let fMont = dd.getMonth() - d.getMonth();
        str += fMont;
        if (fMont === 0){
            str += ' Месяцев ';
        }else if ( fMont === 1){
            str += ' Месяц ';
        }else if (fMont > 1 && fMont < 5){
            str += ' Месяца ';
        }else if (fMont > 4 || fMont === 1){
            str += ' Месяцев '
        }
        let fDay = dd.getDate() - d.getDate();
        str += fDay;
        if (fDay === 0){
            str += ' Дней ';
        }else if ( fDay === 1){
            str += ' День ';
        }else if (fDay > 1 && fDay < 5){
            str += ' Дня ';
        }else if (fDay > 4 || fDay === 1){
            str += ' Дней '
        }
        let row = this.props.row;
        row.sp_amount = 1;
        this.setState({
            dateRazn: str,
            dateExp: d.getFullYear(),
        })
    }

    onClose = () => {
        this.props.onClose();
    }

    onSubmith = async () => {    
        /*if (this.state.osn_upload.length === 0){
            alert('Основное средство не выбрано');
            return 0;
        }*/
        this.props.setLoaderShow();
        var data = {
            dop_upload: this.state.dop_upload,
            osn_upload: this.state.osn_upload,
            user: this.props.actUser,
            mol_name: this.props.row.mol_name,
            act_id: 7,
            prim: '',
            equip: this.state.dop_upload,
            ot_name: this.props.data.ot_name,
            defTxt: this.state.defTxt,
            zakTxt: this.state.zakTxt,
            dateRazn: this.state.dateRazn,
            dateExp: this.state.dateExp
        }
        this.state.dop_upload.forEach(row => {
            data.prim = data.prim + ' ' + row.equip_name;
        })
        const FileDownload = require('js-file-download');
        
        await axio.post('/otdel/spisatDefect', {data},  { responseType: 'arraybuffer' }).then(res=>{
            FileDownload(res.data, 'Defect.xlsx');
            //this.props.setMessageShow('Списание успешно',2);
        });
        await this.props.setLoaderHide();
        await this.props.onClose();
        await this.props.modalActClose();
        await this.props.onReboot();
        
    }

    /*changeOsn = (e) => {
        var arr = [],
        val = parseInt(e.target.value);
        this.props.osn_equip.forEach(row => {
            if (row.bl_id === val){
                arr.push(row);
            }
        });
        this.setState({ 
            osn_sel: e.target.value,
            osn_upload: arr,
        });
        this.osnUpload = arr;
    }*/

    /*changeDop = (e) => {
        var arr = [],
        val = parseInt(e.target.value),
        indx = 0;
        this.dopData.forEach(row => {
            if (row.bl_id === val){
                arr.push(row);
                this.dopData.splice(indx, 1);
            }
            indx ++;
        });
        this.setState({ 
            dop_sel: e.target.value,
        });
        let l = this.state.dop_upload.length;
        this.setState({dop_upload: this.state.dop_upload.concat(arr)}, () => {
            this.changeAmount(1, l++)
        })
        this.dopUpload.push(arr);
    }*/

    changeAmount = (val, indx) => {
        let arr = this.state.dop_upload;
        arr[indx].sp_amount = val;
        this.setState({
            dop_upload: arr
        })
        
    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
            <div className="modal modal_pos">
                <div className="act_main">
                    <p>Дефектная ведомость</p>
                    <div className='act_container'>
                        <div className='combo_div'>
                            <label>Структурное подразделение: </label>
                            <span>{this.props.data.ot_name}</span>
                        </div>
                        <div className='combo_div'>
                            <label>Основное средство: </label>
                            <span>{this.props.row.equip_name}</span>
                        </div>
                        <div className='combo_div'>
                            <label>Инвентарный номер: </label>
                            <span>{this.props.row.bl_inv_num}</span>
                        </div>
                        <div className='combo_div'>
                            <label>Год ввода в эксплуатацию: </label>
                            <span>{this.state.dateExp}</span>
                        </div>
                        <div className='combo_div'>
                            <label>Срок эксплуатации: </label>
                            <span>{this.state.dateRazn}</span>
                        </div>
                        <div className='combo_div'>
                            <label>Материально-ответственное лицо: </label>
                            <span>{this.props.row.mol_name}</span>
                        </div>
                        <div className='combo_div'>
                            <table className='act_table'>
                                <thead>
                                    <tr>
                                        <th>Дефекты и повреждения</th>
                                        <th>Заключение комиссии о целесообразности ремонта</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><textarea onChange={(e) => {this.setState({ defTxt: e.target.value})}} value={this.state.defTxt}></textarea></td>
                                        <td><textarea onChange={(e) => { this.setState({ zakTxt: e.target.value})}} value={this.state.zakTxt}></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='combo_div'>
                    <button className='button button_green' onClick={this.onSubmith}>Подвердить</button>
                        <button className='button button_red' onClick={this.onClose}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const pushDispatchToProps = {
    setLoaderShow,
    setLoaderHide,
    setMessageShow
};

export default connect(
    '',
    pushDispatchToProps,

)(Defect)

