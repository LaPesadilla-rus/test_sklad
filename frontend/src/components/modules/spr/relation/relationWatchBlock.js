import React, {Component} from 'react';
import './relationWatch.css';

export default class RelationWatchBlock extends Component {

    render(){
        return(
           <div className='relation_block'>
               <div className='osn_relation'>
                    <button>{this.props.osn_name}</button>
               </div>
               <div className='dop_relation'>
                    {this.props.data.map(row => <button key={row.re_id}>{row.dop_name}</button>)}
               </div>
           </div>
        )
    }
}