import React from 'react';
import {connect} from 'react-redux';

import { setKatText, setTypeText, setMarkaText, setModelText} from '../../../../store/relation/action';
import Relation from './relation';

class RelationContainer extends React.Component {
    render (){
        return(
            <Relation kat={this.props.kat} type={this.props.type} marka={this.props.marka} model={this.props.model} 
            setKatText={this.props.setKatText}  setTypeText={this.props.setTypeText} setMarkaText={this.props.setMarkaText} setModelText={this.props.setModelText}
            onClose={this.props.onClose}/>
        )
    }
}

const pushStateToProps = (state) => {
    return{
        kat: state.relation.kat,
        type: state.relation.type,
        marka: state.relation.marka,
        model: state.relation.model,
    };
};

const pushDispatchToProps = {
    setKatText,
    setTypeText,
    setMarkaText,
    setModelText
};

export default connect(pushStateToProps, pushDispatchToProps)(RelationContainer);