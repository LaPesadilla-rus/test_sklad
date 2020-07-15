import React from 'react';
import './loader.css';

const Loader = () => {

        return (
                <div className='background_modal_loader background_modal_loader_pos loader'>
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
        );
    
}

export default Loader;

