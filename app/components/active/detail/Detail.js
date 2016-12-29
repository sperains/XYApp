
import React , {Component} from 'react';
import { Table } from 'antd';
import DataStore from '../../../utils/DataStore.js' ;
import { hashHistory } from 'react-router';
import './detail.scss';


const data = [];
for (let i = 0; i < 460; i++) {
	data.push({
		key: i,
		name: `Edward King ${i}`,
		phone : 15623551300,
		age: Math.ceil(Math.random()*50),
		address: `London. ndon.ndon.${i}`,
		wechatNickname : 'wechat' + i ,
		checkInStatus : Math.round(Math.random()),
		sex : Math.round(Math.random()),
		wechatId : 'fjfkasjdlfjlksdasdadsdasdasdasdasd' + i,
		province : '',


	});
}






export default class Detail extends Component{

	constructor(props) {
		super(props);
		this.state = {
			title : '',
			enrollList : [],
			page : 1
		}
		this.onBackClick  = this.onBackClick.bind(this);
		this.onExportToExcel = this.onExportToExcel.bind(this);
	}


	onBackClick(){
		hashHistory.push('/main/active');
	}

	onExportToExcel(){
		const location = hashHistory.getCurrentLocation()
		let id = location.state.record.id
		// DataStore.exportToExcel({id : id}).then( () => console.log("export success"));

		window.location.href = "http://" + __SERVER_URL__ + "services/ExcelServlet?" + 'key=' + JSON.stringify({id : id , exportType : 2});

	}
	componentDidMount() {
		const location = hashHistory.getCurrentLocation()

		if(!location.state){
			hashHistory.push("/main/active");
			return ;
		}

		this.setState({
			title : location.state.title
		})
		DataStore.getEnrollList({
			id : location.state.record.id
		}).then(  data => {

			this.setState({
				enrollList : data
			})
		})
	}

	render() {

		const columns = [
			{ title: '序号',fixed: 'left',width : 50 , render : (value , record , index) => (this.state.page-1)* 15 + index + 1   }, 
			{ title: '姓名',dataIndex: 'name',fixed: 'left',width : 120}, 
			{ title: '电话', dataIndex: 'phone' ,width : 120 }, 
			{ title: '年龄', dataIndex: 'ageGroup' , width : 120 , render : value => {
				let str = '';
				switch(value){
					case 1 : str = '20岁及以下'; break;
					case 2 : str = '21~30岁'; break;
					case 3 : str = '31~40岁'; break;
					case 4 : str = '41~50岁'; break;
					case 5 : str = '51~60岁'; break;
				}
				return str;
			}},
			{ title : '签到状态', dataIndex:'checkInStatus' ,width : 120 , render : value => <div className={value == 1 ? 'check' : value== 0 ? 'uncheck' : ''}></div> },
			{ title : '性别', dataIndex : 'sex' , width : 120 , render : value =>  value== 1 ? '男' : value==2 ? '女' : ''},
			{ title : '微信号', 	dataIndex : 'wechatId' ,width : 120 , render : value => <a title={value}>{value}</a>},
			{ title : '地址', dataIndex : 'address' , width : 550 , render : value => <a style={{width : '534px'}} title={value}>{value}</a> },
			{ title : '工作单位' , dataIndex : 'company' ,width : 120 ,render : value => <a title={value}>{value}</a>},
			{ title : '职位' , dataIndex : 'job' ,width:120 ,render : value => <a title={value}>{value}</a>},
			{ title : '学历' , dataIndex : 'educational' ,width : 120},
			{ title : '疾病记录' , dataIndex : 'diseaseRecord'  },
			{ title : '茶道课程' , dataIndex : 'teaCeremony' ,width : 120 , render : value => <a title={value}>{value == 1 ? '是' : '否' }</a>},
			{ title : '喜悦活动' , dataIndex : 'xiyueActive' ,width : 120 ,render : value => <a title={value}>{value == 1 ? '是' : '否'}</a> }
		];


		const pagination = {
			total: this.state.enrollList.length,
			showSizeChanger: false,
			defaultPageSize : 15,
			onShowSizeChange: (current, pageSize) => {
				console.log('Current: ', current, '; PageSize: ', pageSize);
			},
			onChange: (current) => {
				console.log('Current: ', current);
				this.setState({
					page : current
				})
			},
		};

		return (
			<div className="detail-wrap">
				<div className="detail-top">
					<div className="nav">
						<div className="back" onClick={this.onBackClick}></div>
						<span className="parent" onClick={this.onBackClick}>喜悦活动</span>
						<span> / </span>
						<span className="title">{this.state.title}</span>
						<span> / </span>
						<span className="current">报名详情</span>
					</div>
					<div className="export" onClick={this.onExportToExcel}></div>
				</div>

				<div className="detail-content">
					 <Table columns={columns} dataSource={this.state.enrollList} pagination={pagination} scroll={{ x:columns.length * 120 + 1000  }} />
				</div>
			</div>
		)
	}	
}