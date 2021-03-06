import React, {Component} from 'react';
import './modalAct.css';

export default class ModalAct extends Component{

    onClose = () => {
        this.props.onClose();
    }

    clickAct = (e) => {
        this.props.onClickAct(e.target.value);
    }

    render() {
        let actButtons = <div className='otdel_workspace_equip'>
                            <button className='button' onClick={this.clickAct} value='1'>Акт 14-23</button>
                            <button className='button' onClick={this.clickAct} value='2'>Акт 14-25</button>
                            <button className='button' onClick={this.clickAct} value='3'>Акт 14-27</button>
                            <button className='button' onClick={this.clickAct} value='4'>Акт 14-29</button>
                            <button className='button' onClick={this.clickAct} value='5'>Акт 14-31</button>
                            <button className='button' onClick={this.clickAct} value='6'>Акт 14-33</button>
                        </div>;
        let defButtons = <div className='otdel_workspace_equip'>
                            <button className='button' onClick={this.clickAct} value='100'>Дефектная ведомость</button>
                        </div>;
        let refoundButton = <div className='otdel_workspace_equip'>
                                <button className='button button_yellow' onClick={this.clickAct} value='800'>Вернуть на склад</button>
                            </div>
        let zaklButton = <div>
            <button className='button'  onClick={this.clickAct} value='200'>Экспертное заключение</button>
        </div>
        return (
            <div className='background_modal background_modal_pos'>
                <div className="modal modal_pos">
                    <div className="otdel_modal">
                        <p>Выбрать способ списания: </p>
                        {(this.props.data.eq_kat_id === 0) ?((!this.props.data.bl_spisat) ? defButtons : null ): actButtons}
                        {(this.props.data.bl_spisat) ? zaklButton : null}
                        {(this.props.role === 0) ? refoundButton: null}
                        
                        <div className='combo_div'>
                            <button className='button button_red' onClick={this.onClose}>Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}