import React, {Component} from 'react';

export default class Zauvki_form_send extends Component{
 
    constructor() {
        super();
        
        this.state = {
            value: 'Введите описание заявки'
        } 
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
      }

    onClose = () => {
        this.props.clf();
    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
                <div className='modal modal_pos'>
                    {/*<form onSubmit={this.equipMove} className="otdel_modal">*/}
                        <p>Форма редакции заявки</p>
                        <table>
                        <tbody>
                        <tr>
                            <td align="left">Категория </td><td><select></select></td></tr>
                        <tr>
                            <td align="left">Тип </td><td><select></select></td></tr>
                        <tr>
                            <td align="left"> Марка </td><td><select></select></td></tr>
                        <tr>
                            <td colSpan='3'><textarea className='Text'value={this.state.value} onChange={this.handleChange}>Введите описание заявки</textarea></td>
                        </tr>
                        <tr>
                            <td><button type='submit'>Отправить</button></td> 
                            <td><button type='reset' onClick={this.onClose}>Отмена</button></td> 
                            </tr>
                        </tbody></table>
                </div>
            </div>
        );
    }
}

//ModalMoveS