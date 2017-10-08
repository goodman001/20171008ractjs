import React, { Component }  from 'react';
import App from './app.jsx';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react'
import { Form, Radio } from 'semantic-ui-react'
import { Grid, Segment, Divider } from 'semantic-ui-react'
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
			value:"",
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
				<Form>
					<Form.Field>
					  Selected value: <b>{this.state.value}</b>
					</Form.Field>
				<Grid columns={3} relaxed>
					<Grid.Column>
					  <Segment basic>
						<Form.Field>
						  <Radio
							label='no filter'
							name='radioGroup'
							//value='this'
							onChange={(event, value) => this.updateFilterRatio(event,value)}
						  />
						</Form.Field>
					  </Segment>
					</Grid.Column>
					<Grid.Column>
					  <Segment basic>
						<Form.Field>
						  <Radio
							label='Filter Movie name'
							name='radioGroup'
							//value='that'
							onChange={(event, value) => this.updateFilterRatio(event,value)}
						  />
						</Form.Field>
					  </Segment>
					</Grid.Column>
					<Grid.Column>
					  <Segment basic>
					  </Segment>
					</Grid.Column>
				</Grid>
			  </Form>
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
	updateFilterRatio(event,value){
		console.log(value.value);
		//this.setState({ value:value.value });
		
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
				  {this.state.searchValue}
			  </div>
		  </div>
		);
	}
}
export default ListView;