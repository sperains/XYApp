
import React ,{ Component} from 'react';
import './scoreRank.scss';
import {Table ,Spin} from 'antd';
import { hashHistory } from 'react-router';
import DataStore from '../../utils/DataStore.js' ;

const uuid = require('uuid');

const columns = [
	{ title: '名	次',dataIndex: 'rankIndex',width : 100}, 
	{ title: '昵称(姓名)', dataIndex: 'name' ,width : 150 }, 
	{ title : '手机号', dataIndex:'phone' ,width : 120  },
	{ title: '身	份', dataIndex: 'identity' , width : 100 , render : value => {
		let str = '';
		switch(value){
			case '1' : str = '普通会员'; break;
			case '2' : str = '高级会员'; break;
			case '3' : str = '堂主'; break;
		}
		return str;
	}},

	{ title : '喜悦活动能量', dataIndex:'activeScore' ,width : 120  },
	{ title : '生命数字能量', dataIndex : 'numberScore' , width : 120},
	{ title : '正念生活能量', dataIndex : 'lifeScore' ,width : 120 },
	{ title : '捐赠能量', dataIndex : 'donationScore' , width : 100},
	{ title : '能量总额' , dataIndex : 'totalScore' ,width : 100 } ,
	{ title : '详	情' , dataIndex : 'detail' ,width:100 ,render : (value , record) => <span style={{color : 'blue'}} onClick={()=>onScoreRankDetailClick(record)} className="score-rank-table-row-detail">详	情</span>},
];

// 进入积分详情
function onScoreRankDetailClick(record){
	hashHistory.push({
		pathname : '/main/score-detail',
		state : record
	});
}

export default class ScoreRank extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data : props.scoreData,
			loading : true
		}
	}

	componentDidMount() {
		let me = this ;
		DataStore.getIntegralRank().then( (data)=>{
			me.setState({
				data :data,
				loading :false
			})
		});
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
			<div className="score-rank">
				<Spin spinning={this.state.loading} tip='加载中'>
				<Table columns={columns} dataSource={this.state.data} pagination={pagination} scroll={{ x:columns.length * 120  }} />
				</Spin>
			</div>
		)
	}
}