import React, {Component} from 'react';
import './data_block.css';
//import Users from './components/Users.js';
//import Users from '../Users.js'
import {NavLink} from 'react-router-dom';

const BlockItem = (props) => {
    let path = './edit/block/' + props.id;

return <NavLink className="Block" to={path}>{props.name}</NavLink>
}

function Data (props) {
    return (
        <div className="Data">
            <BlockItem name="BLOCK1" id="1"/>
            <BlockItem name="BLOCK2" id="2"/>
            <BlockItem name="BLOCK3" id="3"/>
            <BlockItem name="BLOCK4" id="4"/>
            <BlockItem name="BLOCK5" id="5"/>
        </div>
    );
}

export default Data;