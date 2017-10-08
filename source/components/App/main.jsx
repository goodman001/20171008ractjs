import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './home.jsx';
import Rouster from './rouster.jsx';
import Schedule from './schedule.jsx';

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/rouster" component={Rouster} />
            <Route path="/schedule" component={Schedule} />
        </Switch>
    </main>
)

export default Main;