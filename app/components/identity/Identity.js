
import React , {Component} from 'react';
import './identity.scss';
import {Table , message , Spin} from 'antd'
import DataStore from '../../utils/DataStore.js' ;
import Confirm from '../common/modal/Confirm';
import { hashHistory } from 'react-router';
import { alertMessage , checkPath } from '../../utils/Verification';

export default class Identity extends Component{

	constructor(props) {
		super(props);
		this.state = {
			data : []	,		//职位列表
			loading : true
		}
		this.onNewIdentityClick = this.onNewIdentityClick.bind(this);
		this.onIdentityEditClick = this.onIdentityEditClick.bind(this);
		this.onIdentityEditClick = this.onIdentityEditClick.bind(this);
		this.delIdentity = this.delIdentity.bind(this);
	}	

	componentWillMount() {
		let location = hashHistory.getCurrentLocation();
		let pathname = location.pathname;

		let flag = checkPath(pathname);

		if(!flag){
			hashHistory.replace("/error");
		}
	}

	componentDidMount() {
		let me = this ;
		DataStore.getIdentityInfo().then(data => {
			// console.log(data)
			me.setState({
				data :data,
				loading : false
			})
		});
	}

	// 新建职位
	onNewIdentityClick(){

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		hashHistory.push({
			pathname : '/main/identity-edit',
			state : {
				operating : 0 			//0表示新建
			}
		});
	}

	// 编辑职位
	onIdentityEditClick(record){
		let userInfo = Cookies.getJSON("userInfo");
		if(record.type == 1){
			return ;
		}

		//只读账户不能编辑或者删除
		if(userInfo.rw == 2 ){
			alertMessage()
			return ;
		}

		hashHistory.push({
			pathname : '/main/identity-edit',
			state : {
				operating : 1 ,
				record : record
			}
		})
	}

	// 点击删除按钮弹出确认窗口
	onIdentityDelClick(record){
		let me = this ;
		let userInfo = Cookies.getJSON("userInfo");

		// 超级管理员不能修改或者删除 ,  
		if(record.type == 1 ){
			return ;
		}
		//只读账户不能编辑或者删除
		if(userInfo.rw == 2 ){
			alertMessage()
			return ;
		}

		if(__DEV__){
			message.info("测试环境,调用删除接口" , record.id);
		}else{

			me.setState({
				delConfirmDisplay : {
					display : true ,
					title : '确认删除',
					text : '是否确认删除该职位?',
					onSave : function(){
						me.delIdentity(record.type , record.id)
					},
					onCancel : function(){
						me.setState({
							delConfirmDisplay : {
								display : false
							}
						})
					}
				}
			})
			
		}
	}

	// 删除职级
	delIdentity(type , id){
		// console.log(type);
		if(type == 1 ){
			return ;
		}
		let me = this ;
		let identityList = me.state.data;
		DataStore.delIdentityInfo({id : id}).then( data =>{
			identityList = identityList.filter( (identity)=> identity.id != id);
			message.success("删除成功");
			me.setState({
				data : identityList,
				delConfirmDisplay : {
					display : false
				}
			})
		}).catch( error =>message.error("删除失败") );
	}

	render() {

		const columns = [
			{ title: '职级名称',dataIndex: 'type',width : 120 , render : value => { 
					let str = ""
					if(value == 1 ){
						str = "超级管理员";
					}
					if(value == 2 ){
						str = "管理员"
					}
					if(value == 3 ){
						str = "员工"
					}
					return str;
				}
			}, 
			{ title: '账号', dataIndex: 'username' , width : 120 }, 
			// { title: '密码', dataIndex: 'password' , width : 120 }, 
			{ title : '电话' , dataIndex : 'phone' ,width:120 },
			{ title : '查看/编辑' , dataIndex : 'rw' ,width:120 , render : value => { 
					let str = ""
					if(value == 1 ){
						str = "可编辑";
					}
					if(value == 2 ){
						str = "仅查看"
					}
					return str;
				}
			},
			{ title : '模块权限' , dataIndex : 'permission' , render : (value)=>{
					//将数组中的1-7替换为相应文字
					value = value.map( i =>{
						switch(i){
							case 1 : return '会员管理';
							case 2 : return '线下活动';
							case 3 : return '正念训练';
							case 4 : return '生命数字';
							case 5 : return '喜悦能量';
							case 6 : return '喜悦捐赠';
							case 7 : return '用户反馈';
							case 8 : return '职级管理';
						}
					})
					//将数组的元素转换为字符串,中间以'/'分割
					return value.join("/");
				} 
			},
			{ title : '操作' , dataIndex : 'setting' , width:180 , render : (value , record) =>{

					let userInfo = Cookies.getJSON('userInfo');

					// console.log(userInfo.rw);

					let styleObj = {
						cursor : record.type == 1 || userInfo.rw == 2 ? 'default' : 'pointer',
						color : record.type == 1 || userInfo.rw == 2 ? 'gray' : 'blue',
						margin : '0 5px'
					};
				 	return (
				 		<div>
				 			<span style={styleObj}  onClick={()=>this.onIdentityEditClick(record)}>编辑</span> 
				 			<span style={styleObj} onClick={()=>this.onIdentityDelClick(record)}>删除</span>
				 		</div>
				 	)
			 	}
			}
		];


		const pagination = {
			total: this.state.data.length,
			showSizeChanger: false,
			defaultPageSize : 15,
			onShowSizeChange: (current, pageSize) => {
				// console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange: (current) => {
				// console.log('Current: ', current);
			},
		};

		return (
			<div className="identity-wrap">
				<div className="identity-top">
					<span>职级管理</span>
					<div onClick={this.onNewIdentityClick} className="new"></div>
				</div>

				<div className="identity-content">
					<Spin spinning={this.state.loading} tip='加载中'>
					<Table columns={columns} dataSource={this.state.data} pagination={pagination} scroll={{ x:columns.length * 120 + 400  }} />
					</Spin>
				</div>
				<Confirm {...this.state.delConfirmDisplay} />
			</div>
		)
	}
}