
import React , {Component} from 'react';
import './score.scss';
import ScoreSetting from './ScoreSetting';
import ScoreRank from './ScoreRank' ;
import { hashHistory } from 'react-router';
import DataStore from '../../utils/DataStore.js' ;
import {message } from 'antd';
import Confirm from '../common/modal/Confirm';
import { alertMessage } from '../../utils/Verification';
const uuid = require('uuid');

const data = [
	{  id:uuid() , name: '喜悦捐赠' , rule : 1 , ruleName: '分/元' , isOpen : 1},
	{  id:uuid() , name: '活动报名' , rule : 2 , ruleName: '分/次' , isOpen : 0},
	{  id:uuid() , name: '活动签到' , rule : 2 , ruleName: '分/次' , isOpen : 0},
	{  id:uuid() , name: '生命数字' , rule : 2 , ruleName: '分/次' , isOpen : 1},
	{  id:uuid() , name: '正念静坐' , rule : 2 , ruleName: '分/次' , isOpen : 1},
	{  id:uuid() , name: '正念行走' , rule : 2 , ruleName: '分/次' , isOpen : 0},
	{  id:uuid() , name: '正念用餐' , rule : 2 , ruleName: '分/次' , isOpen : 1},
]

const data1 = [];

export default class Score extends Component{

	constructor(props) {
		super(props);
		this.state = {
			tabs : [
				{ text : '能量设置'  , active : true } ,
				{ text : '能量排名'  , active : false }
			],
			integralRuleList : [] ,				//积分设置
			integralRankList : []	,			//积分排名
			currentTab : 0 ,
			confirmDisplay : false


		}
		this.onTabChange = this.onTabChange.bind(this);
		this.onSaveAndExportClick = this.onSaveAndExportClick.bind(this);
		this.onIntegralRuleChange = this.onIntegralRuleChange.bind(this);
		this.onConfirmSaveClick = this.onConfirmSaveClick.bind(this);
		this.onConfirmCancelClick = this.onConfirmCancelClick.bind(this);
	}

	componentWillMount() {
		let me = this ;
		let tabs = this.state.tabs;
		let currentTab = this.state.currentTab;
		let location = hashHistory.getCurrentLocation();
		let st = location.state || 0 ;

		tabs.map( (tab,index)=>{
			if( index == st){
				tab.active = true;
			}else{
				tab.active = false;
			}
		})

		me.setState({
			tabs : tabs,
			location : location
		})

	}

	componentWillUnmount() {
	}


	componentDidMount() {
	}

	onSaveAndExportClick(){



		let me = this ;

		let tabs = this.state.tabs;

		let integralRuleList = me.state.integralRuleList;

		tabs.map( (tab , index )=>{

			if(tab.active){
				if(index== 0){	//保存

					let userInfo = Cookies.getJSON("userInfo");
					if(userInfo.rw == 2 ){
						alertMessage();
						return ;
					}

					if(integralRuleList.length == 0 ){
						message.info("没有需要修改的内容.")
						return ;
					}

					DataStore.setIntegralRule(this.state.integralRuleList).then(()=>{
						message.success("修改成功")
						me.setState({
							integralRuleList : []
						})
					});
				}

				if(index == 1 ){	//导出
					window.location.href = "http://" + __SERVER_URL__ + "services/ExcelServlet?" + 'key=' + JSON.stringify({exportType : 3});
				}
			}
		});
	}

	onIntegralRuleChange(items){
		this.setState({
			integralRuleList : items
		})
	}

	// 保存修改
	onConfirmSaveClick(){
		let me = this ;
		let currentTab = this.state.currentTab;

		let tabs = this.state.tabs;
		
		tabs.map( (tab, index) =>{

			if(index == currentTab){
				tab.active = true;
			}else{
				tab.active = false;
			}
			return tab;
		})

		if(__DEV__){
			me.setState({
				confirmDisplay : false,
				integralRuleList : []
			})
		}else{
			DataStore.setIntegralRule(this.state.integralRuleList).then( ()=>{
				me.setState({
					confirmDisplay : false,
					tabs : tabs,
					integralRuleList : []
				})
				message.success("保存成功");
			});
		}
		
		
	}

	onConfirmCancelClick(){

		let currentTab = this.state.currentTab;

		let tabs = this.state.tabs;
		
		tabs.map( (tab, index) =>{

			if(index == currentTab){
				tab.active = true;
			}else{
				tab.active = false;
			}
			return tab;
		})

		this.setState({
			confirmDisplay : false,
			tabs : tabs,
			integralRuleList : []

		})
	}

	onTabChange(tab , i){	
		let tabs = this.state.tabs;
		let integralRuleList = this.state.integralRuleList;

		if(i ==  1 ){
			if(integralRuleList.length > 0){
				this.setState({
					confirmDisplay : true,
					currentTab : i 
				})
				return ;
			}
		}

		tabs.map( (tab, index) =>{

			if(index == i){
				tab.active = true;
			}else{
				tab.active = false;
			}
			return tab;
		})

		this.setState({
			tabs : tabs
		})
	}


	render() {
		return (
			<div className="score-wrap">
				<div className="score-top">
					<div className="tabs">
						{
							this.state.tabs.map( (tab, i) =>{
								return (
									<span onClick={()=>this.onTabChange(tab, i)} key={i} className={tab.active ? 'active' : ''}>{tab.text}</span>
								)
							})
						}
					</div>
					<div className={this.state.tabs[0].active ?  'save' : 'export'} onClick={this.onSaveAndExportClick}>
					</div>
				</div>

				<div className="score-content">
					{
						this.state.tabs.map( (tab, index) =>{
							if(tab.active){
								if(index == 0 ){
									return <ScoreSetting items={this.state.integralRuleList} key={index} setIntegralRule={this.onIntegralRuleChange}  />
								}else{
									return <ScoreRank scoreData = {this.state.integralRankList} key={index} />
								}
							}
						} )
					}
				</div>

				<Confirm display={this.state.confirmDisplay} title={'保存修改'} text={'您的内容已做修改，是否保存？'} onSave={this.onConfirmSaveClick} onCancel={this.onConfirmCancelClick}/>
			</div>
		)
	}
}