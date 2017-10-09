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
			filterVoteAvg:"all",
			filterYear:"all",
			resultScreen:[],
			moviedatas:[],
			detailindex:0,
		}
	}
	componentDidMount(){
		//var viewScreen=[];
		var viewScreen=[];
		viewScreen = this.renderSearch();
		this.setState({viewScreen});
		this.handleInitGetGallery();
		//this.setState({viewScreen});
	}
	/* show search */
	renderSearch(){
		return(
			<div>		
				<Dropdown
					selectOnBlur={false}
					selection
					placeholder={'select vote average rank(default all) '}
					options={[{key: 0, text: 'ALL', value: 'all'}, {key: 1, text: '8-10', value: 'levelone'}, {key: 2, text: '7-8', value: 'leveltwo'}, {key: 3, text: '0-7', value: 'levelthree'}]} 
					onChange={(event,value) => this.updateVoteAvg(event,value)}
				/>
				<Dropdown
					selectOnBlur={false}
					selection
					placeholder={'Filter Year (default all years) '}
					options={[{key: 0, text: 'all years', value: 'all'}, {key: 1, text: '2017', value: '2017'}, {key: 2, text: '2016', value: '2016'}, {key: 3, text: '2015', value: '2015'}, {key: 4, text: '2014', value: '2014'}, {key: 5, text: 'Before 2013', value: 'before'}]} 
					onChange={(event,value) => this.updateYear(event,value)}
				/>
				<Button color='red' onClick={(event) => this.handleFilterSearch(event)}>Filter</Button>
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
	updateVoteAvg(event,value){
		console.log(value.value);
		this.setState({ filterVoteAvg:value.value });
		//console.log(this.state.filterVoteAvg);
		
		
	}
	/*filter*/
	updateYear(event,value){
		console.log(value.value);
		this.setState({ filterYear:value.value });
		//console.log(this.state.filterVoteAvg);
		
		
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
					resultScreen = self.renderResultList(response.data.results);
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
	/*filter search*/
	handleFilterSearch(event){
		//document.getElementById("search").value = "";  
		console.log("fileter search");
		var moviedatas = [];
		var endarr = [];
		moviedatas = this.state.moviedatas;
		var voteavgrange = this.state.filterVoteAvg;
		var yearrange = this.state.filterYear;
		console.log(voteavgrange);
		console.log(yearrange);
		var moviedatasvote = [];
		switch(voteavgrange){
				case "levelone":
					for(var i =0;i < moviedatas.length;i++){
						if(moviedatas[i].vote_average >=8)
						{
							moviedatasvote.push(moviedatas[i]);
						}
			
					}
					break;
				case "leveltwo":
				
					for(var i =0;i < moviedatas.length;i++){
						if(moviedatas[i].vote_average >=7 && moviedatas[i].vote_average <=8)
						{
							moviedatasvote.push(moviedatas[i]);
						}
					}
					break;
				case "levelthree":
					for(var i =0;i < moviedatas.length;i++){
						if(moviedatas[i].vote_average >=0 && moviedatas[i].vote_average <=7)
						{
							moviedatasvote.push(moviedatas[i]);
						}
					}
					break;
			default:
				console.log("lalal");
				break;
		}
		console.log(moviedatasvote);
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
	renderResultItems(datas) {
		var self = this;
		return datas.map((data,index) =>{
			return (
				<List.Item key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
					<List.Content data-title="id">
						<Image data-title="id"  src={"https://image.tmdb.org/t/p/w300/"+data.poster_path} />
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
	renderResultList(data) {
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
								<List.Item >
									<List.Content></List.Content><List.Content ></List.Content><List.Content ></List.Content>
								</List.Item>
								{!this.isEmpty(data)
								? this.renderResultItems(data)
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
				  {this.state.viewScreen}
				  {this.state.resultScreen}
			  </div>
		  </div>
		);
	}
}
export default GalleryView;