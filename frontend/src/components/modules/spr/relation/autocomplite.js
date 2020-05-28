import React, {Component} from 'react';
import './autocomplite.css';
import UnicId from 'react-html-id';

export default class Autocomplite extends Component {
    constructor (props){
        super(props);
        UnicId.enableUniqueIds(this);
        this.state = {
            items: [],
            txt: '',
            suggestions: [],
            allsuggestions: [],
            err: false,
            isWindowOpen: false,
        }
    }

    searchWord = (e) => {
        if (this.props.items_arr.indexOf(e) === -1){
            this.setState({err: false})
        }else{
            this.setState({err: true});
        }
    }

    onChangeTxt = (e) => {
        const value = e.target.value;
        let suggestions = [];
        console.log(this.props.items_arr)
        //this.setState({items: this.props.items_arr})
        if (value.length > 0){
           
            const regex = new RegExp(`${value}`, 'i');
            
           suggestions = this.props.items_arr.sort().filter(v => regex.test(v));
        }
        this.setState({suggestions: suggestions})
        this.setState({txt: e.target.value})
        this.searchWord(e.target.value);
        this.props.onChange(e.target.value);
        //let id = this.props.items_full.find(line => line.name === e.target.value).eq_id;
        this.searchItem(e.target.value);
        //console.log(this.props.items_full)
    }

    setModelText = (e) => {
        this.props.setModelText(e.target.value);
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0){
            const regex = new RegExp(`${value}`, 'i');
            suggestions = this.props.items_arr.sort().filter(v => regex.test(v));
        }
        console.log(this.props.items_arr)
        console.log(suggestions);
        this.setState({suggestions: suggestions})
    }

    searchItem = (value) => {
        var i = this.props.items_full.length;
        while (i--){
            if (this.props.items_full[i].item === value){
                this.props.id_item(this.props.items_full[i].eq_id)
            }
        }
    }

    suggestionSelected (value) {
        this.setState({
            txt: value,
            suggestions: [],
        })
        this.props.setModelText(value);
        this.nameInput.focus(); 
        this.setState(state => ({ isWindowOpen: !state.isWindowOpen}))
    }

    renderSuggestions () {
        var suggestions = this.state.suggestions;
        if (suggestions.length === 0){
            return null;
        }
        suggestions = suggestions.slice(0,8);
        return (
                <ul>
                     {suggestions.map(item =>  <li onClick={() => this.suggestionSelected(item)} key={this.nextUniqueId()}><label>{item}</label></li>)}
                 </ul> 
        )
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, false);  
    }

    handleClickOutside =(e) => {
        if (e.target.localName !== 'label'){
            this.setState({suggestions: []});
            /*if (this.state.isWindowOpen) {
               this.setState({isWindowOpen: false})
            }*/
            }
    }

    renderZeroSuggestions = () => {
        this.setState(state => ({ isWindowOpen: !state.isWindowOpen}))
    }

    render(){
        let window;
        if (this.state.suggestions.length === 0 && this.state.isWindowOpen && this.props.modelText.length === 0) {
            //console.log(this.props.items_arr)
            window = <ul>
                        {this.props.items_arr.map(item =>  <li onClick={() => this.suggestionSelected(item)} key={this.nextUniqueId()}>{item}</li>)}
                    </ul>;
        }else {
            window = null;
        }
        return(
            <div className='autocomplite'>
                 <div className='autocomplite_column'>
                    <input onClick={this.renderZeroSuggestions} ref={(input) => { this.nameInput = input; }} 
                        className={'input '+(!this.state.err ? 'input_red' : 'input_green')}  
                        type='text' onChange={this.setModelText} value={this.props.modelText} >
                    </input></div>
                 <div className='autocomplite_column'>{this.renderSuggestions()}{window}</div>
            </div>
        )
    }
}