import React, {Component} from 'react';
import './otdMain.css';
import UnicId from 'react-html-id';

import OtdEquips from './otdEquips';
import OtdEquipsDisable from './otdEquipDisable'

export default class OtdMols extends Component{
    constructor(){
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            equip_arr: [],
            out_arr: [],
        }
    }

    componentDidMount = () => {
        var arr = [];
        var out_arr = [];
        var id = this.props.row.bl_mol_id
        this.props.data.forEach(element => {
            if(element.bl_mol_id === id && element.bl_otd_id === element.mol_otd){
                //console.log(element)
                arr.push(element)
            }
            if (element.bl_mol_id === id && element.bl_otd_id !== element.mol_otd){
                out_arr.push(element);
            }
            /*if (element.bl_mol_id === id ){
                out_arr.push(element);
                console.log(element)
            }*/
        })
        this.setState({
            equip_arr: arr,
            out_arr: out_arr,
        })
    }

    changeModalAct = (e) => {
        console.log('act')
        //this.props.changeModalAct();
    }

    render() {
        return (
            <div className='otdel_workspace_mol'>
                <div className='mol_column'>
                    <button className='button'>{this.props.mol_name}</button>
                </div>
                <div className='otdel_workspace_equip'>
                    {(this.state.out_arr.length > 0) ? this.state.out_arr.map(row => <OtdEquipsDisable key={this.nextUniqueId()} 
                                                                row={row} />)
                                                            : ''}
                    {this.state.equip_arr.map(row => <OtdEquips key={this.nextUniqueId()} 
                                                                row={row}
                                                                clickEquip={this.props.clickEquip}
                                                                clickAct={this.props.clickAct} />)}
                </div>
                
                
            </div>   
        );
    }
}

