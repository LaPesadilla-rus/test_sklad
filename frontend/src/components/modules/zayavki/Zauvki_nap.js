import React, {Component} from 'react';
import axio from 'axios';
export default class Zauvki_nap extends React.Component {
    
    
    onClick = () => {
        this.props.Look();
    }
    componentDidMount(){
        axio.get('/zauvki/all_zauvki').then(res=>{
            console.log(res.data)
            this.setState({
               
            
            });
        });  
    }

	render (){ 
    return ( <tr width='100%' className='oi' onClick={this.onClick}> 
    <td>1</td>
    <td>gg</td>
    <td>asfd</td>
    <td>fg</td>
    <td>cv</td>
    <td>yhuk</td>

    </tr> );}




}