import React from 'react';
import './modalInfo.css';
import { connect } from 'react-redux';

import { setMessageHide} from '../../../store/message/actions';

class ModalInfo extends React.Component {
	constructor(){
		super();
		this.state = {
			act: false
		}
	}
	componentDidMount = () => {
		
		setTimeout(() => {
			this.setState({
				act: true
			});	
			 }, 200);
		setTimeout(() => {
			this.props.setMessageHide()	
			 }, 4000);
	}

	render (){
		let color = ''
		switch(this.props.messageStore.color){
			case 0: color = 'styles_r'; break;
			case 1: color = 'styles_gr'; break;
			case 2: color = 'styles_bl'; break;
			default: color = 'styles_gr';
		}
		return (
		<div className={ color +` modalWindow ` + ((this.state.act) ? ` modalWindow_move `: null)  }>
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