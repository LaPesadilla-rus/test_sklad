import React, {Component} from 'react';
import './relationWatch.css';

export default class RelationWatchBlock extends Component {

    render(){
        return(
           <div className='relation_block'>
               <div className='osn_relation'>
                    {(this.props.osn_name) && <div className='button'>{this.props.osn_name}</div>}
               </div>
               <div className='dop_relation'>
                    {this.props.data.map(row => <div className='button button_yellow' key={row.re_id}>{row.equip_name}</div>)}
               </div>
           </div>
        )
    }
}