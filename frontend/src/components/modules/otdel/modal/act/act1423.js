import React, {Component} from 'react';
import UnicId from 'react-html-id';
import './act.css';
import axio from 'axios';
import Loader from '../../../../simple_comp/loader/loader'

import Column from './column1423';

export default class Act1423 extends Component{
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
            isLoader: false,
        }
    }

    componentDidMount () {
        //var row = this.props.row
        //console.log(this.props)
        this.dopData = this.props.dop_equip;
        this.dopUpload.push(this.props.row);
        var arr = [];
        arr[0] = this.props.row;
        /*var arr2 = [];
        arr2.push(arr);*/
        this.setState({dop_upload: arr })
    }

    onClose = () => {
        this.props.onClose();
    }

    onSubmith = async () => {
        //console.log(this.props)
        this.setState({
            isLoader: true
        })
        var data = {
            dop_upload: this.state.dop_upload,
            osn_upload: this.state.dop_upload,
            user: this.props.actUser,
            mol_name: this.props.row.mol_name,
            act_id: 1,
            prim: '',
            equip: this.state.dop_upload
        }
        this.state.dop_upload.forEach(row => {
            data.prim = data.prim + ' ' + row.equip_name;
        })
        //console.log(this.state.dop_upload)
        //console.log(data)
        const FileDownload = require('js-file-download');
        
        await axio.post('/otdel/spisat14_23', {data},  { responseType: 'arraybuffer' }).then(res=>{
            FileDownload(res.data, '14-23.xlsx');
            this.setState({
                isLoader: false
            });
        });
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
        //console.log(arr[0].equip_name)
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
        //this.setState({ dop_sel: e.target.value });
        this.dopData.forEach(row => {
            if (row.bl_id === val){
                arr.push(row);
                this.dopData.splice(indx, 1);
            }
            indx ++;
        });
        //console.log(arr[0].equip_name)
        this.setState({ 
            dop_sel: e.target.value,
            //dop_upload: arr,
        });
        this.setState({dop_upload: this.state.dop_upload.concat(arr)})
        this.dopUpload.push(arr);
        //console.log(this.dopUpload);
    }

    render() {
        var indx = 1;
        return (
            <div className='background_modal background_modal_pos'>
            <div className="modal modal_pos">
                <div className="act_main">
                    <p>Акт 14-23 </p>
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
                            <label className='act_container_text'>_____</label>
                        </div>
                        <div className='combo_div'>
                            <label>2: </label>
                            <label className='act_container_text'>{this.props.actUser}</label>
                        </div>
                        <div className='combo_div'>
                            <label>3: </label>
                            <label className='act_container_text'>_____</label>
                        </div>
                        <div className='combo_div'>
                            <label>4: </label>
                            <label className='act_container_text'>{this.props.row.mol_name}</label>
                        </div>
                        <div className='act_line_div'>
                            <label>подтверждаем, что в следующем основном средстве: </label>
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
                        <div className='act_line_div'>
                            <label>были установлены следующие материальные ценности: </label>
                            <select onChange={this.changeDop} value={this.state.dop_sel}>
                                <option placeholder='----' value='-1'></option>
                                {this.props.dop_equip.map( id => <option key={this.nextUniqueId()} value={id.bl_id}>{id.equip_name}</option>)}
                            </select>
                            <button className='button'>Добавить</button>
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
                                    { this.state.dop_upload.map(row => <Column key={this.nextUniqueId()} data={row} indx={indx} />)}
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
            {this.state.isLoader && <Loader/>}
        </div>
        );
    }
}

