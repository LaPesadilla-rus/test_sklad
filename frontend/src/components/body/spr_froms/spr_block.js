import React, {Component} from 'react';
import './spr_block.css';
import {NavLink, Link} from 'react-router-dom';
import axio from 'axios';
import UnicId from 'react-html-id';
import Spr_item from './spr_item/spr_item.js';

var un = 0;

/*const BlockItem = (props) => {
    let path = '/spr/all/' + props.hrf;
    return <div className="spr_block_data_item" >
        <NavLink className="spr_block_nav"  to={{
                pathname: path,
                state: { item: props.item,
                            name: props.name }
            }} >{props.item}
        </NavLink>
      </div>
}*/

const ButtonRef =(props) => {
    //console.log(props.item);
    let path = '/spr/all/' + props.hrf;
    return <div className="spr_block_data_item" >
                <NavLink className="spr_block_nav" to={{pathname: '/spr/all/redact', state: { reb: props.reb, name: props.name, table: props.table, item: props.item, id_item:props.id_item}}}>
                    {props.item}
                </NavLink>
            </div>
}

const BlockItem2 = (props) => {
    let path = './spr/' + props.hrf;
    return <div className='spr_block spr_block_pos'>
                <div className='spr_block_heder'>{props.name}</div>
                <NavLink className="data-table__body data-table__body_pos" to={{pathname: '/spr/all/redact', state: {name: props.name, table: props.table}}}>+</NavLink>
                <div className='spr_block_data'>
                    
                    {props.items.map((id , index) => <ButtonRef key={ukey(props.table)} act={props.act} 
                        reb={props.reb} table={props.table} hrf='redact' name={props.name} id_item={id.id} item={id.item} />)}
                    
                </div>
            </div>
}

function ukey (name){
    un++;
    return (name + '_' + un);
}

export default class Spr_block extends Component {
    constructor(props) {
        super(props);
        this.ShowBlock2 = this.ShowBlock2.bind(this);
        UnicId.enableUniqueIds(this);
        this.state = {
            main: [],
            units: [],
            kat: [],
            show_block: 'hide',
            name: '',
            table: '',
            item: '',
            id_item: '',
            reb: this.RebootData(),
        
        };
    }

    RebootData = () => {
        axio.get('./all').then(res=>{
            this.setState({
                main:  res.data,
            });
        });
    }

    componentDidMount = () => {
        axio.get('./all').then(res=>{
            this.setState({
                main:  res.data,
            });
            //console.log(this.state.main);
            /*this.state.main.map((idx, index )=> 
                    {console.log('--')
                    idx.item.map(k => console.log(k))}
                );*/
        });    
    }

    ShowBlock = (item1,name1,table1,id_item1) => {
        this.setState({
            show_block: 'show',
            item: item1
        })
        console.log(name1)
    }

    ShowBlock2(item1,name1,table1,id_table1) {
        this.setState({
            show_block: 'show',
            item: item1
        })
        console.log(this.state)
    }

    HideBlock = () => {
        this.setState({
            show_block: 'hdden'
        })
        this.RebootData();
    }

    render(props){
        /*if (this.props.location.state.reboot){
            if (!this.state.reboot == 'reboot'){
                this.setState({
                    reboot: this.props.location.state.reboot
                });
            }
        }*/
        //console.log(this.props.location.state.reboot);

        let modal_window;
        //console.log(this.props.show_block);
        if (this.state.show_block === 'show'){
            modal_window = <Spr_item items='test_item' name={this.state.name} table={this.state.table} onVisibleChange={this.HideBlock} onSave={this.RebootData} />
        }
        
        return(
            <div className='spr_block_main'>
                <button onClick={this.ShowBlock} name='aaaaa'>asdasd</button>
                {this.state.main.map((id, index )=> 
                   <BlockItem2 key={this.nextUniqueId()} reb={this.reb} act={this.ShowBlock2} ukey= {this.lastUniqueId()} name={id.name} table={id.table} hrf = 'redact' items={id.item} />)}
                )} 
                {modal_window}
            </div>
        )
    }          
}


/*              <div className='spr_block spr_block_pos'>
                    <div className='spr_block_heder'>Ед. измерения</div>
                    <NavLink className="data-table__body data-table__body_pos"  to={{pathname: '/spr/all/redact',state: { name: 'Ед. измерения' }}} >+</NavLink>
                    <div className='spr_block_data'>
                        {this.state.units.map( id => <BlockItem key={this.nextUniqueId()} name='Ед. Измерения' hrf = 'redact' item={id.un_name} />)}
                    </div>
                </div>
                <div className='spr_block spr_block_pos'>
                    <div className='spr_block_heder'>Категории</div>
                    <NavLink className="data-table__body data-table__body_pos"to={{pathname: '/spr/all/redact',state: { name: 'Категория' }}} >+</NavLink>
                    <div className='spr_block_data'>
                        {this.state.kat.map( id => <BlockItem key={this.nextUniqueId()} name='Категория' hrf = 'redact' item={id.kat_name} />)}
                    </div>
                </div>*/ 