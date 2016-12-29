
import React , {Component} from 'react';
import {hashHistory} from 'react-router';

export default class App extends Component{

	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}

	componentWillMount() {
	}

	render() {
		return (
			<div className="app">
				{this.props.children}
			</div>
		)
	}
}