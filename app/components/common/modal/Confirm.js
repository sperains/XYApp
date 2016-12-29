
import React , {Component} from 'react';
import './confirm.scss';

export default class Confirm extends Component{

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="modal-wrap">
				<div className={this.props.display ? "modal" : 'hidden'} ></div>

				<div className={this.props.display ? "confirm-wrap" : 'hidden'} >
					<div className="confirm">
						<div className="confirm-content">
							<span className="title">{this.props.title ? this.props.title : '保存修改'}</span>
							<span className="content">{this.props.text ? this.props.text : '您的内容已作出修改，是否保存?'}</span>
						</div>
						<div className="confirm-btns">
							<div className="ok" onClick={this.props.onSave}></div>
							<div className="cancel" onClick={this.props.onCancel}></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}