import React, {Component, createRef} from 'react';
import { NavLink } from 'react-router-dom';
import './l_menu.css';
import { MdAssignment, MdPersonPin, MdDvr, MdExitToApp, MdFilterFrames,MdCompareArrows } from "react-icons/md";
import axio from 'axios';

export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
        this.wrapperRef = React.createRef();
        this.vvRef = React.createRef();
    }
    onClick() {
        const wrapper = this.wrapperRef.current;
        const vv = this.vvRef.current;
        wrapper.classList.toggle('is-open');
        vv.classList.toggle('is-open');
        this.setState({show: !this.state.show})
    

        //button_block.classList.toggle('small');
    }
    exitButton = () =>{
        this.props.setAuthorize(false);
        /*localStorage.setItem('user', '');
        localStorage.setItem('at', '');
        localStorage.setItem('rt', '');*/
        localStorage.clear();
        this.props.setUserId('');
        this.props.setAt('');
        this.props.setRt('');
        axio.get('/auth/out').then(res=>{
            console.log(res)
        });
    }
    render (){
        return (<div ref={this.wrapperRef} className="wrapper">
            <div ref={this.vvRef} className="vv">
                    <p>Меню</p>
                    <NavLink  className={(this.state.show ===false)?'button_block' : 'button_block_new' } activeClassName="act" to="/sklad/all">
                        <MdAssignment />
                        {(this.state.show ===false)?<label>Склад</label> : <label></label> }
                    </NavLink> 
                    <NavLink  className={(this.state.show ===false)?'button_block' : 'button_block_new' }  activeClassName="act" to="/otdel">
                        <MdPersonPin />
                        {(this.state.show ===false)?<label>Отделение</label> : <label></label> }
                    </NavLink>
                    <NavLink className={(this.state.show ===false)?'button_block' : 'button_block_new' }   activeClassName="act" to="/zurnal">
                        <MdFilterFrames/>{(this.state.show ===false)?<label>Журналы</label> : <label></label> }
                    </NavLink>
                    <NavLink className={(this.state.show ===false)?'button_block' : 'button_block_new' }  activeClassName="act" to="/reports/all">
                        <MdDvr/>{(this.state.show ===false)?<label>Заявки</label> : <label></label> }
                    </NavLink> 
                    <NavLink className={(this.state.show ===false)?'button_block' : 'button_block_new' }  onClick={this.exitButton} to="/">
                    <MdExitToApp  />{(this.state.show ===false)?<label>Выход</label> : <label></label> }
                    </NavLink>
                    <div className={(this.state.show ===false)?'button_block' : 'button_block_new' }onClick={() => this.onClick()} >
                        <MdCompareArrows/>{(this.state.show ===false)?<label>Свернуть</label> : <label></label> } </div>
                    </div>
            </div>
        );
    }
}

/*
                <div className="button_block">
                    <NavLink to='/sklad'>Склад</NavLink>
                </div> 
                <div className="button_block" to="/reports">
                    <NavLink to='/reports'>Заявки</NavLink>
                </div> 
*/