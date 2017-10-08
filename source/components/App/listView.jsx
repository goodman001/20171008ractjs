import React, { Component }  from 'react';
import App from './app.jsx';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'
import { Form, Radio } from 'semantic-ui-react'
import { Grid, Segment, Divider } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import axios from 'axios';

var apiKey = "268cadf74b38898fc4b07c2f994ffa08";

class ListView extends Component {
	constructor(props){
		super(props);
		  console.log(props);

		this.state={
			viewScreen:[],//search input
			searchValue:"",
			filterFlag:"all",
			resultScreen:[],
		}
	}
	componentDidMount(){
		var viewScreen=[];
		viewScreen = this.renderSearch();
		this.setState({viewScreen});
	}
	/*show search*/
	renderSearch(){
		return(
			<div>
				<Input loading placeholder='Search...' id="search" onChange = {(event) => this.updateSearchValue(event)} />
				<Button color='red' onClick={(event) => this.handleSearchClick(event)}>Search</Button>
				<Dropdown
					selectOnBlur={false}
					selection
					placeholder={'Filter (default all) '}
					options={[{key: 0, text: 'all', value: 'all'}, {key: 1, text: 'movie name', value: 'moviename'}]} 
					onChange={(event,value) => this.updateFilter(event,value)}
				/>
			</div>
		);
	}
	/*update search input*/
	updateSearchValue(event){
		this.setState({
		  searchValue: event.target.value
		});
	}
	/*filter*/
	updateFilter(event,value){
		console.log(value.value);
		this.setState({ filterFlag:value.value });
		console.log(this.state.filterFlag);
		
		
	}
	/*submit search */
	handleSearchClick(event){
		document.getElementById("search").value = "";  
		var self = this;
		var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query="+ this.state.searchValue +"&page=1&include_adult=false";
		axios.get(url)//get movie 
			.then(function (response) {
				console.log(response);
				if(response.status == 200){
					console.log("search successfull");
					console.log(response.data.results);
					var resultScreen = [];
					resultScreen = self.renderResultTable(response.data.results);
    				self.setState({resultScreen});
					//self.renderResultTable();
					//console.log(response.data.user);
					//var uploadScreen=[];
					//uploadScreen.push(<UserPage appContext={self.props.appContext} role={self.state.loginRole} user={response.data.user} />)

					//self.renderNotelist(response.data.user.noteItems);
				}
				else{
				 console.log("searchurl fail");
				 //alert("Note update fail");
				}
			 })
			.catch(function (error) {
			   console.log(error);
			});
	}
	
	
	/* show search result */
	 fetchDetails(e){
    const data = e.target.getAttribute('data-item');
    console.log('We need to get the details for ', data);
  }
	isEmpty(obj) {
		return Object.keys(obj).length === 0;
	}
	/*show table > tr*/
  renderResultRows(noteItems) {
    var self = this;
    return noteItems.map((data,index) =>{
        return (
            <tr key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
                <td data-title="id">{data.id}</td>
                <td data-title="title">{data.title}</td>
                <td data-title="release_date">{data.release_date}</td>
				<td data-title="content">
						<Button label="Edit" primary={true}  onClick={(event) => self.handleNoteEditClick(event,index)}/>
				</td>
            </tr>
        );
    });
  }
  /* show table */
  renderResultTable(data) {
    var self = this;
    return(
		<div>
		  <div>
			<div className="noteheader">
			 <center><h3>Note list</h3></center>
			<Button  label="NewNote" onClick={(event) => this.handleNoteCreateClick(event)}/>
			</div>
			<div className="notecontainer">
					 <table className="notetable">
					  <tr>
						<th>ID</th>
						<th>TITLE</th>
						<th>CONTENT</th>
						<th></th>
					  </tr>
					  <tbody>
					  
						{!this.isEmpty(data)
                        ? this.renderResultRows(data)
                        : ''}
					   </tbody>
					</table>
			 </div>
		   </div>
		  </div>
	);
  }
	render() {
		//console.log(this.props.user.noteItems);
		//this.generateRows();
		/*
		let rowComponents = this.generateRows(this.props.user.noteItems);
		  let table_rows = []
		  let table_headers = [];
		  let data = this.props.users.noteItems;
		if (this.props.user.noteItems.length >0){
		  let headers = Object.keys(this.props.user.noteItems[0]);
			headers.forEach(header => table_headers.push(<TableCell key={header}>{header}</TableCell>));
		}*/
		return (
		  <div className="App">

			  <div className="container">

				  {this.state.viewScreen}
				  {this.state.resultScreen}
			  </div>
		  </div>
		);
	}
}
export default ListView;