import React, {Component} from 'react';
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
    }
    exitButton = () =>{
        this.props.setAuthorize(false);
        localStorage.clear();
        this.props.setUserId('');
        this.props.setAt('');
        this.props.setRt('');
        axio.get('/auth/out').then(res=>{
            console.log(res)
        });
    }
    render (){
        return (
            <div ref={this.wrapperRef} className="left_menu_back">
                {<div ref={this.vvRef} className="left_menu">
                        <p>{(this.state.show ===false)? 'Меню' : null}</p>
                        <NavLink className='button_block' activeClassName="act" to="/sklad/all">
                            <MdAssignment />
                            <label>{(this.state.show ===false)? 'Склад': ''}</label>
                        </NavLink> 
                        <NavLink className='button_block'  activeClassName="act" to="/otdel">
                            <MdPersonPin />
                            <label>{(this.state.show ===false)?'Отделение': ''}</label>
                        </NavLink>
                        <NavLink className='button_block'   activeClassName="act" to="/zurnal">
                            <MdFilterFrames/>
                            <label>{(this.state.show ===false)? 'Журналы' : ''}</label>
                        </NavLink>
                        <NavLink className='button_block'  activeClassName="act" to="/reports/all">
                            <MdDvr/>
                            <label>{(this.state.show ===false)? 'Заявки': ''}</label>
                        </NavLink> 
                        <NavLink className='button_block'  onClick={this.exitButton} to="/">
                        <MdExitToApp  /><label>{(this.state.show ===false)?'Выход':''}</label>
                        </NavLink>
                        <div className='button_block down_button_block' onClick={() => this.onClick()} >
                            <MdCompareArrows/><label>{(this.state.show ===false)?'Свернуть':''}</label>
                        </div>
                </div>}
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