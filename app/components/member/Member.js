
import React , {Component} from 'react';
import { Table  , Dropdown , Menu , Icon , message , Modal } from 'antd';
import DataStore from '../../utils/DataStore.js' ;
import { hashHistory } from 'react-router';
import { alertMessage } from '../../utils/Verification';
import './member.scss';
const confirm = Modal.confirm;

export default class Member extends Component{

	constructor(props) {
		super(props);
		this.state = {
			memberList : [],
			page : 1,  //当前页数
			loading : true
		}
		this.getWidth = this.getWidth.bind(this);
		this.onIdentityChoose = this.onIdentityChoose.bind(this);
		this.onDetailClick = this.onDetailClick.bind(this);
		this.onExportClick = this.onExportClick.bind(this);
	}

	componentDidMount() {

		let me = this ;
		DataStore.getMemberList().then( (data) => me.setState({
			memberList : data,
			loading : false
		}))
	}

	getWidth(arr){
		let sum = 0 ;
		arr.forEach( a => sum+= a.width );
		console.log(sum)
		return sum;
	}

	// 修改身份
	onIdentityChoose(item) {
		let me = this ;
		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		// 获取设置的身份
		let identity = parseInt(item.key);
		//获取当前行的数据
		let record = item.item.props.item.record;
		//获取当前行数据在当前页中的下标
		let pageIndex = item.item.props.item.index;
		//计算当前行数据在会员列表数组中的下标 (page-1)*pageSize + index
		let index = (me.state.page-1)* 15 + pageIndex ;
		//获取会员列表
		let memberList = me.state.memberList;

		// 选中的就是当前身份,无需提交数据
		if(identity == record.identity){
			return ;
		}
		// console.log(identity , record);

		let name =  record.name || record.nickname;
		let currentIdentityName =   record.identity == 1 ? '普通会员' : record.identity == 2 ? '高级会员' : '堂主';
		let newIdentityName = identity == 1 ? '普通会员' : identity == 2 ? '高级会员' : '堂主';
		// 确认框
		confirm({
			title: `确认将${name}的级别从[${currentIdentityName}]修改为[${newIdentityName}]吗？` ,
			onOk() {
				let obj = { id : record.id , level : identity };
				DataStore.updateMemberLevel(obj).then( ()=> {
					memberList[index].identity = identity;
					me.setState({
						memberList : memberList
					})
				})
			},
			onCancel(){},
			// width : 120,
			okText : '确定',
			cancelText : '取消'
		});
		
	};

	onDetailClick(value , record , index){
		// console.log(value);
		// console.log(record);
		// 普通会员因为属于最底层所以没有详情.
		if(record.identity == 1 ){
			return ;
		}

		hashHistory.push({
			pathname : '/main/member-detail',
			state : {
				record : record
			}
		})
	}

	onExportClick(){
		window.location.href = "http://" + __SERVER_URL__ + "services/ExcelServlet?" + 'key=' + JSON.stringify({ exportType : 1});
	}


	render() {
		

		const columns = [
			{ title: '序号', width : 50 ,render : (value , record , index) => (this.state.page-1)*15 + index + 1 }, 
			{
				title: '姓名',
				dataIndex: 'name',
				// render: text => <a href="#">{text}</a>,
				// fixed: 'left',
				width : 120,
				render : value => <a title={value}>{value}</a>
			}, 
			{ title: '电话', dataIndex: 'phone' ,width : 100 ,render : value => <a title={value}>{value}</a>}, 
			{ title: '出生日期', dataIndex: 'birthday' , width : 120 , render : value => <a title={value}>{value}</a> },
			{ title: '微信昵称', dataIndex:'nickname' , width : 100 ,render : value => <a title={value}>{value}</a> },
			{ title : '能量总额', dataIndex:'totalScore' ,width : 120  },
			{ title : '捐款总额', dataIndex : 'donatedMoney' , width : 120},
			{ title : '邀请人', 	dataIndex : 'inviter' ,width : 100 },
			{ title : '身份', dataIndex : 'identity' , width : 100 , render : (value , record , index) => 
				{	
					const menu = (
						<Menu onClick={this.onIdentityChoose}>
							<Menu.Item key="1" item={{ record : record , index : index}}>普通会员</Menu.Item>
							<Menu.Item key="2" item={{ record : record , index : index}}>高级会员</Menu.Item>
							<Menu.Item key="3" item={{ record : record , index : index}}>堂主</Menu.Item>
						</Menu>
					);

					let str = "";
					switch(value){
						case 1 : str = "普通会员";break;
						case 2 : str = "高级会员";break;
						case 3 : str = "堂主";break;
					}

					return (
						<Dropdown overlay={menu} trigger={['click']}>
						    <div className="ant-dropdown-link" >
						      <span>{str}</span><div className="dropdown-icon"></div>
						    </div>
						</Dropdown>
					)
				}
				// value == 0 ? '堂主' : value==1 ? '高级会员' :'普通会员' 
			},
			{ title : '详情' , dataIndex : 'detail' ,width : 80 , render : (value , record , index) => (<a style={{ color : record.identity == 1 ? 'gray' : '' , cursor : record.identity == 1 ?'default' : 'pointer'}} className="row-detail" onClick={ () =>this.onDetailClick(value , record , index)}>详情</a>) }
		];

		const pagination = {
			total: this.state.memberList.length,
			showSizeChanger: false,
			defaultPageSize : 15,
			onShowSizeChange: (current, pageSize) => {
				console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange: (current) => {
				console.log('Current: ', current);
				this.setState({
					page  : current
				})
			}
		};


		return (
			<div className="member-wrap">
				<div className="member-top">
					<span>会员管理</span>
					<div className="export" onClick={this.onExportClick}></div>
				</div>


				<div className="member-content">
					<Table loading={this.state.loading} columns={columns} dataSource={this.state.memberList} pagination={pagination} scroll={{ x: 1080 }} />
				</div>

			</div>
		)
	}
}