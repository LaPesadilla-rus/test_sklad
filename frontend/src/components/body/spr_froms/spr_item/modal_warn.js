import React, {Component}  from 'react';
import './spr_item.css';

export default class Spr_units extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    onClose = () =>{
        this.props.onDel();
        this.props.onClose();
        
    }

    render (props) {
        return (
                <div className='background_modal background_modal_pos'>
                    <div className="modal modal_pos">
                        <p> Вы уверены, что хотите удалить? </p>
                        <div>
                            <button type='submit' className='action__button' onClick={this.onClose}>Да</button>
                            <button type='button' className='action__button out_button' onClick={this.props.onClose}>Нет</button>
                        </div>
                    </div>
                </div>
        );
    }
}
