import React, {Component} from 'react';
import './relation.css';
import UnicId from 'react-html-id';
import axio from 'axios';

export default class RelationWatch extends Component {
    constructor (props){
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
        }
    }

    componentDidMount = () =>{
        var data = {};
        /*axio.get('/sklad/kat').then(res=>{
            this.setState({
                kat_data: res.data,
            })
        });*/

    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}