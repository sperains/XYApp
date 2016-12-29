
import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import './life.scss';
import {Icon , message , Spin } from 'antd';
import DataStore from '../../utils/DataStore.js' ;
import Confirm from '../common/modal/Confirm';
import { alertMessage } from '../../utils/Verification';
var path = require('path');
// console.log(path)
const uuid = require('uuid');

 const options={
        baseUrl:'http://127.0.0.1',
        param:{
            fid:0
        },
        chooseFile(files){
		// console.log(123);
	}
 }

export default class Life extends Component{

	constructor(props) {
		super(props);
		this.state = {
			tabs : [
				{ text : '正念静坐' , active : true},
				{ text : '正念行走' , active : false},
				{ text : '正念散步' , active : false},
				{ text : '正念睡眠' , active : false}
			],
			sittingAudioList : [
				// { text : '语音引导' , isUsed : 0  , id: uuid() , fileName:"", src :"" , type : 0  , useType : 1  },
				{ text : '背景音乐' , isUsed : 0  , id: uuid() , fileName:"" ,  src : "" , type : 0 , useType : 2},
				{ text : '计时铃声' , isUsed : 0  , id: uuid() , src : "" , type : 0 , useType : 3},
				{ text : '背景文字' , isUsed : 0 , content : '' , type : 1}
			],
			walkAudioList : [
				// { text : '语音引导' , isUsed : 1 , id: uuid() , src :"" , type : 0 , useType : 1 },
				{ text : '背景音乐' , isUsed : 1 , id: uuid() , src :"" , type : 0 , useType : 2},
				{ text : '计时铃声' , isUsed : 1 , id: uuid() , src :""  , type : 0 , useType : 3},
				{ text : '背景文字' , isUsed : 0 , content : '' , type : 1  }
			],
			mealAudioList : [
				// { text : '语音引导' , isUsed : 1 , id:uuid() , src :"" , type : 0 , useType : 1 },
				{ text : '背景音乐' , isUsed : 1 , id:uuid() , src :"" , type : 0 , useType : 2},
				{ text : '计时铃声' , isUsed : 1 , id:uuid() , src :"" , type : 0 , useType : 3},
				{ text : '背景文字' , isUsed : 0 , content : '' , type : 1  }
			],
			sleepAudioList : [
				// { text : '语音引导' , isUsed : 1 , id:uuid() , src :"" , type : 0 , useType : 1 },
				{ text : '背景音乐' , isUsed : 1 , id:uuid() , src :"" , type : 0 , useType : 2},
				{ text : '计时铃声' , isUsed : 1 , id:uuid() , src :"" , type : 0 , useType : 3},
				{ text : '背景文字' , isUsed : 0 , content : '' , type : 1  }
			],
			comfirmDisplay : false,
			updateFlag : false, //当前tab数据是否已被修改的标识,
			loading : false,
		}
		this.onTabChange = this.onTabChange.bind(this);
		this.onAddMusicClick = this.onAddMusicClick.bind(this);
		this.onAudioChange = this.onAudioChange.bind(this);
		this.onCheckboxChange = this.onCheckboxChange.bind(this);
		this.onMusicStateChange = this.onMusicStateChange.bind(this);
		this.onAudioSave = this.onAudioSave.bind(this);
		this.onTextAreaChange = this.onTextAreaChange.bind(this);
	}


	componentDidMount() {
		DataStore.getLifeInfo().then( (data)=>{
			// console.log(data);
			this.setState({
				sittingAudioList : data.sittingAudioList,
				walkAudioList : data.walkAudioList,
				mealAudioList : data.mealAudioList,
				sleepAudioList : data.sleepAudioList,
			})
		});
	}


	//Tab切换 
	// index tab在数组中的下标 
	onTabChange(index){
		let me = this ;
		let updateFlag = me.state.updateFlag;

		// console.log(updateFlag)

		let tabs = this.state.tabs;
		tabs.map( (tab , i) =>{
			if(i == index){
				tab.active = true
			}else{
				tab.active = false
			}
		}) 
		this.setState({
			tabs : tabs
		})
	}

	onAddMusicClick(audio , index){
		let ref = audio.id
		let file = this.refs[audio.id];
		// console.log(file)
		file.click();
	}

	onAudioChange(audio , index){

		let userInfo = Cookies.getJSON("userInfo");

		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		let me = this ;
		let tabs = this.state.tabs;
		let fileName = this.refs[audio.id].files[0].name;
		let audioList ;
		// console.log(fileName);
		
 		var formData = new FormData();
       	formData.append('file', this.refs[audio.id].files[0]);

       	// 设置上传加载动画
       	tabs.map( (tab, i ) =>{
			if(tab.active){
				switch(i){
					case 0 :
						audioList = me.state.walkAudioList;
						audioList[index].loading = true
						me.setState({
							walkAudioList : audioList
						})
						break;
					case 1 :
						audioList = me.state.sittingAudioList;
						audioList[index].loading = true
						me.setState({
							sittingAudioList : audioList
						})
						break;
					case 2 :
						audioList = me.state.mealAudioList;
						audioList[index].loading = true
						me.setState({
							mealAudioList : audioList
						});
						break;
					case 3 :
						audioList = me.state.sleepAudioList;
						audioList[index].loading = true
						me.setState({
							sleepAudioList : audioList
						});
						break;
				}
			}
		});

       	// 上传音乐
		$.ajax({
			url : 'http://' + __SERVER_URL__ + 'services/UploadAudio',
			type : 'POST',
			data : formData,
			dataType : 'json',
			processData : false,
			contentType : false,
			success : function(response){

				tabs.map( (tab, i ) =>{
					if(tab.active){
						switch(i){
							case 0 :
								audioList = me.state.walkAudioList;
								audioList[index].fileName = fileName;//设置文件名
								audioList[index].src = response.data;//设置音乐url
								audioList[index].loading = false;// 关闭上传动画
								me.setState({
									walkAudioList: audioList
								})
								break;
							case 1 :
								audioList = me.state.sittingAudioList;
								audioList[index].fileName = fileName;
								audioList[index].src = response.data;
								audioList[index].loading = false;
								me.setState({
									sittingAudioList : audioList
								})
								break;
							case 2 :
								audioList = me.state.mealAudioList;
								audioList[index].fileName = fileName;
								audioList[index].src = response.data;
								audioList[index].loading = false;
								me.setState({
									mealAudioList : audioList
								});
								break;
							case 3 :
								audioList = me.state.sleepAudioList;
								audioList[index].fileName = fileName;
								audioList[index].src = response.data;
								audioList[index].loading = false;
								me.setState({
									sleepAudioList : audioList
								});
								break;
						}
					}
				});
				
			},
			error : function(e){
				// console.log(e);
			}
		})



	}


	onCheckboxChange(audio , index){

		let userInfo = Cookies.getJSON("userInfo");

		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}

		this.setState({
			updateFlag : true
		});

		let tabs = this.state.tabs;
		tabs.map( (tab,i)=>{
			if(tab.active){
				let audioList = {} ;
				switch(i){
					case 0 : 
						audioList = this.state.walkAudioList;
						audio.isUsed = !audio.isUsed ? 1 : 0 ;
						audioList[index] = audio;
						this.setState({
							walkAudioList : audioList
						});
						break;
					case 1 :
						audioList = this.state.sittingAudioList;
						audio.isUsed = !audio.isUsed ? 1 : 0 ;
						audioList[index] = audio;
						this.setState({
							sittingAudioList : audioList
						});
						break;
					case 2 :
						audioList = this.state.mealAudioList;
						audio.isUsed = !audio.isUsed ? 1 : 0 ;
						audioList[index] = audio;
						this.setState({
							mealAudioList : audioList
						});
						break;
					case 3 :
						audioList = this.state.sleepAudioList;
						audio.isUsed = !audio.isUsed ? 1 : 0 ;
						audioList[index] = audio;
						this.setState({
							sleepAudioList : audioList
						});
						break;
				}
			}
		});
	}

	// 音频播放暂停
	onMusicStateChange(audio , index){

		let tabs = this.state.tabs;
		let audioList = {};
		let audioDom = this.refs['audio_' + audio.id];
		tabs.map( (tab , i)=>{
			if(tab.active){

				if(audioDom.currentSrc != ""){
					// console.log(audioDom.currentSrc)
					if(audioDom.paused){
						audioDom.play();
						audio.isPlaying = true;
					}else{
						audioDom.pause();
						audio.isPlaying = false ;
					}
				}


				switch(i){
					case 0 : 
						audioList = this.state.walkAudioList ;
						audioList[index] = audio;
						this.setState({
							walkAudioList : audioList
						})
						break;
					case 1 : 
						audioList = this.state.sittingAudioList;
						audioList[index] = audio;
						this.setState({
							sittingAudioList : audioList
						})
						break;
					case 2 : 
						audioList = this.state.mealAudioList;
						audioList[index] = audio;
						this.setState({
							mealAudioList : audioList
						})
						break;
					case 3 : 
						audioList = this.state.sleepAudioList;
						audioList[index] = audio;
						this.setState({
							sleepAudioList : audioList
						})
						break;
				}
			}
		});

		
		

		

	}

	// 提交保存数据到后台
	onAudioSave(){

		let userInfo = Cookies.getJSON("userInfo");

		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}
		
		let tabs = this.state.tabs;

		tabs.map( (tab, index)=>{
			if(tab.active){
				let audioInfo = {} ;
				switch(index){
					case 0 : audioInfo = this.state.walkAudioList ; break;
					case 1 : audioInfo = this.state.sittingAudioList ; break;
					case 2 : audioInfo = this.state.mealAudioList ; break;
					case 3 : audioInfo = this.state.sleepAudioList ; break;
				}
				// console.log(audioInfo);
				let flag = true ;
				DataStore.updateLifeInfo(audioInfo).then( ()=> message.success("保存成功"));
			}
		});
	}

	// 设置背景文本内容
	onTextAreaChange(e){
		let me = this ;
		let tabs = this.state.tabs;
		let content ;

		tabs.map( (tab, index) =>{
			if(tab.active){
				let audioInfo = {} ;
				switch(index){
					case 0 : 
						audioInfo = this.state.walkAudioList ; 
						audioInfo[audioInfo.length-1].content = e.target.value;
						me.setState({
							walkAudioList : audioInfo
						})
						break;
					case 1 : 
						audioInfo = this.state.sittingAudioList ;
						audioInfo[audioInfo.length-1].content = e.target.value;
						me.setState({
							sittingAudioList : audioInfo
						})
						break;
					case 2 :
						audioInfo = this.state.mealAudioList ;
						audioInfo[audioInfo.length-1].content = e.target.value;
						me.setState({
							mealAudioList : audioInfo
						})
						break;
					case 3 :
					audioInfo = this.state.sleepAudioList ;
					audioInfo[audioInfo.length-1].content = e.target.value;
					me.setState({
						sleepAudioList : audioInfo
					})
					break;
				}
			}
		});
	}



	render() {
		let userInfo = Cookies.getJSON("userInfo");

		return (

			<div className="life-wrap">
				<div className="life-nav">
					<div className="tabs">
						{
							this.state.tabs.map( (tab , index)=> {
								return (
									<span key={index} onClick={()=>this.onTabChange(index)} className={tab.active ? 'active' : ''}>{tab.text}</span>
								)
							})
						}
					</div>
					<div onClick={this.onAudioSave} className="save">
					</div>
				</div>
				<div className="life-content">
					<div className={this.state.tabs[0].active ? 'tab-content' : 'hidden'}>

						{
							this.state.walkAudioList.map( (audio , index)=> {
								return (
									<div key={index} className="item">
										<div className={audio.type==0 ? 'item-label' : 'item-label top-align'}>
											<div onClick={ ()=>this.onCheckboxChange(audio , index)} className = {audio.isUsed ? 'checkbox checked' : 'checkbox'}></div>
											<span className="label">{audio.text}：</span>
										</div>

										{
											audio.type == 0 ? 
											<div className="item-content">
												<span className="add-music" onClick={()=>this.onAddMusicClick(audio , index)}>
												{
													audio.fileName == "" || audio.fileName == undefined
													?  (<span><Icon type="plus" style={{marginRight : '5px'}} />添加音频</span> )
													: audio.fileName
												}
												</span>
												<div  onClick={()=>this.onMusicStateChange(audio , index)} className={audio.isPlaying ? 'sound open' : 'sound'}></div>
												<div className="loading"><Spin spinning={audio.loading ? true : false} tip="上传中,请勿重复操作"/></div>	
												<audio ref={'audio_' + audio.id } src={audio.src}  >
												</audio>
												
												<form style={{display : 'none'}} >
													<input type="file" ref={audio.id}  onChange={ () => this.onAudioChange( audio , index)}/>
												</form>
											</div>
											:
											<div className="item-content">
												<textarea disabled={ userInfo.rw == 2 ? true : false} onChange={(e) => this.onTextAreaChange(e)} value={audio.content}></textarea>
											</div>
										}
										
									</div>
								)
							} )
						}
					
					</div>

					<div className={this.state.tabs[1].active ? 'tab-content' : 'hidden'}>

						{
							this.state.sittingAudioList.map( (audio , index)=> {
								return (
									<div key={index} className="item">
										<div className={audio.type==0 ? 'item-label' : 'item-label top-align'}>
											<div onClick={ ()=>this.onCheckboxChange(audio , index)} className = {audio.isUsed ? 'checkbox checked' : 'checkbox'}></div>
											<span className="label">{audio.text}：</span>
										</div>

										{
											audio.type == 0 ? 
											<div className="item-content">
												<span className="add-music" onClick={()=>this.onAddMusicClick(audio , index)}>
												{
													audio.fileName == "" || audio.fileName == undefined
													?  (<span><Icon type="plus" style={{marginRight : '5px'}} />添加音频</span> )
													: audio.fileName
												}
												</span>
												<div  onClick={()=>this.onMusicStateChange(audio , index)} className={audio.isPlaying ? 'sound open' : 'sound'}></div>
												<div className="loading"><Spin spinning={audio.loading ? true : false} tip="上传中,请勿重复操作"/></div>
												<audio ref={'audio_' + audio.id} src={audio.src}  >
												</audio>
												
												<form style={{display : 'none'}} >
													<input type="file" ref={audio.id}  onChange={ () => this.onAudioChange( audio , index)}/>
												</form>
											</div>
											:
											<div className="item-content">
												<textarea disabled={ userInfo.rw == 2 ? true : false} onChange={(e) => this.onTextAreaChange(e)} value={audio.content}></textarea>
											</div>
										}
										
									</div>
								)
							} )
						}
					
					</div>




					<div className={this.state.tabs[2].active ? 'tab-content' : 'hidden'}>

						{
							this.state.mealAudioList.map( (audio , index)=> {
									return (
										<div key={index} className="item">

											<div className={audio.type==0 ? 'item-label' : 'item-label top-align'}>
												<div onClick={ ()=>this.onCheckboxChange(audio , index)} className = {audio.isUsed ? 'checkbox checked' : 'checkbox'}></div>
												<span className="label">{audio.text}：</span>
											</div>

											{
												audio.type == 0   ? 
												<div className="item-content">
													<span className="add-music" onClick={()=>this.onAddMusicClick(audio , index)}>
													{
														audio.fileName == "" || audio.fileName == undefined
														?  (<span><Icon type="plus" style={{marginRight : '5px'}} />添加音频</span> )
														: audio.fileName
													}
													</span>
													<div  onClick={()=>this.onMusicStateChange(audio , index)} className={audio.isPlaying ? 'sound open' : 'sound'}></div>
													<div className="loading"><Spin spinning={audio.loading ? true : false} tip="上传中,请勿重复操作"/></div>
													<audio ref={'audio_' + audio.id} src={audio.src}  >
													</audio>
													
													<form style={{display : 'none'}} >
														<input type="file" ref={audio.id}  onChange={ () => this.onAudioChange( audio , index)}/>
													</form>
												</div>
												:
												audio.useType ==3 ? '' : <div className="item-content">
													<textarea disabled={ userInfo.rw == 2 ? true : false} onChange={(e) => this.onTextAreaChange(e)} value={audio.content}></textarea>
												</div>
											}
											
										</div>
									)
							} )
						}
					
					</div>

					<div className={this.state.tabs[3].active ? 'tab-content' : 'hidden'}>

						{
							this.state.sleepAudioList.map( (audio , index)=> {
								return (
									<div key={index} className="item">
										<div className={audio.type==0 ? 'item-label' : 'item-label top-align'}>
											<div onClick={ ()=>this.onCheckboxChange(audio , index)} className = {audio.isUsed ? 'checkbox checked' : 'checkbox'}></div>
											<span className="label">{audio.text}：</span>
										</div>

										{
											audio.type == 0 ? 
											<div className="item-content">
												<span className="add-music" onClick={()=>this.onAddMusicClick(audio , index)}>
												{
													audio.fileName == "" || audio.fileName == undefined
													?  (<span><Icon type="plus" style={{marginRight : '5px'}} />添加音频</span> )
													: audio.fileName
												}
												</span>
												<div  onClick={()=>this.onMusicStateChange(audio , index)} className={audio.isPlaying ? 'sound open' : 'sound'}></div>
												<div className="loading"><Spin spinning={audio.loading ? true : false} tip="上传中,请勿重复操作"/></div>
												<audio ref={'audio_' + audio.id} src={audio.src}  >
												</audio>
												
												<form style={{display : 'none'}} >
													<input type="file" ref={audio.id}  onChange={ () => this.onAudioChange( audio , index)}/>
												</form>
											</div>
											:
											<div className="item-content">
												<textarea disabled={ userInfo.rw == 2 ? true : false} onChange={(e) => this.onTextAreaChange(e)} value={audio.content}></textarea>
											</div>
										}
										
									</div>
								)
							} )
						}
					
					</div>

				</div>

				<Confirm display={this.state.comfirmDisplay ? true : false}/>

			</div>
		)
	}
}