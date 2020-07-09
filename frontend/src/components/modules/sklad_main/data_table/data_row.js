import React, {Component} from 'react';
import './data_table.css';




/*const Data_row = (props) => {
    let path = './edit/' + props.id;
    return <div><NavLink className="data-table__body data-table__body_pos"  to={path} ><tr>
            <td className='data-table__cell data-table__cell_pos cell_1'>{props.kat}</td> 
            <td className='data-table__cell data-table__cell_pos cell_2'>{props.kod}</td> 
            <td className='data-table__cell data-table__cell_pos cell_3'>{props.name}</td>
            <td className='data-table__cell data-table__cell_pos cell_4'>{props.units}</td>
            <td className='data-table__cell data-table__cell_pos cell_5'>{props.kol}</td>
            <td className='data-table__cell data-table__cell_pos cell_6'>{props.prim}</td>
        </tr></NavLink></div>
}*/

export default class DataRow extends Component{
    constructor(){
        super();
        this.state = {
            isEditOpen: false,
        }
    }

    editEquip = () =>{
        //console.log('edit' + this.props.id)
        this.props.changeEdit(this.props.row);
    }

    render() {
        //console.log(this.props.row)
        var color_sreds= false;
        var color_kart = false
        if (this.props.row.kat_name === 'Основные средства'){
            color_sreds = true;
        }
        if (this.props.row.kat_name === 'Картриджи'){
            color_kart = true;
        }
        return (
                <tr onClick={this.editEquip} className= {'sklad_table_row '+(color_sreds ? 'kat_osn' : '') + (color_kart ? 'kat_kartr' : '' )}>
                    <td className='sklad_table_cell'>{this.props.row.kat_name}</td> 
                    <td className='sklad_table_cell'>{this.props.row.st_inv_num}</td> 
                    <td className='sklad_table_cell cell_left'>{this.props.row.equip_name}</td>
                    <td className='sklad_table_cell cell_left'>{this.props.row.st_buh_name}</td>
                    <td className='sklad_table_cell'>{this.props.row.un_name}</td>
                    <td className='sklad_table_cell'>{this.props.row.st_amount}</td>
                    <td className='sklad_table_cell cell_left'>{this.props.row.st_prim}</td>
                </tr>
                
        );
    }
}

/**
 * <tr className={"data-table__row data-table__row_pos " + (color_sreds ? 'kat_osn' : '') + (color_kart ? 'kat_kartr' : '')}>
 */
