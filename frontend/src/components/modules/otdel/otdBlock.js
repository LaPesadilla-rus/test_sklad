import React, {Component} from 'react';
import './otdMain.css';
import UnicId from 'react-html-id';

import OtdMols from './otdMols';
import OtdEquips from './otdEquips';
import ModalMove from './modal/modalMove';
import ModalAct from './modal/modalAct';
import Act1423 from './modal/act/act1423';


export default class OtdBlock extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.mol_arr = [];
        this.state = {
            mol_arr: [],
            arr_out: [],
            isModalMoveOpen: false,
            isModalActOpen: false,
            isAct1423Open: false,
            bl_id: '',
            selEquip: [],
            act_data: [],
        }
    }

    componentDidMount = () => {
        var id = this.props.row.bl_otd_id;
        var arr = [];
        var arr_out = [];
        console.log(this.props.row)
        /*this.props.mol_data.forEach(element => {
            if(id === element.mo_otd_id && element.bl_otd_id === element.mo_otd_id){
                arr.push(element) ;  
            }
        });
        this.props.data.forEach(element =>{
            //console.log(element);
            if (element.bl_otd_id !== element.mol_otd && element.bl_otd_id === id){
                arr_out.push(element)
            }
        })
        this.setState({
            mol_arr: arr,
            arr_out: arr_out
        });*/
    }

    changeModalMove = () =>{
        this.setState(state => ({ isModalMoveOpen: !state.isModalMoveOpen}))
    }

    changeModalAct = (row) =>{
        this.setState(state => ({ isModalActOpen: !state.isModalActOpen}));
        this.setState({act_data: row})
    }

    changeAct1423 = () => {
        this.setState(state => ({ isAct1423Open: !state.isAct1423Open}));
        var mol_id = this.state.act_data.bl_mol_id;
        var otd_id = this.state.act_data.bl_otd_id;
        var id = this.state.act_data.bl_id;
        this.props.data.forEach(row => {
            if (row.bl_otd_id === otd_id && row.bl_mol_id === mol_id && row.bl_id !== id){
                console.log(row)
            }
        })
    }

    clickEquip = (val) => {
        this.props.data.forEach(element => {
            if(element.bl_id === val){
                this.setState({
                    selEquip: element,
                    bl_id: val,
                });
            }
        })
        this.changeModalMove();
    }
    
    onReboot = () => {
        this.props.onReboot();
    }
            
    render() {
        return (
            <div className='otdel_main'>
                <p>Отеделение: {this.props.row.ot_name}</p>
                {this.props.row.otd_equip.length > 0 ? <div className='otdel_workspace'>
                                                        <div className='otdel_workspace_mol'>
                                                            <div className='mol_column'>
                                                                <button className='button button_red'>Не закреплено</button>
                                                            </div>
                                                            <div className='otdel_workspace_equip'>
                                                                {this.props.row.otd_equip.map(row => <OtdEquips key={this.nextUniqueId()} 
                                                                                                            row={row}
                                                                                                            clickEquip={this.clickEquip}/>)}
                                                            </div>
                                                        </div>
                                                </div> 
                                                : ''}
                
                <div className='otdel_workspace'>
                        { this.state.mol_arr.map(row => <OtdMols key={this.nextUniqueId()} 
                                                                 mol_name={row.mo_name} 
                                                                 row={row} 
                                                                 data={this.props.data}
                                                                 clickEquip={this.clickEquip}
                                                                 clickAct={this.changeModalAct} />)}
                </div>
                {this.state.isModalMoveOpen &&
                    <ModalMove key={this.nextUniqueId()} 
                                onClose={this.changeModalMove} 
                                onReboot={this.onReboot} 
                                bl_id={this.state.bl_id}
                                row={this.state.selEquip}
                                oldOtd={this.props.row.ot_name}
                                separ_data={this.props.separ_data}/>
                }

                {this.state.isModalActOpen &&
                    <ModalAct key={this.nextUniqueId()} 
                                onClose={this.changeModalAct} 
                                onClickAct={this.changeAct1423}/>
                }
                {this.state.isAct1423Open &&
                    <Act1423 key={this.nextUniqueId()}
                                onClose={this.changeAct1423}
                                data={this.state.act_data} />
                }
            </div>
        );
    }
}

