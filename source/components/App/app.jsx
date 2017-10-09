import React, { Component }  from 'react';
import Header from './header.jsx';
import ListView from './listView.jsx';
import GalleryView from './galleryView.jsx';
import Home from './home.jsx';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Button, Icon } from 'semantic-ui-react';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      currentScreen:[]
    }
  }
  componentWillMount(){
    var currentScreen =[];
    currentScreen.push(<ListView appContext={this}/>);
    this.setState({
		currentScreen:currentScreen
	})
  }
  /*nav bar click*/
  handleNavClick(event,page){
    switch(page){
		case "list":
			// console.log("need to open uploadapge")
	  		console.log("listview");
			var currentScreen=[];
			currentScreen.push(<ListView appContext={this.props.appContext}/>);
			this.setState({currentScreen})
		break;
      case "gallery":
			console.log("gallery");
			var currentScreen=[];
			currentScreen.push(<GalleryView appContext={this.props.appContext}/>);
			this.setState({currentScreen})
			// console.log("need to open pastfiles")
			//var currentScreen=[];
			//currentScreen.push(<ProfileScreen appContext={this.props.appContext} role={this.props.role} user={this.props.user}/>);
			//this.setState({currentScreen})
			
      break;
    }
    this.setState({draweropen:false})
  }
  render() {
    return (
      <div className="App">
        <div>
			<Button.Group attached='top'>
				<Button onClick={(event) => this.handleNavClick(event,"list")}>A List View</Button>
				<Button onClick={(event) => this.handleNavClick(event,"gallery")}>A gallery view</Button>
    		</Button.Group>
		</div>
        <div>
          {this.state.currentScreen}
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default App;