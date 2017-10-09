import React, { Component }  from 'react';
import App from './app.jsx';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Header} from 'semantic-ui-react';

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
			filterdatas:[],
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
				<Header as='h2' icon textAlign='center'>
					<Header.Content>
					Gallery View
					</Header.Content>
				</Header>
				<Header as='h3' icon textAlign='left'>
					<Header.Content>
					Filter
					</Header.Content>
				</Header>
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
					options={[{key: 0, text: 'all years', value: 'all'}, {key: 1, text: '2017', value: '2017'}, {key: 2, text: '2016', value: '2016'}, {key: 3, text: '2015', value: '2015'}, {key: 4, text: 'Before 2014', value: 'before'}]} 
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
					self.setState({filterdatas:response.data.results});
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
		/*check vote avg*/
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
				moviedatasvote = moviedatas;
				break;
		}
		
		/*check year range*/
		var moviedatasyear = [];
		switch(yearrange){
				case "2017":
					for(var i =0;i < moviedatasvote.length;i++){
						var s = moviedatasvote[i].release_date;   
						var y = new Date(Date.parse(s.replace(/-/g,"/"))).getFullYear();
						console.log(y);
						if(y  == 2017 )
						{
							moviedatasyear.push(moviedatasvote[i]);
						}
			
					}
					break;
				case "2016":
					for(var i =0;i < moviedatasvote.length;i++){
						var s = moviedatasvote[i].release_date;   
						var y = new Date(Date.parse(s.replace(/-/g,"/"))).getFullYear();
						console.log(y);
						if(y  == 2016 )
						{
							moviedatasyear.push(moviedatasvote[i]);
						}
			
					}
					
					break;
				case "2015":
					for(var i =0;i < moviedatasvote.length;i++){
						var s = moviedatasvote[i].release_date;   
						var y = new Date(Date.parse(s.replace(/-/g,"/"))).getFullYear();
						console.log(y);
						if(y  == 2015 )
						{
							moviedatasyear.push(moviedatasvote[i]);
						}
			
					}
					break;
				case "before":
					for(var i =0;i < moviedatasvote.length;i++){
						var s = moviedatasvote[i].release_date;   
						var y = new Date(Date.parse(s.replace(/-/g,"/"))).getFullYear();
						console.log(y);
						if(y  <= 2014 )
						{
							moviedatasyear.push(moviedatasvote[i]);
						}
			
					}
					break;
			default:
				moviedatasyear = moviedatasvote;
				console.log("lalal");
				break;
		}
		console.log(moviedatasyear);
		var resultScreen = [];
		this.setState({filterdatas:moviedatasyear});
		resultScreen = this.renderResultList(moviedatasyear);
		this.setState({resultScreen});
		
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
					<Header as='h3' icon textAlign='left'>
						<Header.Content>
						Sort
						</Header.Content>
					</Header>
					<div className="sortzone">
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
	handleSortClick(event,flag){
		var self = this;
		console.log(flag);
		if(flag == "ida"){
			var results = this.state.filterdatas;
			results.sort(function(a, b){
				return a.id-b.id
			})
			console.log("idasort");
			console.log(results);
			console.log("idasort");
			var resultScreen = [];
			resultScreen = self.renderResultList(results);
			self.setState({filterdatas:results});
			self.setState({resultScreen});
			
		}else if(flag == "idde"){
			var results = this.state.filterdatas;
			results.sort(function(a, b){
				return b.id-a.id
			})
			console.log("idasort");
			console.log(results);
			console.log("idasort");
			var resultScreen = [];
			resultScreen = self.renderResultList(results);
			self.setState({filterdatas:results});
			self.setState({resultScreen});
		}else if(flag == "voa"){
			var results = this.state.filterdatas;
			results.sort(function(a, b){
				return a.vote_average-b.vote_average
			})
			console.log("idasort");
			console.log(results);
			console.log("idasort");
			var resultScreen = [];
			resultScreen = self.renderResultList(results);
			self.setState({filterdatas:results});
			self.setState({resultScreen});
		}
		else{
			var results = this.state.filterdatas;
			results.sort(function(a, b){
				return b.vote_average-a.vote_average
			})
			console.log("idasort");
			console.log(results);
			console.log("idasort");
			var resultScreen = [];
			resultScreen = self.renderResultList(results);
			self.setState({filterdatas:results});
			self.setState({resultScreen});
		}
	}
	handleDetailClick(event,id){
		//console.log(i);
		var self = this;
		var results = this.state.filterdatas;
		var detailindex = 0;
		for(var i=0;i<results.length;i++){
			if(results[i].id == id){
				detailindex = i;
			}
		}
		console.log(detailindex);;
		var resultScreen = [];
		resultScreen = self.renderDetail(detailindex);
		self.setState({resultScreen});
		
	}
	renderDetail(detailindex){
		console.log("renderDetail");
		console.log(detailindex);
		this.setState({ detailindex:detailindex });
		var results = this.state.filterdatas;
		var index = detailindex;
		return(
			<div>
				<h3>Movie Detail </h3>
				<div>
					<Button.Group>
						<Button onClick={(event) => this.handlePreClick(event,index)} >Pre</Button>
						<Button onClick={(event) => this.handleNextClick(event,index)} >Next</Button>
						<Button onClick={(event) => this.handleShowResult(event)} >Return</Button>
					</Button.Group>
				</div>
				<List>
					<List.Item icon='tag' content={'ID: ' + results[index].id} />
					<List.Item icon='tag' content={'Title: ' + results[index].title} />
					<List.Item icon='tag' content={'Original Title: ' + results[index].original_title} />
					<List.Item icon='tag' content={'adult: ' + results[index].adult} />
					<List.Item icon='tag' content={'original_language: ' + results[index].original_language} />
					<List.Item icon='tag' content={'release_Date: ' + results[index].release_date} />
					<List.Item icon='tag' content={'vote_average: ' + results[index].vote_average} />
					<List.Content>
						<Image src={"https://image.tmdb.org/t/p/w300/"+results[index].poster_path} />
					</List.Content>
				  </List>
			</div>	
		);
	}
	handlePreClick(event,index){
		console.log("pre");
		console.log(index);
		index = index - 1;
		var results = this.state.filterdatas;
		if(index >=results.length){
			index = results.length -1;
		}
		if(index <0){
			index = 0;
		}
		var resultScreen = [];
		resultScreen = this.renderDetail(index);
		this.setState({resultScreen});
	}
	handleNextClick(event,index){
		console.log("pre");
		console.log(index);
		index = index + 1;
		var results = this.state.filterdatas;
		if(index >=results.length){
			index = results.length -1;
		}
		if(index <0){
			index = 0;
		}
		var resultScreen = [];
		resultScreen = this.renderDetail(index);
		this.setState({resultScreen});
	}
	handleShowResult(event){
		var resultScreen = [];
		var results = this.state.filterdatas;
		resultScreen = this.renderResultList(results);
		this.setState({resultScreen});
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
				<div className = "header">
				{this.state.viewScreen}
				</div>
				<div className = "result">
				{this.state.resultScreen}
				</div>
			</div>
		  </div>
		);
	}
}
export default GalleryView;