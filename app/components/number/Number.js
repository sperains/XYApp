import React , {Component} from 'react';
import './number.scss';
import DataStore from '../../utils/DataStore.js' ;
import { Tabs , Modal, Button , message , Spin } from 'antd';
import owl from '../../utils/deepCopy.js';
import Assign from '../../utils/Assign.js';
import Confirm from '../common/modal/Confirm';
import { alertMessage } from '../../utils/Verification';
const TabPane = Tabs.TabPane;
const uuid = require('uuid');
const confirm = Modal.confirm;
var equal = require('equals');

// let b = owl.deepCopy(a);



export default class Number extends Component{

	constructor(props) {
		super(props);
		this.state = {
			currentNum : [1 , 1] ,
			bodyHeight : $(document).height() - 210,
			tabs : [
				{ name : '命运数'  , active : true , pageNum : [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9] , currentNum : 1  },
				{ name : '天赋数'  , active : false , pageNum : [ 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 0] , currentNum : 1 }
			],
			numDetail : [],
			fateNumList : [],			//命运数 数组
			talentNumList : [] , 			//天赋数 数组
			fateInfo : {					//当前命运数信息
				desc : "" , natureadv : "" , natureweak : "" , details : []
			} , 			 	
			talentInfo : {				//当前天赋数信息
				keyword : "" , details : []
			} , 				
			dataDidLoad : false,
			confirmDisplay : false,			//是否显示确认框
			delDisplay : false,				//是否显示删除确认框
			modalDisplay : false ,
			detailMaxLength : 10 ,			//详解最大数量
			delDetailIndex : '',				//当前删除的详解下标,
			loading : true
		}
		this.onNumberClick = this.onNumberClick.bind(this);
		this.onTabChange = this.onTabChange.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.onNewDetail = this.onNewDetail.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onModalClick = this.onModalClick.bind(this);
		this.onDescChange = this.onDescChange.bind(this);
		this.onKeywordChange = this.onKeywordChange.bind(this);
		this.onNatureAdvChange = this.onNatureAdvChange.bind(this);
		this.onNatureWeakChange = this.onNatureWeakChange.bind(this);
		this.onNewFateNumDetail = this.onNewFateNumDetail.bind(this);
		this.onNewTalentNumDetail = this.onNewTalentNumDetail.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onDelDetailClick = this.onDelDetailClick.bind(this);
		this.onDelDetail = this.onDelDetail.bind(this);
	}

	componentWillMount() {
	// 为窗口添加resize事件
		window.addEventListener('resize', this.handleResize);  
		this.context.router.setRouteLeaveHook(
			this.props.route,
			this.routeWillLeave
		)
	}

	routeWillLeave(nextLocation){
		// console.log(nextLocation);
		return true;
		// return `Leave for next Location ${nextLocation.pathname}`;
		// return <h1>asdfasdf</h1>
	}

	componentDidMount() {
		DataStore.getNumDetail().then(  (data) => {


			this.setState({
				numDetail : data,
				fateNumList : data[0].infolist,
				talentNumList : data[1].infolist,
				originalFateNumList : owl.deepCopy( data[0].infolist),
				originalTalentNumList : owl.deepCopy( data[1].infolist),
				dataDidLoad : true,
				fateInfo: Object.assign(this.state.fateInfo , data[0].infolist[0] ) ,
				talentInfo : Object.assign(this.state.talentInfo , data[1].infolist[0] ),
				loading : false
			})
		} )
	}

	// 组件卸载时移除事件
	componentWillUnmount() {
		window.removeEventListener('resize' , this.handleResize);
	}

	// 处理resize事件,当页面尺寸发生变化时,重新设置页面的高度
	handleResize(){
		this.setState({
		bodyHeight : $(document).height() - 210
		})
	}


	// 添加详解
	onNewDetail(){
		//获取当前是命运数还是天赋数
		let tabs = this.state.tabs;
		let numDetail = this.state.numDetail;
		let fateNumList = this.state.fateNumList;
		let talentNumList = this.state.talentNumList;
		tabs.map(  (tab , index) =>{
			if(tab.active){
				// numDetail[index].infolist[ tab.currentNum == 0 ? 9 : tab.currentNum - 1 ].details.push({
				// 	id : 'detail' + numDetail[index].infolist[ tab.currentNum == 0 ? 9 : tab.currentNum - 1 ].details.length
				// })
				if(index == 0){
					fateNumList[tab.currentNum - 1 ].details.push({
						id : uuid() 
					})
				}else{
					if(tab.currentNum == 0){
						talentNumList[9].details.push({
							id : uuid()
						})
					}else{
						talentNumList[tab.currentNum-1].details.push({
							id : uuid()
						})
					}
				}

			}
		});
		this.setState({
			numDetail : numDetail
		})
	}


	// 点击删除详解按钮触发逻辑
	onDelDetailClick(detail , index){

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		// this.setState({
		// 	delDisplay : true ,
		// 	delDetailIndex : index
		// })
		let me = this ;
		me.setState({
			delDetailIndex : index,
			delDetailConfirm : {
				display : true ,
				title : '删除详解',
				text : '确认删除该详解？',
				onSave : function(){
					me.onDelDetail(function(){
						me.setState({
							delDetailConfirm : {
								display : false
							}
						})
					});
				},
				onCancel : function(){
					me.setState({
						delDetailConfirm : {
							display : false
						}
					})
				}
			}
		})

		
	}

	// 删除详解
	onDelDetail( callback ){

		let index = this.state.delDetailIndex;

		let tabs = this.state.tabs;
		let fateNumList = this.state.fateNumList;
		let talentNumList = this.state.talentNumList;
		tabs.map( (tab , i) =>{
			if(tab.active){
				let currentIndex = tab.currentNum == 0 ? 9 : tab.currentNum-1 ;
				if(i == 0){	//命运数

					let details = fateNumList[currentIndex].details;

					details.splice(index , 1);
					if(__DEV__){
						this.setState({
								fateNumList : fateNumList,
							})
						callback();
					}else{
						DataStore.updateNumInfo(fateNumList[currentIndex]).then( () =>{
							this.setState({
								fateNumList : fateNumList,
							})
							callback();
						})
					}
					
					//获取命运数数组
					

				}else{		//天赋数
					let details = talentNumList[currentIndex].details;

					details.splice(index , 1);
					//获取命运数数组

					if(__DEV__){
						this.setState({
								fateNumList : fateNumList,
							})
						callback();
					}else{
						DataStore.updateNumInfo(talentNumList[currentIndex]).then( () =>{
							this.setState({
								fateNumList : fateNumList,
							})
							callback();
						})
					}
					
				}
			}
		})

	}


	onSaveClick(){

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}
		
		this.setState({
			confirmDisplay : true
		})
	}

	onModalClick(){
		this.setState({
			confirmDisplay : false,
			delDisplay : false
		})
	}

	// 修改操作
	onUpdate( callback ){
		let me = this ;
		let tabs = this.state.tabs;
		let fateInfo = this.state.fateInfo;
		let talentInfo = this.state.talentInfo;
		let fateNumList = this.state.fateNumList;
		let talentNumList = this.state.talentNumList;
		let originalFateNumList = this.state.originalFateNumList;
		let originalTalentNumList = this.state.originalTalentNumList;
		let numInfo = {} ;
		tabs.map( (tab, index) =>{
			//获取当前命运数/天赋数 下标
			let currentIndex = tab.currentNum == 0 ? 9 : tab.currentNum-1;

			// 当前激活的tab
			if(tab.active){
				numInfo = index == 0 ? fateInfo : talentInfo;
				if(index == 0 ){
					fateNumList[currentIndex] = numInfo;
					originalFateNumList[currentIndex] = numInfo;
					this.setState({
						fateNumList : fateNumList,
						originalFateNumList : owl.deepCopy(originalFateNumList)
					})
				}else{
					talentNumList[currentIndex] = numInfo;
					originalTalentNumList[currentIndex] = numInfo;
					this.setState({
						talentNumList : talentNumList,
						originalTalentNumList : owl.deepCopy(originalTalentNumList)
					})
				}
				
			}
			return tab;

		})

		// 去除空详解内容
		for(let i = 0 ,arr = numInfo.details ,  len = arr.length , flag = true ; i < len ; flag ? i :  i++ ){
			if(arr[i] && !arr[i].content){
				arr.splice( i , 1 );
				flag = true ;
			}else{
				flag = false
			}
		}


		if(__DEV__){
			// console.log(numInfo)
			message.info(JSON.stringify(numInfo))
			me.onModalClick();
			if(callback && typeof(callback) == 'function') callback();
		}else{
			DataStore.updateNumInfo(numInfo).then( ()=>{
				message.success("修改成功");
				me.onModalClick();
				if(callback && typeof(callback) == 'function') callback();
			}).catch( (error) =>message.error("未接入修改接口"));
		}

		
	}


	isEquals(obj1,obj2){
		let isEqualTo = true;
		const keys =  Object.keys(obj1);
		for(var index = 0;index < keys.length && isEqualTo;index++){
			const element = keys[index];
			isEqualTo = obj2.hasOwnProperty(element);
			if(!isEqualTo)break;
			if(typeof obj1[element] == "object"){
				isEqualTo = this.isEquals(obj1[element] ,obj2[element]);
			}else if(obj1[element] !== obj2[element]){
				isEqualTo = false;
			}
		}
		return isEqualTo;
	}

	// 切换命运数,天赋数  index==0 命运数 ,index==1 天赋数
	onNumberClick(num , index){

		let originalFateNumList = this.state.originalFateNumList;
		let originalTalentNumList = this.state.originalTalentNumList;


		const me = this;
		let tabs = this.state.tabs;
		let fateInfo = this.state.fateInfo;
		let talentInfo = this.state.talentInfo;
		let flag = true ;

		tabs.map( ( tab , i) => {

			if(tab.active){
				
				if(num == tab.currentNum){
					return ;
				}
				let currentIndex = num == 0 ? 9 : num-1;

				if(i == 0){		//天赋数
					// debugger;
					// fateInfo = Assign.copy(fateInfo , me.state.fateNumList[currentIndex] );
					flag = equal( fateInfo ,  originalFateNumList[tab.currentNum - 1]);
					if(!flag){
						me.setState({
							modalOption : {
								display : true ,
								title : '保存修改',
								content : '您的页面已作出修改，是否保存？' ,
								onSave : function(){
									fateInfo = me.state.fateNumList[currentIndex];
									me.onUpdate( function(){
										me.setState({
											fateInfo : fateInfo,
											modalOption : {
												display : false
											}
										})

									});
									tab.currentNum = num ; 
									return tab;
									
								},
								onCancel : function(){
									let fateNumList = me.state.fateNumList;
									fateNumList[tab.currentNum-1] =Object.assign({} , originalFateNumList[tab.currentNum-1]) ;
									tab.currentNum = num ; 
									fateInfo = fateNumList[currentIndex];
									me.setState({
										fateInfo : fateInfo,
										fateNumList : fateNumList,
										modalOption : {
											display : false
										}
									})
									return tab;
								}
							}
						})
						
						return ;
					}

					fateInfo = me.state.fateNumList[currentIndex];
				}else{			//命运数
					// talentInfo = Assign.copy(talentInfo , me.state.talentNumList[currentIndex])  ;

					flag = equal( talentInfo ,  originalTalentNumList[tab.currentNum - 1]);
					if(!flag){
						me.setState({
							modalOption : {
								display : true ,
								onSave : function(){
									talentInfo = me.state.talentNumList[currentIndex];
									me.onUpdate( function(){
										me.setState({
											talentInfo : talentInfo,
											modalOption : {
												display : false
											}
										})

									});
									tab.currentNum = num ; 
									return tab;
									
								},
								onCancel : function(){
									let talentNumList = me.state.talentNumList;
									let c_index = tab.currentNum == 0 ? 9 : tab.currentNum-1;
									talentNumList[c_index] = Object.assign({} , originalTalentNumList[c_index]); 
									tab.currentNum = num ; 
									talentInfo = talentNumList[currentIndex];
									me.setState({
										talentInfo : talentInfo,
										talentNumList : talentNumList,
										modalOption : {
											display : false
										}
									})
									return tab;
								}
							}
						})
						
						return ;
					}


					talentInfo = me.state.talentNumList[currentIndex];
				}


				tab.currentNum = num;

				return tab;
			}
		})
		this.setState({
			tabs : tabs,
			fateInfo : fateInfo,
			talentInfo : talentInfo
		})
	}


	//tab切换事件
	onTabChange(index){
		let tabs = this.state.tabs;
		tabs.map( 
			(tab, i) => {
				if(index == i){
					tab.active = true ;
				}else{
					tab.active = false;
				}
				return tab;
			} 
		)

		this.setState({
			tabs : tabs
		})
	}

	// 设置命运数概述信息
	onDescChange(e){
		// this.setFateNumInfo('desc' , e.target.value);
		let fateInfo = this.state.fateInfo;
		fateInfo.desc = e.target.value;
		this.setState({
			fateInfo : fateInfo
		})
	}

	// 设置性格优势
	onNatureAdvChange(e){
		let fateInfo = this.state.fateInfo;
		fateInfo.natureadv = e.target.value;
		this.setState({
			fateInfo : fateInfo
		})
	}

	//设置性格劣势
	onNatureWeakChange(e){
		let fateInfo = this.state.fateInfo;
		fateInfo.natureweak = e.target.value;
		this.setState({
			fateInfo : fateInfo
		})
	}

	//设置天赋数关键词
	onKeywordChange(e){
		let talentInfo = this.state.talentInfo;
		talentInfo.keyword = e.target.value;
		this.setState({
			talentInfo : talentInfo
		})
	}

	// 添加命运数详解
	onNewFateNumDetail(){



		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		let fateInfo = this.state.fateInfo;
		fateInfo.details.push({
			id : uuid()
		})
		this.setState({
			fateInfo : fateInfo
		})
	}

	//添加天赋数详解
	onNewTalentNumDetail(){

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		let talentInfo = this.state.talentInfo;
		talentInfo.details.push({
			id : uuid()
		})
		this.setState({
			talentInfo : talentInfo
		})
	}


	// i : 0 / 1    命运数/天赋数
	// currentIndex 命运数/天赋数 当前数字下标 0- 8 / 0 -9
	//  detailIndex  命运数/天赋数 详解下标 0-8 / 0-9
	onDetailChange( i , currentIndex , detailIndex , e ){
		let details = [] ;
		let fateInfo = this.state.fateInfo;
		let talentInfo = this.state.talentInfo;

		//i == 0 标识命运数详解  i==1 标识天赋数详解
		details = i == 0 ? this.state.fateInfo.details : this.state.talentInfo.details ;

		if(i == 0) {
			details[detailIndex].content = e.target.value;
			fateInfo.details = details;
			this.setState({
				fateInfo :  fateInfo
			})
		}else{
			details[detailIndex].content = e.target.value;
			talentInfo.details = details;
			this.setState({
				talentInfo : talentInfo
			})
		}
	}

	render() {

		let userInfo = Cookies.getJSON("userInfo");

		return (
			<div className="number-wrap">

				<div className="number-top">
					<div className="nav">
						{
							this.state.tabs.map( 
								(tab , index) => 
								<span key={index} onClick={ () => this.onTabChange(index) } className={tab.active ? 'active' : ''} >{tab.name}</span>  
							)
						}			
					</div>
					<div className="save" onClick={this.onSaveClick}></div>
				</div>


				<div className="number-content" style={{ height : this.state.bodyHeight + 'px' }}>
				<Spin spinning={this.state.loading} tip='加载中'>
					<div className={this.state.tabs[0].active ? 'content-tab' : 'content-tab hidden'} >
						<div className="num">{this.state.tabs[0].currentNum}</div>
						<div className="number-form">
							<div className="form-item">
								<span className="label">概述:</span>
								<input disabled={userInfo.rw == 2 ? true : false} onChange={this.onDescChange} value={this.state.fateInfo.desc}/>
							</div>
							<div className="form-item">
								<span className="label">性格优势:</span>
								<input disabled={userInfo.rw == 2 ? true : false} onChange={this.onNatureAdvChange}  value={this.state.fateInfo.natureadv}/>
							</div>
							<div className="form-item">
								<span className="label">性格弱点:</span>
								<input disabled={userInfo.rw == 2 ? true : false} onChange={this.onNatureWeakChange} value={this.state.fateInfo.natureweak}/>
								
								{ 
									this.state.fateInfo.details.length == 0 ? <span className="label new" onClick={this.onNewFateNumDetail}>添加详解</span> : ""
								}
							</div>
							{
								this.state.fateInfo.details.map( (detail , index) =>
									<div key={detail.id} className="form-item top-align">
										<span className="label">详解{index+1}:</span>
										<div className="content">
											<div className="content-top">
												<textarea disabled={userInfo.rw == 2 ? true : false} onChange={(e) => this.onDetailChange(0 , this.state.tabs[0].currentNum - 1 ,  index , e) } value={detail.content} />
												<span onClick={()=>this.onDelDetailClick(detail , index)}>删除详解</span>
											</div>
											{
												index == this.state.fateInfo.details.length-1  
												&& index!= this.state.detailMaxLength - 1 
												? <span className="label new" onClick={this.onNewFateNumDetail}>添加详解</span> : ''
											}
										</div>
										
									</div>
								)
							}

						</div>
					</div>
					<div className={this.state.tabs[1].active ? 'content-tab' : 'content-tab hidden'}>
						<div className="num">{this.state.tabs[1].currentNum}</div>
						<div className="number-form">
							<div className="form-item">
								<span className="label">关键词:</span>
								<input disabled={userInfo.rw == 2 ? true : false} onChange={this.onKeywordChange} value={this.state.talentInfo.keyword} />
								{ 
									this.state.talentInfo.details.length == 0 ?<span className="label new" onClick={this.onNewTalentNumDetail}>添加详解</span> :''
								}
							</div>
							{
								this.state.talentInfo.details.map( (detail , index) =>
									<div key={detail.id} className="form-item top-align">
										<span className="label">详解{index+1}:</span>
										<div className="content">
											<div className="content-top">
												<textarea disabled={userInfo.rw == 2 ? true : false} onChange={(e) => this.onDetailChange(1 , this.state.tabs[1].currentNum == 0 ? 9 :  this.state.tabs[1].currentNum - 1 ,  index , e) } value={detail.content} />
												<span onClick={()=>this.onDelDetailClick(detail , index)}>删除详解</span>
											</div>
											{
												index == this.state.talentInfo.details.length-1  
												&& index!= this.state.detailMaxLength - 1 
												? <span className="label new" onClick={this.onNewTalentNumDetail}>添加详解</span> : ''
											}
										</div>


										
									</div>
								)
							}
						</div>
					</div>
				</Spin>
				</div>


				<div className="number-bottom">
					{
						this.state.tabs.map( (tab,index) =>{
							if(tab.active){

								return tab.pageNum.map( i => 
									<span key={i} className={i == tab.currentNum ? 'active' : ''} onClick={ () =>this.onNumberClick(i , index)}>{i}</span>
									)
								}
							}
						)
					}
				</div>

				<div className={this.state.confirmDisplay || this.state.delDisplay  ? "modal" : 'hidden'} ></div>

			

				<div className={this.state.delDisplay ? "confirm-wrap" : 'hidden'} >
					<div className="confirm">
						<span>是否删除该详解?</span>
						<div className="confirm-btns">
							<div className="del"  onClick={this.onDelDetail}></div>
							<div className="del-cancel" onClick={this.onModalClick}></div>
						</div>
					</div>
				</div>
				<Confirm {...this.state.delDetailConfirm}/>
				<Confirm display={this.state.confirmDisplay} onSave={this.onUpdate} onCancel={this.onModalClick}/>
				<Confirm {...this.state.modalOption}/>
			</div>
		)	
	}


}

Number.contextTypes = {
    router: React.PropTypes.object.isRequired
};