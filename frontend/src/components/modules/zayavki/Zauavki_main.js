import React, {Component} from 'react';
import './Zauvki.css'
import UnicId from 'react-html-id';
import Zauvki_nap from './Zauvki_nap.js'
import Zauvki_form_send from './Zauvki_form_send'
import Zauvki_form_change from './Zauvki_form_change'
import axio from 'axios';
export default class Zauavki_main extends Component {
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.arr = [];
        this.state = {
            showM:false,
            clf:false,
            value: '',
            arr:[]
        }
    }
    show = () => {
        this.setState({showM: !this.state.showM})	         
}
componentDidMount (){
    axio.get('/zauvki/all_zauvki').then(res=>{
     //  console.log(res.data.fields)
        this.setState({
            arr: res.data.rows
        });
    });
}
    onReboot = () =>{
        axio.get('/zauvki/all_zauvki').then(res=>{
          console.log(res.data)
              this.setState({
                  arr: res.data.rows
              });
          });
        }
Look = (arr) => {
    this.setState({clf: !this.state.clf})	 ;
    this.arr = arr;        
}
    render(){
        return (
        <div className='Table_pol'>
            <div className='back'>
                    <button className='buttons' onClick={this.show}>Создать</button>
                    <button className='buttons' onClick={this.onReboot} >Обновить</button>
            </div>
                <div className='ForB'>
                <table className='Table' border='1' >
                    <thead> 
                        <tr className='Table_head'>
                            <th>Номер заявки</th>
                            <th>Категория </th>
                            <th>Тип</th>
                            <th>Марка</th>
                            <th>Описание</th>
                            <th>Статус</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.arr.map(id => <Zauvki_nap key={id.za_id} 
                                                            row={id}
                                                    Look={this.Look}/>)}
                    </tbody>
                </table>
                {this.state.clf &&  <Zauvki_form_change arr={this.arr} clf={this.Look} onReboot={this.onReboot}  />}
                {this.state.showM &&  <Zauvki_form_send showM={this.show} onReboot={this.onReboot} />}
                </div>
        </div>
    );
    }   
}

