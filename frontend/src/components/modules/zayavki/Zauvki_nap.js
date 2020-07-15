import React, {Component} from 'react';

export default class Zauvki_nap extends React.Component {
   
    onClick = () => {
        this.props.Look();
    }

	render (){ 
    return ( <tr className='oi' onClick={this.onClick}> 
    <td>gg</td>
    <td>asfd</td>
    <td>fg</td>
    <td>cv</td>
    <td>yhuk</td>

    </tr> );}




}