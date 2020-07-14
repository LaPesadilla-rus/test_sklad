import React, {Component} from 'react';
import './otdMain.css';
import UnicId from 'react-html-id';

import OtdEquips2 from './otdEquips2';
import OtdEquipsDisable2 from './otdEquipDisable2'

export default class OtdMols2 extends Component{
    constructor(){
        super();
        UnicId.enableUniqueIds(this);
    }


    render() {
       
        return (
            <React.Fragment>
                {(this.props.row.out_equip.length > 0) ? this.props.row.out_equip.map(row => <OtdEquipsDisable2 key={this.nextUniqueId()} 
                                                                                                                mol={this.props.mol_name}
                                                                                                                row={row} />)
                                                        : null}
                {this.props.row.equip_data.map(row => <OtdEquips2 key={this.nextUniqueId()}
                                                            mol={this.props.mol_name} 
                                                            row={row}
                                                            clickEquip={this.props.clickEquip}
                                                            clickAct={this.props.clickAct}
                                                            onReboot={this.props.onReboot} />)}
            </React.Fragment>  
        );
    }
}

