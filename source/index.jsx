import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';
import {BrowseRouter} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import App from './components/App/app.jsx';

// Include any new stylesheets here
// Note that components' stylesheets should NOT be included here.
// They should be 'require'd in their component class file.
require('./styles/main.scss');

render(
	<App />,
    // Define your router and replace <Home /> with it!
    document.getElementById('app')
);
