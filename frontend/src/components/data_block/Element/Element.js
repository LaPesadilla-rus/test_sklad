import React, {Component} from 'react';
import './Element.css';
import {NavLink} from 'react-router-dom';


function Element () {
    return (
        <div className="Element">
            <div>
                <p>Название элемента </p>
                <p>Тип элемента </p>
                <p>Производитель </p>
                <p>Дата ввода </p>
            </div>
            <div>
                <p><input></input> </p>
                <p>
                    <select id="elem_type">
                        <option value="1">Оперативная память</option>
                        <option value="2">Жесткий диск</option>   
                    </select> 
                </p>
                <p>
                    <select id="fact_name">
                        <option value="1">Производитель 1</option>
                        <option value="2">Производитель 2</option>
                    </select> 
                </p>
                <p><input type="date"></input> </p>
            </div>
        </div>
    );
}

export default Element;

/*
            <p>Название элемента <input></input></p>
            <p>Тип элемента <input></input></p>
            <p>Производитель <input></input></p>
            <p>Дата ввода <input></input></p>

*/