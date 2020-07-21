import React, {Component} from 'react';
import './spr_block.css';
import axio from 'axios';
import UnicId from 'react-html-id';
import TableBlock from './table_block.js';
import Relation from './relation/relationContainer';
import RelationWatch from './relation/relationWatch'
import SprButton from './spr_button_spr';
import NewUser from './new_user/new_user';
import { connect } from 'react-redux';
import { setLoaderShow, setLoaderHide } from '../../.././store/loader/actions';

/*import CryptoJS from 'crypto-js';
import config from '../../../config/config';*/

class Spr_block extends Component {
    constructor(props) {
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            main: [],
            isModalOpen: false,
            isRelationOpen: false,
            isWatchRelation: false,
            isNewUser: false,
            actSpr: [],
            acrRow: [],
            reg: '',
            role: 777
        };
    }

    RebootData = async () => {
        axio.get('/spr/all').then(res=>{
            this.setState({
                main:  res.data,
                actSpr: []
            });
        });
    }

    componentDidMount = async () => {
        await axio.get('/spr/all').then(res=>{
            this.setState({
                main:  res.data,
            });
        }); 
        await axio.get('/auth/access').then ( res => {
            this.setState({
                role: res.data.role
            })
        }) 
    }

    dowloadFromFile = async() => {
        this.props.setLoaderShow();
        await axio.get('/spr/downloadFromFile').then(res=>{
            console.log(res.data)
        });
        this.props.setLoaderHide();
    }

    changeModal = () => {
        this.setState(state => ({ isModalOpen: !state.isModalOpen}))
    }

    changeRelation = () => {
        this.setState(state => ({ isRelationOpen: !state.isRelationOpen}))
    }

    changeWatchRelation = () => {
        this.setState(state => ({ isWatchRelation: !state.isWatchRelation}))
    }

    changeNewUser = () => {
        this.setState(state => ({ isNewUser: !state.isNewUser, reg: 'new'}))
    }

    updateUser = () => {
        this.setState(state => ({ isNewUser: !state.isNewUser, reg: 'upd'}))
    }

    changeSpr = (row) => {
        this.setState({
            actSpr: row
        })
    }

    render(props){
        //let txt = CryptoJS.AES.decrypt(this.props.authStore.role, config.config.secretKey)
        //let txt = this.props.authStore.role.toString(CryptoJS.enc.Base64);
        //let str = txt.toString(CryptoJS.enc.Utf8);
        //.log(txt)
        //console.log(().toString(CryptoJS.enc.Utf8))
        let spr =   <div className='spr_block_main'>
                        <TableBlock key={this.nextUniqueId()} onReboot={this.RebootData} 
                                name={this.state.actSpr.name} 
                                table={this.state.actSpr.table} 
                                items={this.state.actSpr.item} 
                                type={this.state.actSpr.type} row={this.state.actSpr} />
                    </div>
        return(
            <div className='spr_block_act_zone'> 
                <div>
                    <button className='button' onClick={this.changeRelation}>Создать связь</button>
                    <button className='button' onClick={this.changeWatchRelation}>Просмотреть связи</button>
                </div>
                
                {(this.state.role === 0) ? <div>
                                                            <button className='button button_green' onClick={this.changeNewUser}>Создать пользователя</button>
                                                            <button className='button button_green' onClick={this.updateUser}> Изменить данные</button>
                                                            <button className='button'> Список пользователей</button>
                                                            <button className='button button_yellow' onClick={this.dowloadFromFile}>Загрузить из файла</button>
                                                        </div> : null}
                
                <div>
                    {this.state.main.map(row=> 
                        <SprButton  key={this.nextUniqueId()} row={row} changeSpr={this.changeSpr} />
                    )}
                </div>
                {this.state.actSpr.name && spr}
                
                {this.state.isRelationOpen && <Relation onClose={this.changeRelation}/>}

                {this.state.isWatchRelation && <RelationWatch onClose={this.changeWatchRelation}/>}

                {this.state.isNewUser && <NewUser onClose={this.changeNewUser} reg={this.state.reg} />}
            </div>
        )
    }          
}
const pushDispatchToProps = {
    setLoaderShow,
    setLoaderHide
};
export default connect(
    state => ({
        authStore: state.auth
    }),
    pushDispatchToProps
)(Spr_block)

/**
 * <div className='spr_block_main'>
                    {this.state.main.map((id, index )=> 
                    <TableBlock key={this.nextUniqueId()} onReboot={this.RebootData} name={id.name} table={id.table} items={id.item} type={id.type} row={id} />)}
                </div>
 * 
 */