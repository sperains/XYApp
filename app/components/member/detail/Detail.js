import React , { Component }from 'react';
import DataStore from '../../../utils/DataStore.js' ;
import { hashHistory } from 'react-router';
import './detail.scss';
import xibaoImg from '../../../resources/images/xibao.png';

export default class Detail extends Component{

	constructor(props) {
		super(props);
		this.state = {
			memberList : [],
			record : ''
		}
		this.onBackClick = this.onBackClick.bind(this);
	}

	componentDidMount() {

		const location = hashHistory.getCurrentLocation();

		if(!location.state){
			hashHistory.push('/main/member');
			return ;
		}

		let record = location.state.record;
		// console.log(record);
		this.setState({
			record : record
		})

		DataStore.getMemberListById( {id : record.id}).then(  data => this.setState({
			memberList : data,
			record : record
		}))
	}

	onBackClick(){
		hashHistory.push("/main/member");
	}

	render() {
		return (
			<div className="memberdetail-wrap">
				<div className="memberdetail-top">
					<div className="nav">
						<div className="back" onClick={this.onBackClick}></div>
						<span className="parent" onClick={this.onBackClick}>会员管理</span>
						<span> / </span>
						<span className="current">详情</span>
					</div>
				</div>
				<div className="memberdetail-content">
					<div className="member-info">
						<div className="name">
							<span>{this.state.record.name == "" ? this.state.record.nickname : this.state.record.name }</span>
							<span>邀请人</span>
							<span>{!this.state.record.inviter || this.state.record.inviter ==""  ?   '无' : this.state.record.inviter }</span>
						</div>
						<div className="money">
							<span className="outer">捐款金额:  <span>¥	{this.state.record.donatedMoney}元</span></span>
							<span className="outer">积分: <span>{this.state.record.totalScore}</span>分</span>
							<span className="outer">参加活动: <span>{this.state.record.attendCount}</span>次</span>
						</div>
					</div>
					<div className="member-count">其下会员<span>{this.state.memberList.length}人</span></div>
					<div className="member-list">
						

						{
							this.state.memberList.map( member => 
								(
									<div key={member.id} className="member-item">
										<div className="img-wrap">
											<img src={!member.imgUrl || member.imgUrl == "" ?  xibaoImg  : member.imgUrl } />
										</div>
										<span>{member.name}</span>
									</div>
								)
							)
						}
						
					</div>
				</div>
			</div>
		)
	}
}