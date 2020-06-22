import React, {Component}  from 'react';
import './spr_item.css';
import axio from 'axios';
import UnicId from 'react-html-id';

export default class SprItemTe extends Component {
    
    constructor (props) {
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            item_name: '',
            inp: '',
            table:'',
            id_item: '',
            show: { visibility: 'visible'},
            kat_data: [],
            kat: 0,
        };
    }

    ChangeUnit = e => {
        this.setState({item_name: e.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        const data = {
            item: this.state.item_name,
            table: this.state.table,
            id_item: this.state.id_item,
            kat_id: this.state.kat,
        }      
        var err = '';
        if (data.item === ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err === ''){
            alert(err);
        }else{
            axio.post('/spr/save', {data}).then(res => {
            //console.log(res.data);
            if (res.data === 'POST COMPLITE') {
               // alert('Сохранение успешно');
               this.props.onReboot();
                this.onClose();
            }else{
                alert('Данные не удалось сохранить');
            }
            //console.log('Submit Event : ' + res.data);
            });
            
        }
    }

    handleUpdate = event => {
        event.preventDefault();
        const data = {
            item: this.state.item_name,
            table: this.state.table,
            id_item: this.state.id_item,
            kat_id: this.state.kat,
        } 
        var err = '';
        if (data.item === ''){
            err = err + 'Единицы измерения не введены!';
        }
        if (!err === ''){
            alert(err);
        }else{
            axio.post('/spr/update', {data}).then(res => {
                //console.log(res.data);
                if (res.data === 'UPDATE COMPLITE') {
                    //alert('Редактирование успешно');
                    this.props.onReboot();
                    this.onClose();
                }else{
                    alert('Данные не удалось сохранить');
                }
            });
            
        };
    }

    componentDidMount = event => {
        if (this.props.item){
            this.setState({
                item_name: this.props.item,
                table: this.props.table,
                id_item: this.props.id_item,
                show: this.props.style,
                kat: this.props.kat_id
            })
        }else{
            this.setState({
                table: this.props.table,
                show: this.props.style,
            })
        }
        axio.get('/sklad/kat').then(res=>{
            this.setState({
                kat_data: res.data
            });
        });
    }

    onClose= () =>{
        this.props.onClose();
    }

    render () {
        let form;
        if (this.props.act === 'update'){
            form = <form onSubmit={this.handleUpdate}>
                        <div>
                            <p>Справочник: {this.props.name}</p>
                        </div>
                        <div>
                            <input name='inpt' type='text' onChange={this.ChangeUnit} value={this.state.item_name}></input>
                        </div>
                        <div>
                            <select id="elem_type" name='e_type' onChange={(e) => { this.setState({kat: e.target.value})}} value={this.state.kat}>
                                {this.state.kat_data.map( id => <option key={this.nextUniqueId()} title={id.name} value={id.id}>{id.name}</option>)}  
                            </select>
                        </div>
                        <div className='modal_button_div'>
                            <button type='submit' onClick={this.onSubmit} className='action__button'>Сохранить изменения</button>
                            <button type='button' className='action__button out_button' onClick={this.props.onClose}>Отмена</button>
                        </div>
                    </form>
        }else{
            form = <form onSubmit={this.handleSubmit}>
                        <div>
                            <p>Справочник: {this.props.name}</p>
                            <input name='inpt' type='text' onChange={this.ChangeUnit} value={this.state.item_name}></input>
                        </div>
                        <div>
                            <select id="elem_type" name='e_type' onChange={(e) => { this.setState({kat: e.target.value})}} value={this.state.kat}>
                                {this.state.kat_data.map( id => <option key={this.nextUniqueId()} title={id.name} value={id.id}>{id.name}</option>)}  
                            </select>
                        </div>
                        <div className='modal_button_div'>
                            <button type='submit' className='action__button'>Сохранить</button>
                            <button type='button' className='action__button out_button' onClick={this.props.onClose}>Отмена</button>
                        </div>
                    </form>
        }
        return (
                <div className='background_modal background_modal_pos'>
                    <div className="modal modal_pos">
                        {form}
                    </div>
                </div>
        );
    }
}
