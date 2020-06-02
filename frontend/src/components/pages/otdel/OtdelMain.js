import React, {Component} from 'react';
import './OtdelMain.css';
import axio from 'axios';

export default class OtdelMain extends Component{
    constructor() {
        super();
        this.table = {
            otdel_data: [],
        }
        this.state = {
        };
    }

    componentDidMount = () => {
        axio.get('/otdel/all').then(res=>{
            //console.log(res.data);
            this.setState({
                otdel_data: res.data
            });
        });
    }
            

    render() {
        return (
            <div className='otdel_main'>
                <p>Отеделение: </p>
                <div className='otdel_workspace'>
                    <div>
                        <button className='button'>MOL1</button>
                    </div>
                    <div className='otdel_workspace_equip'>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP1</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP2</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP3</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP4</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP5</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                    </div>
                </div>
                <div className='otdel_workspace'>
                    <div>
                        <button className='button'>MOL1</button>
                    </div>
                    <div className='otdel_workspace_equip'>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP1</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP2</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP3</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP4</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                        <div className='combo_div'>
                            <div className='button button_green '>EQUIP5</div>
                            <div className='button button_yellow'>Списать</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

