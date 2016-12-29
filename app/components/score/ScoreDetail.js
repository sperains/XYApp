
import React , {Component} from 'react';
import './ScoreDetail.scss';
import { hashHistory } from 'react-router';
import { Table } from 'antd';
import DataStore from '../../utils/DataStore.js' ;

const columns = [
	{ title: '项	目',dataIndex: 'item',width : 120}, 
	{ title: '时	间', dataIndex: 'time'  }, 
	{ title : '能	量	' , dataIndex : 'score' ,width:120 }
];

const columns1 = [
	{ title: '时	间', dataIndex: 'time' ,width : 400 }, 
	{ title : '积	分' , dataIndex : 'score' ,width:480 }
];



export default class ScoreDetail extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tabs : [
				{ text : '全部能量' , active : true , type : 0 },
				{ text : '线下活动能量' , active : false , type : 1 },
				{ text : '生命数字能量' , active : false , type : 2 },
				{ text : '正念训练能量' , active : false , type : 3},
				{ text : '捐赠能量' , active : false , type : 4 },
			],
			data : [],
			currentColumns : columns , 
			currentData : []
		}
		this.onBackClick = this.onBackClick.bind(this);
		this.onTabChange = this.onTabChange.bind(this);
	}

	componentDidMount() {
		let me = this ;
		// 获取路由参数
		let record = hashHistory.getCurrentLocation().state;

		if(!record){
			hashHistory.push("/main/score");
			return ;
		}

		DataStore.getScoreDetail({id : record.id}).then( (data)=>{
			me.setState({
				data : data ,
				currentData : data ,
				name : record.name
			})
		})
	}

	onBackClick(){
		hashHistory.push({
			pathname : '/main/score',
			state : 1
		});
	}

	onTabChange(tab , index){
		let tabs = this.state.tabs;
		let currentColumns = this.state.currentColumns;
		let currentData = this.state.currentData;
		let data = this.state.data;

		// index为0 时表示显示所有积分 , 此时表格中含有项目一列
		if(index == 0 ){
			currentColumns  = columns;
			currentData = data;
		}else{	//index不为0 时表示显示某一具体项目的积分., 此时表格中不再有项目一列

			currentColumns  = columns1;
			//过滤出相应数据
			currentData = data.filter( item => item.type == index);
		}


		tabs.map( (tab , i)=>{
			if(i == index){
				tab.active = true;
			}else{
				tab.active = false;
			}
		});
		this.setState({
			tabs : tabs,
			currentColumns : currentColumns,
			currentData : currentData
		})
	}

	render() {

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
			<div className="score-detail">
				<div className="score-detail-top">
					<div className="nav">
						<div className="back" onClick={this.onBackClick}></div>
						<span className="parent" onClick={this.onBackClick}>喜悦能量</span>
						<span> / </span>
						<span className="current">能量详情</span>
					</div>
					<div className="save">
					</div>
				</div>

				<div className="score-detail-content">
					<div className="username">{this.state.name}</div>
					<div className="content-tab">

						{
							this.state.tabs.map( (tab, index)=>{
								return (
									<span onClick={() =>this.onTabChange(tab,index)} key={index} className={tab.active ? 'active' : ''}>{tab.text}</span>
								)
							})
						}
					</div>
					<Table columns={this.state.currentColumns} dataSource={this.state.currentData} pagination={pagination} />
				</div>
			</div>
		)
	}
}
