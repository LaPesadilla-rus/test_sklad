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
        this.props.onChange(value);
        this.searchWord(value);
        this.searchItem(value);
        this.nameInput.focus(); 
    }

    renderSuggestions () {
        var suggestions = this.state.suggestions;
        if (suggestions.length === 0){
            return null;
        }
        suggestions = suggestions.slice(0,8);
        return (
                <ul>
                     {suggestions.map(item =>  <li onClick={() => this.suggestionSelected(item)} key={item}><label>{item}</label></li>)}
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
            }
    }

    render(){
        return(
            <div className='autocomplite'>
                 <div className='autocomplite_column'><input ref={(input) => { this.nameInput = input; }} className={'input '+(!this.state.err ? 'input_red' : 'input_green')}  type='text' onChange={this.onChangeTxt} value={this.state.txt} ></input></div>
                 <div className='autocomplite_column'>{this.renderSuggestions()}</div>
            </div>
        )
    }
}