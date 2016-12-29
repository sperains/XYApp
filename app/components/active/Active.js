import React, { Component } from 'react' ;
import {message , Spin} from 'antd';
import './active.scss';
import DataStore from '../../utils/DataStore.js' ;
import { hashHistory } from 'react-router';
import Confirm from '../common/modal/Confirm';
import { alertMessage } from '../../utils/Verification';

export default class Active extends Component{

	constructor(props) {
		super(props);
		this.state = {
			activeList : [],
			displayConfirm : false,
			currentActive : {
				record : {},
				index : 0 
			},
			loading : true
		}
		this.onReleaseStateChange = this.onReleaseStateChange.bind(this);
		this.onNewActiveClick = this.onNewActiveClick.bind(this);
		this.onActiveDetailClick = this.onActiveDetailClick.bind(this);
		this.onActiveEditClick = this.onActiveEditClick.bind(this);
		this.onConfirmSaveClick = this.onConfirmSaveClick.bind(this);
		this.onConfirmCancelClick = this.onConfirmCancelClick.bind(this);
		this.onActiveConfirmSaveClick = this.onActiveConfirmSaveClick.bind(this);
	}

	componentDidMount() {
		
		var me = this ;
		DataStore.getActiveList().then( (data) => {
			me.setState({
				activeList : data,
				loading : false
			})
		});
	}

	//切换发布状态 
	onReleaseStateChange(record , index){

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		// 当前已发布,则取消发布
		if(record.release){
			this.setState({
				displayConfirm : true,
				currentActive : {
					record : record,
					index : index
				}
			})
			return ;
		}else{
			let activeList = this.state.activeList;

			activeList.map( (active , i) =>{
				if(index === i) {
					active.release = !active.release
				}
				return active;
			})
			DataStore.releaseActive({ id : record.id , state : 1  }).then( (data) => {
				message.success("发布成功");
				this.setState({
					activeList : activeList
				});
			});
		}
	}

	// 取消发布
	onConfirmSaveClick(){
		let me = this ;
		let activeList = this.state.activeList;
		let currentActive = this.state.currentActive;


		activeList.map( (active , i) =>{
			if(currentActive.index === i) {
				active.release = !active.release
			}
			return active;
		})
		DataStore.releaseActive({ id : currentActive.record.id , state : 0  }).then( (data) => {
			message.success("取消发布成功");
			me.setState({
				activeList : activeList,
				displayConfirm : false
			});
		}).catch( () =>{
			message.error("取消发布失败");
			me.setState({
				displayConfirm : false
			});
		});
	}

	//新建喜悦活动
	onNewActiveClick(){

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		hashHistory.push({
			pathname  : '/main/active-new',
			state : {
				operating : 0
			}
		});
	}

	//查看活动报名详情
	onActiveDetailClick(active , index){

		let title = this.state.activeList[index].title;
		hashHistory.push({
			pathname : '/main/active-detail',
			state : {
				title : title,
				record : active
			}
		});
	}

	//编辑喜悦活动
	onActiveEditClick(active , index){

		// 活动已结束或者已发布则不能进入编辑页面
		if(active.release == 2  ){
			return ;
		}

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		let title = this.state.activeList[index].mainTitle;
		hashHistory.push({
			pathname : '/main/active-new',
			state : {
				title : title,
				operating : 1,
				record : active
			}
		});
	}

	// 删除喜悦活动
	onActiveDeleteClick(active , index){

		let me = this ;
		// 已发布则不能删除
		if(active.release == 1){
			return ;
		}

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		me.onActiveConfirmSaveClick(active , index);

	}

	onActiveConfirmSaveClick(active , index){
		let me = this ;
		me.setState({
			activeDelConfirm : {
				display : true ,
				title : '确认删除',
				text : '您正在进行删除操作，是否继续？',
				onSave : function(){
					let activeList = me.state.activeList;
					if (__DEV__){
						me.setState({
							activeList : activeList.slice(0 , index).concat(activeList.slice(index+1)),
							activeDelConfirm : {
								display : false
							}
						})
						message.success('删除活动成功');
					}else{
						DataStore.deleteActive({
							id : active.id
						}).then( (data) =>{
							
							me.setState({
								activeList : activeList.slice(0 , index).concat(activeList.slice(index+1)),
								activeDelConfirm : {
									display : false
								}
							})
							message.success('删除活动成功');

						}).catch( (error) =>console.info(error));
					}	

				},
				onCancel : function(){
					me.setState({
						activeDelConfirm : {
							display : false
						}
					})
				},
			}
		})
	}

	

	// 
	onConfirmCancelClick(){
		this.setState({
			displayConfirm : false
		})
	}

	render(){
		return (
			<div className="active-wrap">
				
				<div className="active-topbar">
					<span>线下活动</span>
					<div className="new" onClick={ this.onNewActiveClick}></div>
				</div>

				
				<div className="active-content">
				<Spin spinning={this.state.loading} tip='加载中'>
					{
						this.state.activeList.map( (active , index) => (
							<div key={active.id} className="active-item">
								<div className="desc">
									<span className="create-time">{active.createTime} 创建</span>
									<div className={active.release == 2 ? 'hidden' : 'release'}>
										<span>发布</span>
										<div className={active.release ? 'release-img release' : 'release-img unrelease'} onClick={()=>this.onReleaseStateChange(active , index)}></div>
									</div>
								</div>
								<div className="content">
									<div className="info">
										<img src={decodeURI(active.imageUrl)} className="logo" />
										<div className="detail">
											<span>[ {active.title} ] {active.subTitle}</span>
											<span>活动地点:{active.address}</span>
											<span>活动时间:{active.activeTime}</span>
										</div>
									</div>
									<div className="options">
										<span className={active.isOpenLimit ? 'apply' : 'apply hidden'}>({active.personCount} / {active.activeLimit})</span>
										<div>
											<span onClick={ () => this.onActiveDetailClick(active , index)}>报名详情</span>
											<span className={active.release == 2 ? 'edit over' : 'edit' } onClick={ () => this.onActiveEditClick(active , index)}>{active.release == 2 ? '活动已结束' : '编辑'}</span>
											<span className={active.release == 2 ? 'hidden' : (active.release == 1 ? 'del unhandle' : 'del' )} onClick={ () => this.onActiveDeleteClick(active , index)}>删除</span>
										</div>
										
									</div>
								</div>
							</div>
						) )
					}
				</Spin>
				</div>

				<Confirm display={this.state.displayConfirm} text={'确认取消发布?'} onSave={this.onConfirmSaveClick} onCancel={this.onConfirmCancelClick}/ >
				<Confirm {...this.state.activeDelConfirm}/>
				
			</div>
		)
	}
}