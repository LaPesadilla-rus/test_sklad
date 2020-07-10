import React from 'react';
import './modalInfo.css';


export default class ModalInfo extends React.Component {
	componentDidMount (){
		setTimeout(() => {
			this.props.showMessage()	
			 }, 3000);
	}

	render (){
		return (
		<div className={'modalWindow '+ ((this.props.color === 0) ? 'styles_r' : 'styles_gr')}>
			<label> {this.props.txt}</label>
		</div>
	  );
	}
}