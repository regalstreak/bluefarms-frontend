import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import './MainRouter.scss'
import Activity from './Activity/Activity';
import Analytics from './Analytics/Analytics';
import Home from './Home/Home';
import NavigationButton from '../components/NavigationButton';

export default (props) => {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/analytics">
                    <Analytics />
                </Route>
                <Route path="/activity">
                    <Activity />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

const Nav = (props) => {
    return (
        <nav>
            <NavigationButton
                img={require('../assets/analytics.svg')}
                alt='Analytics'
                to='/analytics'
            />
            <NavigationButton
                img={require('../assets/leaf.svg')}
                alt='Home'
                to='/'
            />
            <NavigationButton
                img={require('../assets/activity.svg')}
                alt='Activity'
                to='/activity'
            />
        </nav>)
}