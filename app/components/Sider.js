import React  , {Component}  from 'react' ;
import { Menu, Icon , Switch  } from 'antd';
import './sider.scss';
import menuIcon from '../resources/images/menu.png';
import donateIcon from '../resources/images/donate.png';
import scoreIcon from '../resources/images/score.png';
import memberIcon from '../resources/images/member.png';
import activityIcon from '../resources/images/activity.png';
import numberIcon from '../resources/images/number.png';
import lifeIcon from '../resources/images/life.png';
import accountIcon from '../resources/images/account.png';


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class Sider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current : '0' ,
			openKeys : [],
			collapse : false ,
		}
		this.handleClick = this.handleClick.bind(this);
		this.onOpenChange=this.onOpenChange.bind(this);
		this.onMenuCollapse = this.onMenuCollapse.bind(this);
	}

	componentDidMount() {
		var  data = require('json!../resources/data/menu.json');
		console.log(data);
	}	

	handleClick(e) {
		this.setState({
			current : e.key
		})
	}

	// 控制菜单折叠和展开
	onMenuCollapse(){
		this.setState({
			collapse : !this.state.collapse
		})
	}

	onOpenChange(openKeys){
		const state = this.state;
		const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));

		const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

		let nextOpenKeys = [];
		if (latestOpenKey) {
			nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
		}
		if (latestCloseKey) {
			nextOpenKeys = this.getAncestorKeys(latestCloseKey);
		}
		this.setState({ openKeys: nextOpenKeys });
	}

	getAncestorKeys(key) {
		const map = {
			sub3: ['sub2'],
		};
		return map[key] || [];
	}

	render() {
	    return (
	      <div className="sider-wrap" style={{ width : this.state.collapse ? '40px' : '200px' }}>
	      	  <div className="menu-icon">
	      	  	<img src={menuIcon} onClick= {this.onMenuCollapse} className={this.state.collapse ? '' : 'rotate'}/>
	      	  </div>
	        <Menu
	          selectedKeys={[this.state.current]}
	          onOpenChange={this.onOpenChange}
	          mode={this.state.collapse ? 'vertical' : 'inline'}
	          onClick={this.handleClick}
	          theme='dark'
	        >
	          <SubMenu key="sub1" title={<span className="menu-title"><img className={this.state.collapse ? 'icon collapse' : 'icon'} src={donateIcon} /><span>喜悦捐赠</span></span>}>
	            <Menu.Item key="1">Option 1</Menu.Item>
	            <Menu.Item key="2">Option 2</Menu.Item>
	            <SubMenu key="sub3" title="Submenu">
	              <Menu.Item key="3">Option 3</Menu.Item>
	              <Menu.Item key="4">Option 4</Menu.Item>
	            </SubMenu>
	          </SubMenu>
	          <SubMenu key="sub2" title={<span className="menu-title"><img className={this.state.collapse ? 'icon collapse' : 'icon'} src={scoreIcon} /><span>喜悦积分</span></span>}>
	            <Menu.Item key="5">Option 5</Menu.Item>
	            <Menu.Item key="6">Option 6</Menu.Item>
	            <SubMenu key="sub3" title="Submenu">
	              <Menu.Item key="7">Option 7</Menu.Item>
	              <Menu.Item key="8">Option 8</Menu.Item>
	            </SubMenu>
	          </SubMenu>
	          <SubMenu key="sub4" title={<span className="menu-title"><img className={this.state.collapse ? 'icon collapse' : 'icon'} src={memberIcon} /><span>会员管理</span></span>}>
	            <Menu.Item key="9">Option 9</Menu.Item>
	            <Menu.Item key="10">Option 10</Menu.Item>
	            <Menu.Item key="11">Option 11</Menu.Item>
	            <Menu.Item key="12">Option 12</Menu.Item>
	          </SubMenu>
	          <SubMenu key="sub5" title={<span className="menu-title"><img className={this.state.collapse ? 'icon collapse' : 'icon'} src={activityIcon} /><span>喜悦活动</span></span>}>
	            <Menu.Item key="13">Option 9</Menu.Item>
	            <Menu.Item key="14">Option 10</Menu.Item>
	            <Menu.Item key="15">Option 11</Menu.Item>
	            <Menu.Item key="16">Option 12</Menu.Item>
	          </SubMenu>
	          <SubMenu key="sub6" title={<span className="menu-title"><img className={this.state.collapse ? 'icon collapse' : 'icon'} src={numberIcon} /><span>生命数字</span></span>}>
	            <Menu.Item key="17">Option 9</Menu.Item>
	            <Menu.Item key="18">Option 10</Menu.Item>
	            <Menu.Item key="19">Option 11</Menu.Item>
	            <Menu.Item key="20">Option 12</Menu.Item>
	          </SubMenu>
	          <SubMenu key="sub7" title={<span className="menu-title"><img className={this.state.collapse ? 'icon collapse' : 'icon'} src={lifeIcon} /><span>正念生活</span></span>}>
	            <Menu.Item key="21">Option 9</Menu.Item>
	            <Menu.Item key="22">Option 10</Menu.Item>
	            <Menu.Item key="23">Option 11</Menu.Item>
	            <Menu.Item key="24">Option 12</Menu.Item>
	          </SubMenu>
	          <SubMenu key="sub8" title={<span className="menu-title"><img className={this.state.collapse ? 'icon collapse' : 'icon'} src={require('../resources/images/account.png')} /><span>账户管理</span></span>}>
	            <Menu.Item key="25">Option 9</Menu.Item>
	            <Menu.Item key="26">Option 10</Menu.Item>
	            <Menu.Item key="27">Option 11</Menu.Item>
	            <Menu.Item key="28">Option 12</Menu.Item>
	          </SubMenu>
	        </Menu>
	      </div>
	    );
	  }





}