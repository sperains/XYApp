
import React , {Component} from 'react';
import './login.scss';
import {hashHistory} from 'react-router';
import DataStore from '../../utils/DataStore.js' ;
import {message , Spin} from 'antd';


// <div className="option">
// <div className="remember" onClick={this.onRememberPasswordStateChange}>
// 	<div className={this.state.rememberPassworld ? 'checkbox checked' : 'checkbox unchecked'}></div>
// 	<span>记住密码</span>
// </div>
// <span className="forgot">忘记密码</span>
// </div>

export default class Login extends Component{

	constructor(props) {
		super(props);
		this.state = {
			rememberPassworld : false ,
			user : {
				username : '',
				password : ''
			},
			loading : false
		}
		this.onLogin = this.onLogin.bind(this);
		this.onRememberPasswordStateChange = this.onRememberPasswordStateChange.bind(this);
		this.onUserNameInput = this.onUserNameInput.bind(this);
		this.onPasswordInput = this.onPasswordInput.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentWillMount() {
		let userInfo = Cookies.getJSON('userInfo');
		if(userInfo){
			hashHistory.push("/main/active");
		}
	}

	componentDidMount() {
		window.addEventListener('keypress', this.onKeyPress);  
	}

	componentWillUnmount() {
		window.removeEventListener('keypress' , this.onKeyPress);
	}

	onKeyPress(e){
		if(e.key === "Enter"){
			this.onLogin();
		}
	}


	onLogin(){
		let me = this ;
		let user = this.state.user;

		if(user.username == ""){
			message.error("请输入用户名");
			return ;
		}

		if(user.password == ""){
			message.error("请输入密码.")
			return ;
		}

		me.setState({
			loading : true
		})

		DataStore.login( Object.assign({} , user , {password : md5(user.password)}) )
		.then( (data)=>{
			
			// if(this.state.rememberPassworld){
			// 	// localStorage.setItem('user' , 'rains');
			// 	let rememberMe = Object.assign( {} , user , {rememberMe : true});
			// 	Cookies.set("rememberMe" , rememberMe )
			// }else{
			// 	Cookies.remove("rememberMe");
			// }
			Cookies.set('userInfo', data);
			hashHistory.push({
				pathname : "/main",
				state : {
					userInfo : data
				}
			});
		}).catch( ()=>{
			message.error("账号或者密码错误");
			me.setState({
				loading : false
			})
		});


		
		
	}

	onRememberPasswordStateChange(){
		this.setState({
			rememberPassworld : !this.state.rememberPassworld
		});
	}

	onUserNameInput(e){
		e.stopPropagation();
		if(e.key === 'Enter'){
			this.refs.password.focus()
			
			return ;
		}

		let user = this.state.user;
		user.username = e.target.value;
		this.setState({
			user : user
		})
	}

	onPasswordInput(e){
		let user = this.state.user;
		user.password= e.target.value;
		this.setState({
			user : user
		})
	}

	render() {
		return (
			<div className="login-wrap">
			<Spin spinning={this.state.loading} tip='登录中,请稍候...'>
				<div className="login-content">
					<div className="logo">喜悦</div>
					<div className="login-form">
						<div className="form-item">
							<input type="text" placeholder="请输入账号" value={this.state.user.username} onChange={(e)=>this.onUserNameInput(e)} onKeyPress={(e)=>this.onUserNameInput(e)}/>
						</div>

						<div className="form-item">
							<input type="password" placeholder="请输入密码" ref="password" value={this.state.user.password} onChange={(e)=>this.onPasswordInput(e)} onKeyPress={(e)=>this.onPasswordInput(e)}/>
						</div>

						<div className="login">
							<div onClick={this.onLogin} className="icon"></div>
						</div>
						
					</div>
				</div>
			</Spin>
			</div>
		)
	}


}