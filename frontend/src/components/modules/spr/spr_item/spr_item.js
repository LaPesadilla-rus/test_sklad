import React, {Component}  from 'react';
import './spr_item.css';
import axio from 'axios';

export default class Spr_units extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            item_name: '',
            inp: '',
            table:'',
            id_item: '',
            show: { visibility: 'visible'},
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
            id_item: this.state.id_item
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
            id_item: this.state.id_item
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
            //console.log('Update Event : ' + res.data);
            });
            
        }
    }

    componentDidMount = event => {
        //console.log(this.props)
        if (this.props.item){
            this.setState({
                item_name: this.props.item,
                table: this.props.table,
                id_item: this.props.id_item,
                show: this.props.style,
            })
        }else{
            this.setState({
                table: this.props.table,
                show: this.props.style,
            })
        }
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
