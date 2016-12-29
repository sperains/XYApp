
import React , { Component} from 'react';
import './edit.scss';
import {hashHistory} from 'react-router';
import DataStore from '../../../utils/DataStore.js' ;
import {message} from 'antd';

export default class Edit extends Component{

	constructor(props) {
		super(props);
		this.state = {
			identityTypes : [],
			identityInfo : {
				id : '',
				type : 0 ,
				username : '',
				password : '',
				phone : '',
				canScan : 0,
				rw : 0 ,
				permission : []
			} ,
			operating : 0 ,
			moduleList : [
				{ text : '会员管理' , active : false } ,
				{ text : '线下活动' , active : false } ,
				{ text : '正念训练' , active : false } ,
				{ text : '生命数字' , active : false } ,
				{ text : '喜悦能量' , active : false } ,
				{ text : '喜悦捐赠' , active : false } ,
				{ text : '用户反馈' , active : false } ,
				{ text : '职级管理' , active : false } ,
			]
		}

		this.onIdentitySelectChange = this.onIdentitySelectChange.bind(this);
		this.onBackClick = this.onBackClick.bind(this);
		this.onModuleChoose = this.onModuleChoose.bind(this);
		this.onEditSelectChange = this.onEditSelectChange.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onUserNameChange = this.onUserNameChange.bind(this);
		this.onPhoneChange = this.onPhoneChange.bind(this);
		this.isOpenWxCheckClick = this.isOpenWxCheckClick.bind(this);
	}

	componentWillMount() {
		let location = hashHistory.getCurrentLocation();

		if(!location.state){
			hashHistory.push("/main/identity");
			return ;
		}


		let operating =  location.state.operating;
		let identityInfo = this.state.identityInfo;
		


		if(operating == 1 ){		//编辑
			let record = location.state.record;
			identityInfo.id = record.id;
			identityInfo.type = record.type;
			identityInfo.phone = record.phone;
			identityInfo.username = record.username;
			identityInfo.password = record.password;
			identityInfo.rw = record.rw;
			identityInfo.permission = record.permission;
			identityInfo.canScan = record.canScan;
		}

		this.setState({
			operating : operating,
			identityInfo : identityInfo
		})
	}

	componentDidMount() {

		// console.log(this.state.identityInfo)
		let modules = this.state.identityInfo.permission;
		let moduleList = this.state.moduleList;

		modules.map( i => {
			moduleList[i-1].active = true
		})

		this.setState({
			moduleList : moduleList
		})


		let me = this ;
		// DataStore.getIdentityTypes().then( data =>{
		// 	console.log(data);
		// 	me.setState({
		// 		identityTypes : data
		// 	})
		// });
	}

	// 选择身份
	onIdentitySelectChange(){
		let identityInfo = this.state.identityInfo;
		identityInfo.type = parseInt(this.refs.identity_select.value);
		this.setState({
			identityInfo : identityInfo
		})
	}

	//选择是否可编辑
	onEditSelectChange(e){
		this.setIdentityInfo('rw' , parseInt(e.target.value)) ;
	}

	// 返回
	onBackClick(){
		hashHistory.push("/main/identity");
	}

	// 保存数据到后台
	onSaveClick(){

		let moduleList = this.state.moduleList;
		let identityInfo = this.state.identityInfo;

		//用来存放选择的模块
		let choosedModule = [];

		moduleList.forEach( (module , index)=>{
			if(module.active){
				choosedModule.push(index+1)
			}
		})
		identityInfo.permission = choosedModule;
		

		let flag = true ;
		let errorList = [];
		
		if(identityInfo.identityType == 0){
			message.error("请选择职级类别");
			return ;
		}

		if(identityInfo.rw == 0){
			message.error("请选择编辑权限");
			return ;
		}

		if(identityInfo.permission.length == 0){
			message.error("请选择可查看的模块");
			return ;
		}




		// identityInfo.userName = md5(identityInfo.userName);
		// identityInfo.password = md5(identityInfo.password);
		let obj = Object.assign({} , identityInfo ,  {
			password : md5(identityInfo.password)
		})

		if(__DEV__){
			// console.log(obj);
		}else{
			
			if(this.state.operating == 0 ){		//新建
				DataStore.saveIdentityInfo(obj).then( ()=>{
					message.success("新建职位成功");
					hashHistory.push("/main/identity");
				});
			}else{
				DataStore.saveIdentityInfo(obj).then( ()=>{
					message.success("保存职位成功");
					hashHistory.push("/main/identity");
				});
			}
		}
		

	}

	onUserNameChange(e){
		this.setIdentityInfo('username' , e.target.value.trim())
	}

	onPasswordChange(e){
		this.setIdentityInfo('password' , e.target.value.trim());
	}

	onPhoneChange(e){

		this.setIdentityInfo('phone' , e.target.value.trim());

	}

	setIdentityInfo(prop , value){
		let identityInfo = this.state.identityInfo;
		identityInfo[prop] = value;
		this.setState({
			identityInfo : identityInfo
		})
	}


	onModuleChoose(module , index){

		let moduleList = this.state.moduleList;

		moduleList[index].active = !moduleList[index].active;

		this.setState({
			moduleList : moduleList
		})
	}

	isOpenWxCheckClick(){
		let identityInfo = this.state.identityInfo;
		identityInfo.canScan = !identityInfo.canScan ? 1 : 0
		this.setState({
			identityInfo : identityInfo
		})
	}


	render() {
		return (
			<div className="identity-edit-wrap">
				<div className="edit-top">
					<div className="top-nav">
						<div onClick={this.onBackClick} className="back">
						</div>
						<span onClick={this.onBackClick} className="parent">职级管理</span>
						<span>/</span>
						<span className="current">{ this.state.operating ? '编辑职位' : '新建职位' }</span>
					</div>

					<div className="save" onClick={this.onSaveClick}>
					</div>
				</div>

				<div className="edit-content">
					<div className="content-form">
						
						<div className="form-item">
							<span className="label">职级类别:</span>
							<select ref="identity_select" onChange={this.onIdentitySelectChange} value={this.state.identityInfo.identityType}>  
								<option value="0">请选择</option>
								<option value ="2">管理员</option>  
								<option value ="3">员工</option>  
							</select>  
						</div>

						<div className="form-item">
							<span className="label">账号:</span>
							<input type="text" placeholder="可设置为使用者姓名拼音" value={this.state.identityInfo.username} onChange={(e)=>this.onUserNameChange(e)}/>
						</div>

						<div className="form-item">
							<span className="label">密码:</span>
							<input type="password" placeholder="设置该账号登录密码" value={this.state.identityInfo.password} onChange={ (e)=> this.onPasswordChange(e) }/>
						</div>

						<div className="form-item">
							<span className="label">联系电话:</span>
							<input type="text" placeholder="请输入该账号联系电话" value={this.state.identityInfo.phone} onChange={ (e)=> this.onPhoneChange(e)} />
						</div>

						<div className="form-item">
							<span className="label">查看编辑:</span>
							<select ref="edit_select" onChange={(e)=>this.onEditSelectChange(e)} value={this.state.identityInfo.rw}>  
								<option value="0">请选择</option>
								<option value="1">可编辑</option>
								<option value="2">仅查看</option>
							</select>
						</div>

						<div className="form-item">
							<span className="label">开启微信验证:</span>
							<div className={this.state.identityInfo.canScan ? 'checkbox checked' : 'checkbox'} onClick={this.isOpenWxCheckClick}></div>
						</div>

						<div className="form-item">
							<span className="label">选择模块:</span>
							<div className="menu-list">

								{
									this.state.moduleList.map( (module , index)=>{
										return <span key={index} onClick={()=>this.onModuleChoose(module , index)} className={module.active ? 'active' : ''}>{module.text}</span>
									})
								}
								
							</div>
						</div>


					</div>
				</div>

			</div>
		)
	}
}