
import React , {Component} from 'react';
import { Badge ,Icon ,Menu, Dropdown ,message , Modal } from 'antd';
import './topbar.scss';
import userImg from  '../resources/images/user.png';
import {hashHistory} from 'react-router';

const MenuItem = Menu.Item
const confirm = Modal.confirm;
const onMenuItemClick = function ({ key }) {
  message.info(`Click on item ${key}`);
};


// <div className="message" onClick={this.onMessageClick}>
// 	<span>消息</span>
// 	<a href="#">
// 		<Badge count={this.state.messageCount} overflowCount={9} dot={true}>
// 			<span className="badge-icon" />
// 		</Badge>
// 	</a>
// </div>


const menu = (
			<Menu onClick={onMenuItemClick}>
				<Menu.Item key="setting" >
					<span >设置</span>
				</Menu.Item>
				<Menu.Item key="usercenter">
					<span >个人中心</span>
				</Menu.Item>
				<Menu.Item key="logout">
					<span >注销</span>
				</Menu.Item>
			</Menu>
		);




export default class TopBar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			messageCount : 5 ,
			isLogin : props.isLogin ,
			userInfo : props.userInfo
		}
		this.onMessageClick = this.onMessageClick.bind(this);
		// this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.onLogout = this.onLogout.bind(this);
		this.onEditPasswordEdit = this.onEditPasswordEdit.bind(this);
		this.onLoginClick = this.onLoginClick.bind(this);
	}

	componentWillMount() {
		//获取路由参数



	}

	componentDidMount() {
		// console.log('topbar' , this.state.userInfo)
	}

	onMessageClick(e){
		e.preventDefault();
		this.setState({
			messageCount : ++this.state.messageCount
		});
	}

	onLoginClick(){
		console.log('login');
	}

	onLogout(){
		confirm({
			title: '注销',
			content: '是否确认注销?',
			onOk() {
				Cookies.remove("userInfo");
				Cookies.remove("menuList");
				hashHistory.push("/login");
			},
			onCancel() {},
		})
		
	}
	
	onEditPasswordEdit(){
		this.props.displayEditPassword(true)
	}

	render(){

		return (
				<div className="topbar"> 
					<div className="logo"></div>
					<div className="nav">
						
						<div className="info">
							<span className="user" onClick={this.onLoginClick}>{this.state.userInfo.username ? this.state.userInfo.username : "未登录"}</span>
							<span className="password" onClick={this.onEditPasswordEdit}>修改密码</span>
							<div onClick={this.onLogout} className="logout">
								<span>注销</span>
								<div className="logout-img"></div>
							</div>
						</div>
					</div>
				</div>
			)
	}
}