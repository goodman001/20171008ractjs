import React, { Component }  from 'react';
import App from './app.jsx';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';


import { Form, Radio } from 'semantic-ui-react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react'
import { List } from 'semantic-ui-react'
import { Image } from 'semantic-ui-react'
import axios from 'axios';

var apiKey = "268cadf74b38898fc4b07c2f994ffa08";

class GalleryView extends Component {
	constructor(props){
		super(props);
		  console.log(props);

		this.state={
			viewScreen:[],//search input
			filterFlag:"false",
			resultScreen:[],
			moviedatas:[],
			detailindex:0,
		}
	}
	componentDidMount(){
		//var viewScreen=[];
		this.handleInitGetGallery();
		//this.setState({viewScreen});
	}
	/* show search */
	renderSearch(){
		return(
			<div>
				<Input loading placeholder='Search...' id="search" onChange = {(event) => this.updateSearchValue(event)} />
				
				<Dropdown
					selectOnBlur={false}
					selection
					placeholder={'Filter (default not include adult) '}
					options={[{key: 0, text: 'not include adult', value: 'false'}, {key: 1, text: 'include adult', value: 'true'}]} 
					onChange={(event,value) => this.updateFilter(event,value)}
				/>
				<Dropdown
					selectOnBlur={false}
					selection
					placeholder={'Filter (default not include adult) '}
					options={[{key: 0, text: 'not include adult', value: 'false'}, {key: 1, text: 'include adult', value: 'true'}]} 
					onChange={(event,value) => this.updateFilter(event,value)}
				/>
				<Button color='red' onClick={(event) => this.handleSearchClick(event)}>Search</Button>
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
	handleInitGetGallery(event){
		//document.getElementById("search").value = "";  
		var self = this;
		var url = "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey + "&language=en-US&page=1";
		console.log(url);
		axios.get(url)//get movie 
			.then(function (response) {
				console.log(response);
				if(response.status == 200){
					console.log("search successfull");
					console.log(response.data.results);					
					var resultScreen = [];
					resultScreen = self.renderResultTable(response.data.results);
					self.setState({moviedatas:response.data.results});
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
	renderResultRows(datas) {
		var self = this;
		return datas.map((data,index) =>{
			return (
				<List.Item key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
					<List.Content data-title="id">
						<Image data-title="id"  src={data.id} />
					</List.Content>
					<List.Content data-title="title">
						<List.Header as='a'>{data.title}</List.Header>
					</List.Content>
					<List.Content data-title="title">
						<Button label="View detail" onClick={(event) => self.handleDetailClick(event,data.id)}/>
					</List.Content>
				</List.Item>
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
						<Button.Group>
							<Button onClick={(event) => this.handleSortClick(event,"ida")}>Sort by ID ASC</Button>
							<Button.Or text='or' />
							<Button onClick={(event) => this.handleSortClick(event,"idde")}>Sort by ID DESC</Button>
							<Button.Or text='or' />
							<Button onClick={(event) => this.handleSortClick(event,"voa")}>Sort by Vote_average ASC</Button>
							<Button.Or text='or' />
							<Button onClick={(event) => this.handleSortClick(event,"vode")}>Sort by Vote_average DESC</Button>
						</Button.Group>
					</div>
					<div className="notecontainer">
							<List horizontal relaxed>

								{!this.isEmpty(data)
								? this.renderResultRows(data)
								: ''}
							</List>
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
					Gallery
				  {this.state.resultScreen}
			  </div>
		  </div>
		);
	}
}
export default GalleryView;