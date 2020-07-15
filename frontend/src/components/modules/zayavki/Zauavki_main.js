import React, {Component} from 'react';
import './Zauvki.css'
import Zauvki_nap from './Zauvki_nap.js'
import Zauvki_form_send from './Zauvki_form_send'
import Zauvki_form_change from './Zauvki_form_change'
export default class Zauavki_main extends Component {
    constructor() {
        super();
        
        this.state = {
            showM:false,
            clf:false,
            value: ''
        }
    }
    show = () => {
        this.setState({showM: !this.state.showM})	
                  
}

Look = () => {
    this.setState({clf: !this.state.clf})	
              
}
    render(){
        return (
        <div className='Table_pol'>
            <div className='back'>
                    <button className='buttons' onClick={this.show}>Создать</button>
                    <button className='buttons' >Кнопка стратегического значения</button>
            </div>
                <div className='ForB'>
                <table className='Table' border='1' >
         
                    <thead> 
                        <tr className='Table_head'>
                            <th>Категория </th>
                            <th>Тип</th>
                            <th>Марка</th>
                            <th>Описание</th>
                            <th>Статус</th>
                        </tr>
                    </thead> 
                    <tbody>
                    <Zauvki_nap Look={this.Look}/>
                    </tbody>
                </table>
                {this.state.clf &&  <Zauvki_form_change clf={this.Look} />}
                {this.state.showM &&  <Zauvki_form_send showM={this.show}  />}
                </div>
        </div>
    );
    }
    
}

//export default Data_Block;





