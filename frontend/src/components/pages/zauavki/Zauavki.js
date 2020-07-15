import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Zauavki_main from '../../modules/zayavki/Zauavki_main'

export default class Zauavki extends Component {
    render(){
        return (
            <React.Fragment>
                {<Route path='/reports/all' component={Zauavki_main}/>}
               
            </React.Fragment>
    );
    }
    
}

//export default Data_Block;





