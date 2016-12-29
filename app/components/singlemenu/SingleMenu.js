import React , {Component} from 'react';
import './singleMenu.scss';
import { hashHistory } from 'react-router';

export default class SingleMenu extends Component{

	constructor(props) {
		super(props);
		this.state = {
			collapse : false,
			menuList : [
				{ key : 1 , text : '会员管理', active : props.pathname.startsWith('member') ? true : false , imgCls : 'member' , router : 'member'},
				{ key : 2 , text : '线下活动', active : props.pathname.startsWith('active') ? true : false , imgCls : 'activity' , router:'active'},
				{ key : 3 , text : '正念训练', active : props.pathname.startsWith('life') ? true : false , imgCls : 'life' , router:'life'},
				{ key : 4 , text : '生命数字', active : props.pathname.startsWith('number') ? true : false , imgCls : 'number' , router:'number'},
				{ key : 5 , text : '喜悦能量', active : props.pathname.startsWith('score') ? true : false , imgCls : 'score' , router:'score'},
				{ key : 6 , text : '喜悦捐赠', active : props.pathname.startsWith('donation') ? true : false  , imgCls : 'donate' , router:'donation'},
				{ key : 7 , text : '用户反馈', active : props.pathname.startsWith('feedback') ? true : false , imgCls : 'feedback' , router:'feedback' },
				{ key : 8 , text : '职级管理', active : props.pathname.startsWith('identity') ? true : false , imgCls : 'account' , router:'identity' }
			]
		}
		this.onMenuCollapse = this.onMenuCollapse.bind(this);
		this.onMenuClick = this.onMenuClick.bind(this);
	}

	componentDidMount() {
		let userInfo = this.props.userInfo;
		let menuList = this.state.menuList;
		let permissionMenuList  = menuList.filter( (menu) =>{
			return userInfo.permission.indexOf(menu.key) >= 0 
		});
		Cookies.set('menuList', permissionMenuList);

		this.setState({
			menuList : permissionMenuList
		})
	}

	onMenuCollapse(){
		this.setState({
			collapse : !this.state.collapse
		})
	}

	onMenuClick(index){
		let menuList = this.state.menuList;
		menuList.map( (menu , i) => {
			if( index === i ){
				menu.active = true
				hashHistory.push( '/main/' +  menu.router)
			}else{
				menu.active = false
			}
			return menu;
		})

		this.setState({
			menuList : menuList
		})


	}

	render(){
		return (
				<div className={this.state.collapse ? 'sider-wrap sider-wrap-collapse' : 'sider-wrap'}>
					<div className="collapse-menu-wrap" onClick={this.onMenuCollapse}>
						<div  className={this.state.collapse ? 'collapse' : ''}></div>
					</div>
					<div className="menu-list">
						{
							this.state.menuList.map( (menu , index) => (
								<div key={index} className={menu.active ?  'menu-item active' : 'menu-item'} onClick={ ()=>this.onMenuClick(index)}>
									<div className={this.state.collapse ? 'img collapse ' + menu.imgCls : 'img ' + menu.imgCls}></div>
									<span className="text">{menu.text}</span>	
								</div>
								)
							)
						}
					</div>
				</div>
			)
	}
}

