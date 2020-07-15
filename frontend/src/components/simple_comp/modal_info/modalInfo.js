import React from 'react';
import './modalInfo.css';
import { connect } from 'react-redux';

class ModalInfo extends React.Component {
	componentDidMount = () => {
		/*setTimeout(() => {
			this.props.showMessage()	
			 }, 3000);*/
	}

	render (){
		return (
		<div className={'modalWindow '+ ((this.props.messageStore.color === 0) ? 'styles_r' : 'styles_gr')}>
			<label> {this.props.messageStore.txt}</label>
		</div>
	  );
	}
}

export default connect(
    state => ({
        messageStore: state.message
    }),
    dispatch => ({
        testDispatch: dispatch
    }),

)(ModalInfo)