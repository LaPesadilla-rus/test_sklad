import React from 'react';
import './modalInfo.css';
import { connect } from 'react-redux';

import { setMessageHide} from '../../../store/message/actions';

class ModalInfo extends React.Component {
	componentDidMount = () => {
		setTimeout(() => {
			this.props.setMessageHide()	
			 }, 2000);
	}

	render (){
		return (
		<div className={'modalWindow '+ ((this.props.messageStore.color === 0) ? 'styles_r' : 'styles_gr')}>
			<label> {this.props.messageStore.txt}</label>
		</div>
	  );
	}
}

const pushDispatchToProps = {
	setMessageHide
};

export default connect(
    state => ({
        messageStore: state.message
    }),
    pushDispatchToProps
)(ModalInfo)