import React, { Component }  from 'react';
import App from './app.jsx';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { Form, Radio } from 'semantic-ui-react';
import { Grid, Segment, Divider } from 'semantic-ui-react';
import { Table } from 'semantic-ui-react';
import { Dropdown } from 'semantic-ui-react';
import { List } from 'semantic-ui-react';
import { Header} from 'semantic-ui-react';
import axios from 'axios';

var apiKey = "268cadf74b38898fc4b07c2f994ffa08";

class ListView extends Component {
	constructor(props){
		super(props);
		  console.log(props);

		this.state={
			viewScreen:[],//search input
			searchValue:"",
			filterFlag:"false",
			resultScreen:[],
			moviedatas:[],
			detailindex:0,
		}
	}
	componentDidMount(){
		var viewScreen=[];
		viewScreen = this.renderSearch();
		this.setState({viewScreen});
	}
	/* show search */
	renderSearch(){
		return(
			<div>
				<Header as='h2' icon textAlign='center'>
					<Header.Content>
					List View
					</Header.Content>
				</Header>
				<Header as='h3' icon textAlign='left'>
					<Header.Content>
					Search & Filter
					</Header.Content>
				</Header>
				<Input loading placeholder='Search...' id="search" onChange = {(event) => this.updateSearchValue(event)} />			
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
	handleSearchClick(event){
		document.getElementById("search").value = "";  
		var self = this;
		var url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query="+ this.state.searchValue +"&page=1&include_adult="+this.state.filterFlag;
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
					self.setState({searchValue:''});
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
	/*show table */
	renderResultRows(datas) {
		var self = this;
		return datas.map((data,index) =>{
			return (
				<Table.Row key={index} data-item={data} onClick={(event) =>this.fetchDetails(event)}>
					<Table.Cell data-title="id">{data.id}</Table.Cell>
					<Table.Cell data-title="title">{data.title}</Table.Cell>
					<Table.Cell data-title="release_date">{data.vote_average}</Table.Cell>
					<Table.Cell data-title="content">
							<Button label="View Detail"  color='red' onClick={(event) => self.handleDetailClick(event,data.id)}/>
					</Table.Cell>
				</Table.Row>
			);
    	});
	}
	/* show table */
	handleSortClick(event,flag){
		var self = this;
		console.log(flag);
		if(flag == "ida"){
			var results = this.state.moviedatas;
			results.sort(function(a, b){
				return a.id-b.id
			})
			console.log("idasort");
			console.log(results);
			console.log("idasort");
			var resultScreen = [];
			resultScreen = self.renderResultTable(results);
			self.setState({moviedatas:results});
			self.setState({resultScreen});
			
		}else if(flag == "idde"){
			var results = this.state.moviedatas;
			results.sort(function(a, b){
				return b.id-a.id
			})
			console.log("idasort");
			console.log(results);
			console.log("idasort");
			var resultScreen = [];
			resultScreen = self.renderResultTable(results);
			self.setState({moviedatas:results});
			self.setState({resultScreen});
		}else if(flag == "voa"){
			var results = this.state.moviedatas;
			results.sort(function(a, b){
				return a.vote_average-b.vote_average
			})
			console.log("idasort");
			console.log(results);
			console.log("idasort");
			var resultScreen = [];
			resultScreen = self.renderResultTable(results);
			self.setState({moviedatas:results});
			self.setState({resultScreen});
		}
		else{
			var results = this.state.moviedatas;
			results.sort(function(a, b){
				return b.vote_average-a.vote_average
			})
			console.log("idasort");
			console.log(results);
			console.log("idasort");
			var resultScreen = [];
			resultScreen = self.renderResultTable(results);
			self.setState({moviedatas:results});
			self.setState({resultScreen});
		}
	}
	renderResultTable(data) {
		var self = this;
		return(
			<div>
				<div>
					<Header as='h3' icon textAlign='left'>
						<Header.Content>
						Result list
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
					<div>
						<Table celled>
							<Table.Header>
							  <Table.Row>
								<Table.HeaderCell>ID</Table.HeaderCell>
								<Table.HeaderCell>TITLE</Table.HeaderCell>
								<Table.HeaderCell>VOTE_AVG</Table.HeaderCell>
								<Table.HeaderCell></Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>

							{!this.isEmpty(data)
							? this.renderResultRows(data)
							: ''}
							</Table.Body>
						</Table>
					 </div>
				</div>
			</div>
		);
	}
	/*show detail*/
	handleDetailClick(event,id){
		//console.log(i);
		var self = this;
		var results = this.state.moviedatas;
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
		var results = this.state.moviedatas;
		var index = detailindex;
		return(
			<div>
				<Header as='h3' icon textAlign='left'>
					<Header.Content>
					Movie Detail
					</Header.Content>
				</Header>
				<div className="sortzone">
					<Button.Group>
						<Button onClick={(event) => this.handlePreClick(event,index)} >Pre</Button>
						<Button onClick={(event) => this.handleNextClick(event,index)} >Next</Button>
						<Button onClick={(event) => this.handleShowResult(event)} >Return</Button>
					</Button.Group>
				</div>
				<div className="detailzone">
					<List>
						<List.Item icon='tag' content={'ID: ' + results[index].id} />
						<List.Item icon='tag' content={'Title: ' + results[index].title} />
						<List.Item icon='tag' content={'Original Title: ' + results[index].original_title} />
						<List.Item icon='tag' content={'adult: ' + results[index].adult} />
						<List.Item icon='tag' content={'original_language: ' + results[index].original_language} />
						<List.Item icon='tag' content={'release_Date: ' + results[index].release_date} />
						<List.Item icon='tag' content={'vote_average: ' + results[index].vote_average} />
					</List>
				</div>
			</div>	
		);
	}
	handlePreClick(event,index){
		console.log("pre");
		console.log(index);
		index = index - 1;
		var results = this.state.moviedatas;
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
		var results = this.state.moviedatas;
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
		var results = this.state.moviedatas;
		resultScreen = this.renderResultTable(results);
		this.setState({resultScreen});
		this.setState({searchValue:''});
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
export default ListView;