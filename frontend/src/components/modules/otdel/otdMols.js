import React, {Component} from 'react';
import './otdMain.css';
import UnicId from 'react-html-id';

import OtdEquips from './otdEquips';
import OtdEquipsDisable from './otdEquipDisable'

export default class OtdMols extends Component{
    constructor(){
        super();
        UnicId.enableUniqueIds(this);
    }


    render() {
        return (
            <div className='otdel_workspace_mol'>
                <div className='mol_column'>
                    <button className='button'>{this.props.mol_name}</button>
                </div>
                <div className='otdel_workspace_equip'>
                    {(this.props.row.out_equip.length > 0) ? this.props.row.out_equip.map(row => <OtdEquipsDisable key={this.nextUniqueId()} 
                                                                row={row} />)
                                                            : ''}
                    {this.props.row.equip_data.map(row => <OtdEquips key={this.nextUniqueId()} 
                                                                row={row}
                                                                clickEquip={this.props.clickEquip}
                                                                clickAct={this.props.clickAct} />)}
                </div>
                
                
            </div>   
        );
    }
}

