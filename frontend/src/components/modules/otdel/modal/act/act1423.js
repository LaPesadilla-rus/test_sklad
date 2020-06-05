import React, {Component} from 'react';
import './act.css';

export default class Act1423 extends Component{

    componentDidMount () {
        console.log(this.props.data)
    }

    onClose = () => {
        this.props.onClose();
    }

    render() {
        return (
            <div className='background_modal background_modal_pos'>
            <div className="modal modal_pos">
                <div className="act_main">
                    <p>Акт 14-23 </p>
                    <div className='act_container'>
                        <div className='combo_div'>
                            <label>Материально-ответственное лицо: </label>
                            <label className='act_container_text'>{this.props.data.mo_name}</label>
                        </div>
                        <div className='combo_div'>
                            <label>Мы нижуподписавшиеся: </label>
                        </div>
                        <div className='combo_div'>
                            <label>1: </label>
                            <label className='act_container_text'>asdasd</label>
                        </div>
                        <div className='combo_div'>
                            <label>2: </label>
                            <label className='act_container_text'>asdsad</label>
                        </div>
                        <div className='combo_div'>
                            <label>3: </label>
                            <label className='act_container_text'>asdsad</label>
                        </div>
                        <div className='combo_div'>
                            <label>4: </label>
                            <label className='act_container_text'>{this.props.data.mo_name}</label>
                        </div>
                        <div className='combo_div'>
                            <label>подтверждаем, что в следующем основном средстве: </label>
                            <select></select>
                        </div>
                        <div className='combo_div'>
                            <table>
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
                                        <td>1</td>
                                        <td>__</td>
                                        <td>__</td>
                                        <td>__</td>
                                        <td>__</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className='combo_div'>
                            <label>были установлены следующие материальные ценности: </label>
                            <select></select>
                            <button className='button'>Добавить</button>
                        </div>
                        <div className='combo_div'>
                            <table>
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
                                    <tr>
                                        <td>1</td>
                                        <td>{this.props.data.equip_name}</td>
                                        <td>{this.props.data.bl_inv_num}</td>
                                        <td>{this.props.data.un_name}</td>
                                        <td>1</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='combo_div'>
                    <button className='button button_green' onClick={this.onClose}>Подвердить</button>
                        <button className='button button_red' onClick={this.onClose}>Отмена</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

