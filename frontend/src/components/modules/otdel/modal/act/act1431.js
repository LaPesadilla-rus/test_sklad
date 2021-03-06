import React, {Component} from 'react';
import UnicId from 'react-html-id';
import './act.css';
import axio from 'axios';
import { connect } from 'react-redux';
import { setLoaderShow, setLoaderHide } from '../../../../../store/loader/actions';
import Column from './column1423';

class Act1431 extends Component{
    constructor(){
        super();
        UnicId.enableUniqueIds(this);
        this.newUpload = [];
        this.dopUpload = [];
        this.osnUpload = [];
        this.dopData = [];
        this.OsnData =[];
        this.loader = false;
        this.us ='';
        this.us_s='';
        this.state = {
            eq_data:[],
            osn_sel:'',
            dop_sel: '',
            osn_upload: [],
            new_upload: [],
            dop_upload: [],
            neof_name: '',
            new_inv_nb: '',
            all_mas:'',
            eq_name: '',
            datas: [],
            val_eq: '',
            eq_id_ch: '',
            values: [],
            users_otd: [],
            user_arr:[],
            users:[],
            val_user:'',
            val_us_s:'',
            used_sotr:[]
        }
    }
    componentDidMount = ()=> {
        let arr1 = this.props.dop_equip,
            arr2 = this.props.osn_equip,
            arr3 = arr1.concat(arr2),
            arr4 = [];
            
        arr3.forEach( row =>{
            if(row.bl_otd_id===row.mo_otd_id){
                arr4.push(row)
            }
        })
        this.OsnData = this.props.osn_equip;
        this.dopData = arr4;

        var arr = [];
        arr[0] = this.props.row;
        this.setState({dop_upload: arr, new_upload: arr4}, () => {
            this.changeAmount(1, 0)
        //    console.log(this.props.row)
    })  
    let usarr =[];
    axio.get('/otdel/ShowUserOtd').then 
    (res=>{ 
        console.log(res.data)
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
    let arr_eq =[];
    axio.get('/otdel/filter_data').then 
    (res=>{console.log(res.data.eq_data)
        res.data.eq_data.map(row => { arr_eq.push(row);
        })
        this.setState({
            datas: res.data,
            eq_data: arr_eq,
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

onChanged =(e)=>{
this.setState({val_eq:e.target.value});
let arrt = [];
let val = e.target.value;
this.state.eq_data.map(id =>{
    if (parseInt(val)=== id){
        arrt.push(id);
   }

    if (arrt.length ===0){
        this.setState({val_eq:'' })
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

    GetOnChange =(e)=>{
        this.setState({val_eq: e.target.value})
    }

    GetNeofName =(e)=>{
        this.setState({neof_name: e.target.value})
    }

    GetNewInvNB =(e)=>{
        this.setState({new_inv_nb: e.target.value})
    }
    onSubmith = async () => {
    if (this.state.neof_name.length === 0){
            alert('Введите название основного средства');
            return 0;
        }
        if (this.state.new_inv_nb.length === 0){
            alert('Введите инвентарный номер');
            return 0;
        }

        //this.props.setLoaderShow();
        var data = {
            dop_upload: this.state.dop_upload,
            user: this.props.actUser,
            mol_name: this.props.row.mol_name,
            act_id: 5,
            prim: '',
            equip: this.state.dop_upload,
            ot_name: this.props.row.ot_name,
            neof_name: this.state.neof_name,
            new_inv_nb: this.state.new_inv_nb,
            amount: '1',
            mol: this.props.row.bl_mol_id,
            idotd: this.props.row.bl_otd_id,
            dop_sel: this.state.dop_sel, 
            eqid: this.props.row.bl_id,
            val_eq: this.state.val_eq,
            users: this.state.users,
            val_user:this.state.val_user,
            val_us_s:this.state.val_us_s,
            us:this.us,
            us_s:this.us_s
        }
        this.state.dop_upload.forEach(row => {
            data.prim = data.prim + ' ' + row.equip_name;
        })
        const FileDownload = require('js-file-download');
        await axio.post('/otdel/spisat14_31', {data},  { responseType: 'arraybuffer' }).then(res=>{
          FileDownload(res.data, '14-31.xlsx');
        });
        axio.post('/otdel/New_eq', {data})
  
       // console.log(data.amount)
      // 
        //await this.props.setLoaderHide();
        //await this.props.onClose();
        //await this.props.modalActClose();
        //await this.props.onReboot();
    }

    changeDop = async (e) => {
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
        let l = this.state.dop_upload.length;
        this.setState({ 
            dop_sel: e.target.value,
            dop_upload: this.state.dop_upload.concat(arr)
        }, () => {
            this.changeAmount(1, l++)
        });
        this.dopUpload.push(arr);
    }

    changeAmount = (val, indx) => {
        let arr = this.state.dop_upload;
        arr[indx].sp_amount = val;
        this.setState({
            dop_upload: arr
        })
     console.log(this.state.dop_upload)
    }
    delRows = (data) => {
            var arr = this.state.dop_upload;
            for (var i = 1; i < arr.length; i++){//console.log(arr)
            { if (arr[i].bl_id === data.bl_id)
                arr.splice(i, 1);
            }
            this.setState({
                dop_upload: arr
            })
            }
        }

    render() {
      //  var indx = 1;
        return (
            <div className='background_modal background_modal_pos'>
            <div className="modal modal_pos">
                <div className="act_main">
                    <p>Акт 14-31 </p>
                    <div className='act_container'>
                        <div className='combo_div'>
                            <label>Материально-ответственное лицо: </label>
                            <label className='act_container_text'>{this.props.row.mol_name}</label>
                        </div>
                        <div className='combo_div'>
                            <label>Мы нижеподписавшиеся: </label>
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
                            <label >подтверждаем, что из следующих основных средств и материальных ценностей </label>
                            <select onChange={this.changeDop} value={this.state.dop_sel}>
                                <option placeholder='----' value='-1'></option>
                                {this.state.new_upload.map( id => <option key={this.nextUniqueId()} value={id.bl_id}>{id.equip_name}</option>)}
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
                                        <th>Количество списываемого оборудования</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { this.state.dop_upload.map((row, indx )=> <Column key={this.nextUniqueId()} delRows={this.delRows} data={row} indx={indx} changeAmount={this.changeAmount} />)}
                                </tbody>
                            </table>
                        </div>
                        <div className='act_line_lab'>
                        <label >Наименование основного средства</label>
                        <select className='act_line_sel' onChange={this.GetOnChange}   value={this.state.val_eq}>
                                <option placeholder='----' value='-1'></option>
                                 {this.state.eq_data.map( id => <option key={this.nextUniqueId()}  value={id.eq_id}>{id.eq_name}</option>)}
                           </select> 
                        </div>
                        <div className='act_line_lab'>
                            <label>Было сформировано основное средство: </label>
                           <textarea className='Texts' name='neof_name' value={this.state.neof_name} onChange={this.GetNeofName}></textarea>
                        </div>
                        <div className='act_line_div'>
                        <label>Новый инвентарный номер: </label>
                        <textarea className='Texts' name='new_inv_nb' value={this.state.new_inv_nb} onChange={this.GetNewInvNB}></textarea>
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

)(Act1431)

