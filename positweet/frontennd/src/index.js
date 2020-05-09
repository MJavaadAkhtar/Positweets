import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from './components/Login'
import msg from './data.js/data';
import Signup from './components/Signup'
import Feed from './components/feed'

class Index extends React.Component {

    render() {
        return (
            <Router>
                <Switch>

                    <Route exact path="/">
                        <App msg={msg} />
                    </Route>

                    <Route exact path="/login" render={
                        () => <Login msg={msg} />
                    } />

                    <Route exact path="/signup" render={
                        () => <Signup msg={msg} />
                    } />

                    <Route exact path="/tweeterFeed/:name" component={Feed}/>

                </Switch>
            </Router>
        )
    }
}


ReactDOM.render(
    <React.StrictMode>
        <Index />
    </React.StrictMode>,
    document.getElementById('root')
);
