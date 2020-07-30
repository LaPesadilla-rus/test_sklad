import React, {Component} from 'react';
import UnicId from 'react-html-id';
import './act.css';
import axio from 'axios';
import { connect } from 'react-redux';
import { setLoaderShow, setLoaderHide } from '../../../../../store/loader/actions';
import { setMessageShow } from '../../../../../store/message/actions';

class Zakl extends Component{
    constructor(){
        super();
        UnicId.enableUniqueIds(this);
        this.osnUpload = [];
        this.dopUpload = [];
        this.dopData = [];
        this.loader = false;
        this.state = {
            osn_upload: [],
            dop_upload: [],
            numZakl: '',
            dateZakl: '',
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
    }

    onClose = () => {
        this.props.onClose();
    }

    onSubmith = async () => {    
        /*this.props.setLoaderShow();
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
        await this.props.onReboot();*/
        
    }

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
                    <p>Экспертное заключение</p>
                    <div className='act_container'>
                        <div className='combo_div'>
                            <label>Номер экспертного заключения: </label>
                            <input onChange={(e) => { this.setState({ numZakl: e.target.value})}} value={this.state.numZakl}></input>
                        </div>
                        <div className='combo_div'>
                            <label>Дата заключения: </label>
                            <input type='date' onChange={(e) => { this.setState({ dateZakl: e.target.value})}} value={this.state.dateZakl}></input>
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

)(Zakl)

