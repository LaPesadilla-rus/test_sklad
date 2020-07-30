import React, {Component} from 'react';
import UnicId from 'react-html-id';
import './act.css';
import axio from 'axios';
import { connect } from 'react-redux';
import { setLoaderShow, setLoaderHide } from '../../../../../store/loader/actions';

import Column from './column1423';

class Act1425 extends Component{
    constructor(){
        super();
        UnicId.enableUniqueIds(this);
        this.osnUpload = [];
        this.dopUpload = [];
        this.dopData = [];
        this.loader = false;
        this.us ='';
        this.us_s='';
        this.state = {
            osn_sel: '',
            dop_sel: '',
            osn_upload: [],
            dop_upload: [],
            users_otd: [],
            user_arr:[],
            users:[],
            val_user:'',
            val_us_s:'',
            used_sotr:[]
        }
    }

    componentDidMount () {
        this.dopData = this.props.dop_equip;
        this.dopUpload.push(this.props.row);
        var arr = [];
        arr[0] = this.props.row;
        this.setState({dop_upload: arr }, () => {
            this.changeAmount(1, 0)
        })
        let usarr =[];
        axio.get('/otdel/ShowUserOtd').then 
        (res=>{ 
            res.data.map(row => { 
                usarr.push(row);
                //console.log(usarr);
            })
            this.setState({
                user_arr: res.data,
                users: usarr,
                used_sotr:usarr
            });
        }); 
    }

    SelectUser=(e)=>{
        let arUs=[];
        let val =e.target.value;
        this.state.users.map(row =>{
            if (parseInt(val)=== row.us_id){
                this.us=row.us_name+row.us_dolsn
                arUs.push(row)
           }
        })  
    }
    
    SelectedUser=(e)=>{
        let usar=[]
        let val =e.target.value;
        this.state.users.map(row =>{
            if (parseInt(val)=== row.us_id){
                this.us_s=row.us_name+"  "+row.us_dolsn
                usar.push(row)
            }
        })     
         
    }

    onClose = () => {
        this.props.onClose();
    }

    GetSelect =(e)=>{
        this.SelectUser(e);
        this.setState({val_user: e.target.value})
    }
    GetSelected =(e)=>{
        this.SelectedUser(e);
        this.setState({val_us_s: e.target.value})
    }

    onSubmith = async () => {
        if (this.state.osn_upload.length === 0){
            alert('Основное средство не выбрано');
            return 0;
        }
        this.props.setLoaderShow();
        var data = {
            dop_upload: this.state.dop_upload,
            osn_upload: this.state.osn_upload,
            user: this.props.actUser,
            mol_name: this.props.row.mol_name,
            act_id: 2,
            prim: '',
            equip: this.state.dop_upload,
            users: this.state.users,
            val_user:this.state.val_user,
            val_us_s:this.state.val_us_s,
            us:this.us,
            us_s:this.us_s
        }
        //console.log(data)
        this.state.dop_upload.forEach(row => {
            data.prim = data.prim + ' ' + row.equip_name;
        })
        const FileDownload = require('js-file-download');
        
        await axio.post('/otdel/spisat14_25', {data},  { responseType: 'arraybuffer' }).then(res=>{
            FileDownload(res.data, '14-25.xlsx');
            //this.props.setMessageShow('Списание успешно',2);
        });
        await this.props.setLoaderHide();
        await this.props.onClose();
        await this.props.modalActClose();
        await this.props.onReboot();
        
    }

    changeOsn = (e) => {
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
    }

    changeDop = (e) => {
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
    }

    changeAmount = (val, indx) => {
        let arr = this.state.dop_upload;
        arr[indx].sp_amount = val;
        this.setState({
            dop_upload: arr
        })
    }

    delRows = (data) => {
        var arr = this.state.dop_upload;
        for (var i = 1; i < arr.length; i++){//console.log(arr)
         {
            if (arr[i].bl_id === data.bl_id)
            arr.splice(i, 1);
                
            }
        }this.setState({
            dop_upload: arr
        })
       }


    render() {
        return (
            <div className='background_modal background_modal_pos'>
            <div className="modal modal_pos">
                <div className="act_main">
                    <p>Акт 14-25 </p>
                    <div className='act_container'>
                        <div className='combo_div'>
                            <label>Материально-ответственное лицо: </label>
                            <label className='act_container_text'>{this.props.row.mol_name}</label>
                        </div>
                        <div className='combo_div'>
                            <label>Мы нижуподписавшиеся: </label>
                        </div>
                        <div className='combo_div'>
                            <label>1: </label>
                            <select onChange={this.GetSelect} value={this.state.val_user}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.users.map( id => <option key={this.nextUniqueId()} value={id.us_id}>{id.us_name + id.us_dolsn}</option>)}
                            </select>
                        </div>
                        <div className='combo_div'>
                            <label>2: </label>
                            <label className='act_container_text'>{this.props.actUser}</label>
                        </div>
                        <div className='combo_div'>
                            <label>3: </label>
                            <select onChange={this.GetSelected} value={this.state.val_us_s}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.users.map( id => <option key={this.nextUniqueId()} value={id.us_id}>{id.us_name + id.us_dolsn}</option>)}
                            </select>
                        </div>
                        <div className='combo_div'>
                            <label>4: </label>
                            <label className='act_container_text'>{this.props.row.mol_name}</label>
                        </div>
                        <div className='act_line_div'>
                            <label>подтверждаем, что следующие материальные ценности: </label>
                            <select onChange={this.changeDop} value={this.state.dop_sel}>
                                <option placeholder='----' value='-1'></option>
                                {this.props.dop_equip.map( id => <option key={this.nextUniqueId()} value={id.bl_id}>{id.equip_name}</option>)}
                            </select>
                        </div>
                        <div className='combo_div'>
                            <table className='act_table'>
                                <thead>
                                    <tr>
                                        <th>№ п/п</th>
                                        <th>Наименование МЦ</th>
                                        <th>Инвентарный номер</th>
                                        <th>Единица измерения</th>
                                        <th>Количество</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.dop_upload.map((row, indx) => <Column key={this.nextUniqueId()} delRows={this.delRows} data={row} indx={indx} changeAmount={this.changeAmount} />)}
                                </tbody>
                            </table>
                        </div>
                        <div className='act_line_div'>
                            <label>были установлены в основное средство: </label>
                            <select onChange={this.changeOsn} value={this.state.osn_sel}>
                                <option placeholder='----' value='-1'></option>
                                {this.props.osn_equip.map( id => <option key={id.bl_id} value={id.bl_id}>{id.equip_name}</option>)}
                            </select>
                        </div>
                        <div className='combo_div'>
                            <table className='act_table'>
                                <thead>
                                    <tr>
                                        <th>№ п/п</th>
                                        <th>Наименование ОС</th>
                                        <th>Инвентарный номер</th>
                                        <th>Единица измерения</th>
                                        <th>Количество</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{(this.osnUpload.length > 0) ? 1 : ''}</td>
                                        <td>{(this.osnUpload.length > 0) ? this.osnUpload[0].equip_text : ''}</td>
                                        <td>{(this.osnUpload.length > 0) ? this.osnUpload[0].bl_inv_num : ''}</td>
                                        <td>{(this.osnUpload.length > 0) ? this.osnUpload[0].un_name : ''}</td>
                                        <td>{(this.osnUpload.length > 0) ? 1 : ''}</td>
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
    setLoaderHide
};

export default connect(
    '',
    pushDispatchToProps,

)(Act1425)

