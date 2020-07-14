import React, {Component}  from 'react';
import './loader.css';

export default class Loader extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render () {
        return (
                <div className='background_modal background_modal_pos loader'>

                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
        );
    }
}
