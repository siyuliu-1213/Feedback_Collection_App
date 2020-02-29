import React, {Component} from "react";
// BrowserRouter: brain
// Route: a mapping from route to component
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from 'react-redux'; // connect enables some components to call action creators
import * as actions from "../actions";

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;


class App extends Component{
	componentDidMount() {
		this.props.fetchUser(); 
	}
	render(){
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component = {Landing} />
						<Route exact path="/surveys" component={Dashboard} />
						<Route path="/surveys/new" component={SurveyNew} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
};

export default connect(null, actions)(App);