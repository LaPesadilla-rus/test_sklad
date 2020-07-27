import React, {Component} from 'react';
import './otdMain.css';
import UnicId from 'react-html-id';

import OtdMols2 from './otdMols2';
//import OtdEquips from './otdEquips';
import OtdEquips2 from './otdEquips2';
import ModalMove from './modal/modalMove';
import ModalAct from './modal/modalAct';

import Act1423 from './modal/act/act1423';
import Act1427 from './modal/act/act1427';
import Act1429 from './modal/act/act1429';
import Act1425 from './modal/act/act1425';
import Act1431 from './modal/act/act1431';
import Act1433 from './modal/act/act1433'


export default class OtdBlock2 extends Component{
    constructor() {
        super();
        UnicId.enableUniqueIds(this);
        this.state = {
            isModalMoveOpen: false,
            isModalActOpen: false,
            isAct1423Open: false,
            isAct1425Open: false,
            isAct1427Open: false,
            isAct1429Open: false,
            isAct1431Open: false,
            isAct1433Open: false,
            selEquip: [],
            act_data: [],
            osn_equip: [],
            dop_equip: [],
        }
    }

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

    changeAct1429 = () =>{
        this.setState(state => ({ isAct1429Open: !state.isAct1429Open}));
        this.sortDopOsn();
    }

    changeAct1423 = () => {
        this.setState(state => ({ isAct1423Open: !state.isAct1423Open}));
        this.sortDopOsn();
    }

    changeAct1425 = () => {
        this.setState(state => ({ isAct1425Open: !state.isAct1425Open}));
        this.sortDopOsn();
    }
    changeAct1431 = () =>{
        this.setState(state => ({ isAct1431Open: !state.isAct1431Open}));
        this.sortDopOsn();
    }
    changeAct1433 = () =>{
        this.setState(state => ({ isAct1433Open: !state.isAct1433Open}));
        this.sortDopOsn();
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
        this.setState({
            selEquip: val,
        });
        this.changeModalMove();
    }
    
    onReboot = () => {
        this.props.onReboot();
    }

    onClickAct = (reg) => {
        if (reg === '1'){
            this.changeAct1423();
        }
        if (reg === '2'){
            this.changeAct1425();
        }
        if (reg === '3'){
            this.changeAct1427();
        }
        if (reg === '4'){
            this.changeAct1429();
        }
        if (reg === '5'){
            this.changeAct1431();
        }
        if (reg === '6'){
            this.changeAct1433();
        }
    }
            
    render() {
        return (
            <div className='otdel_main'>
                <p>Отеделение: {this.props.row.ot_name}</p>
                <table className='otd_table'>
                    <thead>
                        <tr>
                            <th>МОЛ</th>
                            <th>Инв. ном</th>
                            <th>Наименование</th>
                            <th>Наименование по бух.уч.</th>
                            <th>Ед. изм.</th>
                            <th>Кол-во</th>
                            <th>Примечание</th>
                            <th>Кнопка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.row.otd_equip.length > 0 ? this.props.row.otd_equip.map(row => <OtdEquips2 key={this.nextUniqueId()}
                                                                                                                mol='Временно' 
                                                                                                                row={row}
                                                                                                                data={this.props.data}
                                                                                                                clickEquip={this.clickEquip}
                                                                                                                reg='1'/>)
                                                        : null}
                                                        
                                                        
                                                        {this.props.row.mol_data.map(row => <OtdMols2 key={this.nextUniqueId()} 
                                                                 mol_name={row.mo_name} 
                                                                 row={row} 
                                                                 data={this.props.data}
                                                                 clickEquip={this.clickEquip}
                                                                 clickAct={this.changeModalAct}
                                                                 onReboot={this.props.onReboot} />)}
                    </tbody>
                </table>
                
                <div className='otdel_workspace'>
                        
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
                {this.state.isAct1429Open &&
                    <Act1429 key={this.nextUniqueId()}
                                onClose={this.changeAct1429}
                                modalActClose={this.changeModalAct}
                                onReboot={this.props.onReboot}
                                row={this.state.act_data}
                                actUser='Admin'
                                data={this.props.row}
                                osn_equip={this.state.osn_equip}
                                dop_equip={this.state.dop_equip} />
                }
                {this.state.isAct1425Open &&
                    <Act1425 key={this.nextUniqueId()}
                                onClose={this.changeAct1425}
                                modalActClose={this.changeModalAct}
                                onReboot={this.props.onReboot}
                                row={this.state.act_data}
                                actUser='Admin'
                                data={this.props.row}
                                osn_equip={this.state.osn_equip}
                                dop_equip={this.state.dop_equip} />
                }
                {this.state.isAct1431Open &&
                    <Act1431 key={this.nextUniqueId()}
                                onClose={this.changeAct1431}
                                modalActClose={this.changeModalAct}
                                onReboot={this.props.onReboot}
                                row={this.state.act_data}
                                actUser='Admin'
                                data={this.props.row}
                                osn_equip={this.state.osn_equip}
                                dop_equip={this.state.dop_equip} />
                }
                 {this.state.isAct1433Open &&
                    <Act1433 key={this.nextUniqueId()}
                                onClose={this.changeAct1433}
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

