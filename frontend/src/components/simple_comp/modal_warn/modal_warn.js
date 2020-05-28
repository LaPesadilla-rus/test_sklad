import React, {Component}  from 'react';
import './modal_warn.css';

export default class Spr_units extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render (props) {
        return (
                <div className='background_modal background_modal_pos'>
                    <div className="modal modal_pos">
                        <p>{this.props.text}</p>
                        <div>
                            <button type='submit' className='button button_green' onClick={this.props.clickYes}>Да</button>
                            <button type='button' className='button button_red' onClick={this.props.clickNo}>Нет</button>
                        </div>
                    </div>
                </div>
        );
    }
}
