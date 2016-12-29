
import  React  , { Component } from 'react';
import './feedback.scss';

export default class FeedBack extends Component{

	constructor(props) {
		super(props);
		
	}

	componentDidMount() {
		
	}


	render() {
		return (
			<div className="feedback-wrap">
				<div className="feedback-top">
					用户反馈,正在建设中...
				</div>

				<div className="feedback-content">
				</div>
			</div>
		)
	}
}