import React, {Component} from 'react';
import './otdMain.css';
import UnicId from 'react-html-id';

import OtdMols from './otdMols';
import OtdEquips from './otdEquips';
import ModalMove from './modal/modalMove';
import ModalAct from './modal/modalAct';

import Act1423 from './modal/act/act1423';
import Act1427 from './modal/act/act1427';


export default class OtdBlock extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            isModalMoveOpen: false,
            isModalActOpen: false,
            isAct1423Open: false,
            isAct1427Open: false,
            selEquip: [],
            act_data: [],
            osn_equip: [],
            dop_equip: [],
        }
    }

    /*componentDidMount = () => {
        console.log(this.props.row)
    }*/

    changeModalMove = () =>{
        this.setState(state => ({ isModalMoveOpen: !state.isModalMoveOpen}))
    }

    changeModalAct = (row) =>{
        this.setState(state => ({ isModalActOpen: !state.isModalActOpen}));
        this.setState({act_data: row})
    }

    changeAct1427 = () =>{
        this.setState(state => ({ isAct1427Open: !state.isAct1427Open}));
        this.sortDopOsn();

    }

    changeAct1423 = () => {
        this.setState(state => ({ isAct1423Open: !state.isAct1423Open}));
        this.sortDopOsn();
        /*var mol_id = this.state.act_data.bl_mol_id;
        var otd_id = this.state.act_data.bl_otd_id;
        var id = this.state.act_data.bl_id;*/
        /*this.props.data.forEach(row => {
            if (row.bl_otd_id === otd_id && row.bl_mol_id === mol_id && row.bl_id !== id){
                console.log(row)
            }
        })*/
    }

    sortDopOsn = () => {
        var osn_equip = [];
        var dop_equip = [];
        this.props.row.otd_equip.map(row => {
            if (row.eq_kat_id === 0 && row.bl_id !== this.state.act_data.bl_id){
                osn_equip.push(row);
            }
            if (row.eq_kat_id === 1 && row.bl_id !== this.state.act_data.bl_id){
                dop_equip.push(row);
            }
            return 0;
        });
        this.props.row.mol_data.map( row => {
            if (row.mo_id === this.state.act_data.bl_mol_id){
                row.equip_data.map(id => {
                    if (id.eq_kat_id === 0 && id.bl_id !== this.state.act_data.bl_id){
                        osn_equip.push(id);
                    }
                    if (id.eq_kat_id === 1 && id.bl_id !== this.state.act_data.bl_id){
                        dop_equip.push(id);
                    }
                    return 0;
                })
            }
            return 0;
        })
        this.setState({
            osn_equip: osn_equip,
            dop_equip: dop_equip
        })
    }

    clickEquip = (val) => {
        //console.log(val)
        this.setState({
            selEquip: val,
        });
        /*this.props.data.forEach(element => {
            if(element.bl_id === val){
                this.setState({
                    selEquip: element,
                    bl_id: val,
                });
            }
        })*/
        this.changeModalMove();
    }
    
    onReboot = () => {
        this.props.onReboot();
    }

    onClickAct = (reg) => {
        if (reg === '1'){
            this.changeAct1423();
        }
        if (reg === '3'){
            this.changeAct1427();
        }
    }
            
    render() {
        return (
            <div className='otdel_main'>
                <p>Отеделение: {this.props.row.ot_name}</p>
                {this.props.row.otd_equip.length > 0 ? <div className='otdel_workspace'>
                                                        <div className='otdel_workspace_mol'>
                                                            <div className='mol_column'>
                                                                <button className='button button_red'>Временно</button>
                                                            </div>
                                                            <div className='otdel_workspace_equip'>
                                                                {this.props.row.otd_equip.map(row => <OtdEquips key={this.nextUniqueId()} 
                                                                                                            row={row}
                                                                                                            data={this.props.data}
                                                                                                            clickEquip={this.clickEquip}
                                                                                                            reg='1'/>)}
                                                            </div>
                                                        </div>
                                                </div> 
                                                : ''}
                
                <div className='otdel_workspace'>
                        { this.props.row.mol_data.map(row => <OtdMols key={this.nextUniqueId()} 
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
                                row={this.state.selEquip}
                                data={this.props.data}/>
                }

                {this.state.isModalActOpen &&
                    <ModalAct key={this.nextUniqueId()} 
                                onClose={this.changeModalAct} 
                                onClickAct={this.onClickAct}
                                data={this.state.act_data}/>
                }
                {this.state.isAct1423Open &&
                    <Act1423 key={this.nextUniqueId()}
                                onClose={this.changeAct1423}
                                modalActClose={this.changeModalAct}
                                onReboot={this.props.onReboot}
                                row={this.state.act_data}
                                actUser='Admin'
                                data={this.props.row}
                                osn_equip={this.state.osn_equip}
                                dop_equip={this.state.dop_equip} />
                }
                {this.state.isAct1427Open &&
                    <Act1427 key={this.nextUniqueId()}
                                onClose={this.changeAct1427}
                                modalActClose={this.changeModalAct}
                                onReboot={this.props.onReboot}
                                row={this.state.act_data}
                                actUser='Admin'
                                data={this.props.row}
                                osn_equip={this.state.osn_equip}
                                dop_equip={this.state.dop_equip} />
                }
            </div>
        );
    }
}

