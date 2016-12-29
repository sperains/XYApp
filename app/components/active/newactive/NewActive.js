
import React , {Component} from 'react';
import './newactive.scss';
import { hashHistory } from 'react-router';
import { Input , DatePicker , TimePicker , Upload, Icon , message , Alert , Spin } from 'antd';
import DataStore from '../../../utils/DataStore.js' ;
import moment from 'moment';
import Map from '../../common/map/Map';
import Confirm from '../../common/modal/Confirm';

moment.locale('zh-cn');
const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm';

var equal = require('equals');





// <div className={this.state.displaySubTitle ? 'form-item' :  'form-item subtitle-hidden'}>
// 	<span className="label">副标题:</span>
// 	<input placeholder="请输入副标题" ref="subTitle" onChange={this.onSubTitleChange} />
// 	<span className="new-subtitle" onClick={this.onDelSubTitle}>删除</span>
// </div>

//						<span className="new-subtitle" onClick={this.onDisplaySubTitle} >创建副标题</span>
// <Map setAddress={ (address,lnglat) =>this.setAddress(address , lnglat)} address = {this.state.activeInfo.address} setLnglat= { (lnglat) =>this.setLnglat(lnglat)}/>


export default class NewActive extends Component{

	constructor(props) {
		super(props);
		this.state={
			displaySubTitle : false,
			imgPreview : false,
			QRcodePreview : false,
			descTextSize : 0,
			mainTitleSize : 0 ,
			dateStatus : {},
			timeStatus : {},
			lnglat : {},
			activeInfo : {
				isOpenLimit : false,				//是否开启限额
				activeLimit : '',					//限制报名人数
				address: '',						//地址
				activeTime:'',					//活动时间
				address : '',						//活动地址
				personCount :'',				//报名人数
				createTime:'',					//活动创建时间
				id:'',							//唯一id
				lat : '0.1',
				lng : '0.1',						
				imageUrl:'',						//活动logo
				title:'',							//主标题
				release : '',						//是否发布
				subTitle: '',						//副标题,
				desc : ''
			},
			operating : '',						//操作标识   0  新建 1编辑,
			imageUrl : '',
			QRcode : '' ,
			canEditLimit : true
		}
		this.onBackClick = this.onBackClick.bind(this);
		this.onDisplaySubTitle = this.onDisplaySubTitle.bind(this);
		this.onDelSubTitle = this.onDelSubTitle.bind(this);
		this.handleActiveImageChange = this.handleActiveImageChange.bind(this);
		this.onTextAreaChange = this.onTextAreaChange.bind(this);
		this.onSaveClick = this.onSaveClick.bind(this);
		this.onMainTitleChange = this.onMainTitleChange.bind(this);
		this.onSubTitleChange = this.onSubTitleChange.bind(this);
		this.onActiveDateChange = this.onActiveDateChange.bind(this);
		this.onActiveTimeChange = this.onActiveTimeChange.bind(this);
		this.onAddressChange = this.onAddressChange.bind(this);
		this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
		this.onLimitChange = this.onLimitChange.bind(this);
		this.setActiveInfo = this.setActiveInfo.bind(this);
		this.onConfirmSaveClick = this.onConfirmSaveClick.bind(this);
		this.onConfirmCancelClick = this.onConfirmCancelClick.bind(this);
		this.setLnglat = this.setLnglat.bind(this);
		this.disabledDate = this.disabledDate.bind(this);
		this.handleActiveQRcodeChange = this.handleActiveQRcodeChange.bind(this);
	}

	componentWillMount() {

		var me = this ;
		//获取路由传递过来的参数
		const location = hashHistory.getCurrentLocation();

		if(!location.state){
			hashHistory.push("/main/active");
			return ;
		}

		let activeInfo = location.state.record;
		// console.log(activeInfo);
		//设置标题
		me.setState({
			operating : location.state.operating
		})

		//如果是编辑页面获取参数
		if(location.state.operating == 1){
			me.setState({
				activeInfo : activeInfo,
				preActiveInfo : Object.assign({} , activeInfo),
				mainTitleSize : activeInfo.title.length,
				imageUrl:  activeInfo.logo,
				QRcode : activeInfo.QRcode || '' ,
				imgPreview : true,
				timeStatus : {
					defaultValue : moment(activeInfo.activeTime.substr(11), timeFormat)
				},
				dateStatus :  {
					defaultValue : moment(activeInfo.activeTime.substr(0,10), dateFormat)
				},
				confirmDisplay : false
			})
		}
	}

	componentDidMount() {
		let me = this ;
		var map, geolocation;
			//加载地图，调用浏览器定位服务
			map = new AMap.Map('map', {
			resizeEnable: true,
			zoom : 12
		});

		this.map = map ;

		AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
			function(){
				map.addControl(new AMap.ToolBar({}));
			}
		);
		
		//设置标记点
		let marker = new AMap.Marker({
			icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
		});

		let lng = me.state.activeInfo.lng ;
		let lat = me.state.activeInfo.lat;
		// console.log(lng , lat);
		if( lng && lat && lng!= 0.1 && lat !=0.1){
			marker.setPosition([lng , lat ]  );
			map.setCenter(marker.getPosition());
		}
		marker.setMap(map);
		
		

		me.marker = marker;

		

		var clickEventListener = map.on('click', function(e) {

			marker.setPosition(e.lnglat);

			map.plugin(["AMap.Geocoder"], function () {
				var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});  
				geocoder.getAddress(e.lnglat, function(status, result) {
					if (status === 'complete' && result.info === 'OK') {
						var address = result.regeocode.formattedAddress; //返回地址描述
						// me.props.setAddress(address , e.lnglat);
						let activeInfo = me.state.activeInfo;
						activeInfo.address = address;
						activeInfo.lng = e.lnglat.lng;
						activeInfo.lat = e.lnglat.lat;
						me.setState({
							activeInfo : activeInfo,
						})
					}
				});     
			});
		});
	}

	onBackClick(){

		if(this.state.operating == 0 ){
			hashHistory.push("/main/active");
			return ;
		}

		let flag = equal(this.state.preActiveInfo,this.state.activeInfo);
		if(flag){
			hashHistory.push('/main/active');
		}else{
			this.setState({
				confirmDisplay : true 
			})
		}
	}

	onConfirmSaveClick(){
		var me = this ;
		this.onSaveClick( function(){
			me.setState({
				confirmDisplay : false
			})
			hashHistory.push("/main/active");
		});
	}

	onConfirmCancelClick(){
		this.setState({
			confirmDisplay : false
		})
		hashHistory.push("/main/active")
	}

	onDisplaySubTitle(){
		this.setState({
			displaySubTitle : true 
		})
	}

	onDelSubTitle(){
		this.setState({
			displaySubTitle : false ,
			address : ''
		})
	}

	// 添加活动
	onSaveClick( callback ){
		let me = this ;
		let activeInfo = this.state.activeInfo;
		let lnglat = this.state.lnglat;

		if(activeInfo.title == ""){
			message.error("请填写活动主题");
			return ;
		}

		if(activeInfo.activeTime.substr(0,10) == ""){
			message.error("请选择活动日期");
			return ;
		}

		if(activeInfo.activeTime.substr(10).trim() == ""){
			message.error("请选择活动时间");
			return ;
		}

		if(activeInfo.address == ""){
			message.error("请选择活动地点")
			return ;
		}

		if(activeInfo.desc == ""){
			activeInfo.desc = "活动简介";
		}

		if(activeInfo.isOpenLimit && activeInfo.activeLimit == ""){
			message.error("请输入活动限定人数");
			return ;
		}
		// activeInfo.lng = me.lnglat.lng;
		// activeInfo.lat = me.lnglat.lat;

		// console.log(activeInfo)

		if(this.state.operating == 0 ){
			activeInfo.imageUrl = this.state.imageUrl;
			DataStore.addActive(activeInfo).then( data =>{
				 message.success('添加活动成功');
				 hashHistory.push("/main/active")
			} , error => message.error("添加失败,请稍后再试.."));
		}else{
			activeInfo.imageUrl = this.state.imageUrl;
			message.success("修改成功");
			hashHistory.push("/main/active");
			DataStore.editActive(activeInfo).then( data=> {
				if(callback &&  typeof(callback) == 'function'){
					callback();
					message.success("修改成功");
					hashHistory.push("/main/active")
				}  
			} , error => {
				message.error("修改失败,请稍后再试..");
				hashHistory.push("/main/active");
			}


			);	
		}	
	}

	//图片上传 
	handleActiveImageChange(info) {

		if (info.file.status === 'done') {
			// console.log(info);
	       	this.setState({
				imageUrl: encodeURI(info.file.response.data),
				imgPreview : true
			});

		}else{
			this.setState({
				// imgPreview : true
			});
		}
	}

	handleActiveQRcodeChange(info){
		if (info.file.status === 'done') {
			// console.log(info);
	       	this.setState({
				QRcode: encodeURI(info.file.response.data),
				QRcodePreview : true
			});

		}else{
			this.setState({
				// imgPreview : true
			});
		}
	}


	//简介设置
	onTextAreaChange(){
		let text = this.refs.desc.value.trim();
		this.setState({
			descTextSize : text.length
		})
		this.setActiveInfo('desc' , text);
	}

	//主题设置,已弃用 
	onMainTitleChange(){
		let text = this.refs.mainTitle.value.trim();
		this.setActiveInfo('title', text);
		this.setState({
			mainTitleSize : text.length,
			title : text
		})
	}

	//副主题设置,已弃用
	onSubTitleChange(){
		let text = this.refs.subTitle.value.trim();
		this.setActiveInfo('subTitle', text);
	}

	// 活动日期设置
	onActiveDateChange(monent , date){
		let activeTime = this.state.activeInfo.activeTime;
		let time = activeTime.substr(10);

		this.setActiveInfo('activeTime', date +" " +  time);
	}	

	//活动时间设置
	onActiveTimeChange(monent , time){
		let activeTime = this.state.activeInfo.activeTime;
		let date = activeTime.substr(0,10) ;
		this.setActiveInfo('activeTime', date + " " + time);
	}

	// 活动地址设置
	onAddressChange(event){
		let me = this ;
		let text = me.refs.address.value.trim();
		me.setActiveInfo('address', event.target.value);

		me.map.plugin(["AMap.Geocoder"], function () {
			var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});  
			geocoder.getLocation(event.target.value, function(status, result) {
				if (status === 'complete' && result.info === 'OK') {
					//TODO:获得了有效经纬度，可以做一些展示工作
					//比如在获得的经纬度上打上一个Marker
					let lnglat = result.geocodes[0].location
					me.marker.setPosition(lnglat);
					me.marker.setMap(me.map);
					me.map.setCenter(me.marker.getPosition());
					let activeInfo = me.state.activeInfo;
					activeInfo.lng = lnglat.lng;
					activeInfo.lat = lnglat.lat;
					me.setState({
						activeInfo : activeInfo,
					})
				}else{
					//获取经纬度失败
				}
			});      
		});
	}

	// 是否开启报名限额设置
	onCheckBoxClick(){
		let activeInfo = this.state.activeInfo;

		if(activeInfo.release == 1 ){
			return ;
		}

		activeInfo.isOpenLimit = !activeInfo.isOpenLimit;
		this.setState({
			activeInfo : activeInfo
		});
	}

	// 报名限额数量设置
	onLimitChange(){

		
		let me = this ;

		let value = this.refs.activeLimit.value.trim();

		value=value.replace(/[^\d]/g,''); //只能输整数

		if(value == 0 ){
			me.setActiveInfo('activeLimit' , value);
			return ;
		}

		value = value.replace(/\b(0+)/gi,"") ;//去掉整数前面的0


		if(value == ""){
			value = 0 ;//如果为空则设置为0
		}

		me.setActiveInfo('activeLimit' , value);
	}

	// 设置活动信息.  
	// prop : 属性名 value :属性值
	setActiveInfo(prop , value){
		let activeInfo = this.state.activeInfo;
		activeInfo[prop] = value;
		this.setState({
			activeInfo : activeInfo
		})
	}

	// 设置地址
	setAddress(address , lnglat){
		let activeInfo = this.state.activeInfo;
		activeInfo.address = address;
		me.lnglat = lnglat;
		this.setState({
			activeInfo : activeInfo,
		})
	}

	setLnglat(lnglat){
		this.lnglat = lnglat;
	}

	disabledDate(current){	
		return current  && current.valueOf() < Date.now() -  1000*60*60*24  ;
	}

	render() {
		const imageUrl = this.state.imageUrl;

		return (
			<div className="newactive-wrap">
				<div className="newactive-topbar">
					<div className="nav">
						<div className="back" onClick={this.onBackClick}></div>
						<span className="parent" onClick={this.onBackClick}>喜悦活动</span>
						<span> / </span>
						<span className="current">{this.state.operating == 0 ? '新建喜悦活动' : '编辑喜悦活动'}</span>
					</div>
					<div className="save" onClick={this.onSaveClick}></div>
				</div>

				<div className="newactive-content">
					
					<div className="active-form">
						<div className={this.state.imgPreview ? 'active-img bghidden' :"active-img"}>
							<Upload
						        className="avatar-uploader"
						        name="activeImg"
						        showUploadList={false}
						        action= {"http://" + __SERVER_URL__ + "services/UploadData"}
						        onChange={this.handleActiveImageChange}
						      >
						        {
						          imageUrl ?
						            <img src={decodeURI(this.state.imageUrl)} role="presentation" className="avatar" /> :
						            <Icon type="plus" className="avatar-uploader-trigger" />
						        }
						      </Upload>
						</div>
						<span className="img-desc">图片大小750*450</span>

						<div className={this.state.imgPreview ? 'active-QRcode bghidden' :"active-QRcode"}>
							<Upload
						        className="avatar-uploader"
						        name="activeImg"
						        showUploadList={false}
						        action= {"http://" + __SERVER_URL__ + "services/UploadData"}
						        onChange={this.handleActiveQRcodeChange}
						      >
						        {
						          imageUrl ?
						            <img src={decodeURI(this.state.QRcode)} role="presentation" className="avatar" /> :
						            <Icon type="plus" className="avatar-uploader-trigger" />
						        }
						      </Upload>
						</div>

						<div className="loading"><Spin spinning={false ? true : false} tip="上传中,请勿重复操作"/></div>
						<div className="form-item active-maintitle">
							<span className="label">主题:</span>
							<div>
								<input placeholder="请输入主题" ref="mainTitle" type="text" onChange={this.onMainTitleChange} maxLength="14" value={this.state.activeInfo.title}/>
								<span>{this.state.mainTitleSize}/14</span>
							</div>
							
	
						</div>
						

						<div className="form-item active-date">
							<span className="label">时间:</span>
							<DatePicker format={dateFormat} disabledDate={this.disabledDate} onChange={this.onActiveDateChange} {...this.state.dateStatus}  />
							<TimePicker format={timeFormat} onChange={this.onActiveTimeChange} {...this.state.timeStatus}/>
						</div>
						<div className="form-item active-desc">
							<span className="label">简介:</span>
							<div>
								<textarea placeholder="请输入活动简介" maxLength='200' onChange={this.onTextAreaChange} ref="desc" value={this.state.activeInfo.desc}></textarea>
								<span>{this.state.descTextSize}/200</span>
							</div>
						</div>
						<div className="form-item active-address">
							<span  className="label">地点:</span>
							<input placeholder="请选择活动地点" type="text" ref="address" onChange={this.onAddressChange} value={this.state.activeInfo.address}/>
						</div>
						<div  className="form-item">
							<span className="label"></span>
							<div className="map" id="map"></div>
						</div>

						<div className="form-item active-applyoptions">
							<span className="label"></span>
							<div>
								<div className={this.state.activeInfo.isOpenLimit ? 'checkbox checked' :'checkbox'} onClick={this.onCheckBoxClick}></div>
								<span>限定报名人数</span>
								{
									this.state.activeInfo.isOpenLimit ? 
									<input className="count error" type="text" max="9999"  min="1" ref="activeLimit" disabled={this.state.activeInfo.release == 1 ? true : false}  onChange={this.onLimitChange} value={this.state.activeInfo.activeLimit} />
									: <input className="count error" type="text" max="9999" min="1" ref="activeLimit" disabled="disabled" onChange={this.onLimitChange}  value={this.state.activeInfo.activeLimit}/>
								}			
							</div>
						</div>
					</div>
				</div>
				<Confirm display={this.state.confirmDisplay} onSave={this.onConfirmSaveClick} onCancel={this.onConfirmCancelClick}/>
			</div>
		)
	}	
}