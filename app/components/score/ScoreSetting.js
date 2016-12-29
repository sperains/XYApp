
import React , {Component} from 'react';
import {Table , Spin} from 'antd';
import './scoreSetting.scss';
import DataStore from '../../utils/DataStore.js' ;
import { alertMessage } from '../../utils/Verification';

//数据格式
       // {
       //      "id":"1",
       //      "name":"喜悦捐赠",
       //      "rule":1,
       //      "ruleName":"分/元",
       //      "integral":10,
       //      "isOpen":1
       //  },

export default class Score extends Component{

	constructor(props) {
		super(props);
		this.state = {
			items : [],
			option : {
				disable : true
			},
			loading : true		
		}
		this.onSwitchChange = this.onSwitchChange.bind(this);
		this.onIntegralChange = this.onIntegralChange.bind(this);
	}

	componentDidMount() {
		let me = this ;
		DataStore.getIntegralRule().then( (data)=>{			
			me.setState({
				items :data,
				loading : false
			})
		});
	}

	componentWillMount() {

	}

	componentWillUnmount() {

	}

	onSwitchChange(item ,index){

		let userInfo = Cookies.getJSON("userInfo");
		if(userInfo.rw == 2 ){
			alertMessage();
			return ;
		}


		let items = this.state.items;
		items[index].isOpen = !items[index].isOpen ? 1 : 0 ;
		this.setState({
			items : items
		})

		this.props.setIntegralRule(items);
	}

	onIntegralChange( item , index ){


		let items = this.state.items;
		let value = this.refs['integral_' + index].value.trim();

		value=value.replace(/[^\d]/g,''); //只能输整数

		if(value == 0 ){
			item.integral = 0 ;
			items[index] = item ;
			this.setState({
				items : items
			})
			return ;
		}


		item.integral = value.replace(/\b(0+)/gi,"") ;//去掉整数前面的0

		if(value == ""){
			item.integral = 0 ;//如果为空则设置为0
		}

		items[index] = item;

		this.setState({
			items : items
		})

		this.props.setIntegralRule(items);

	}

	render() {
		return (
			<div className="score-setting">
				<div className="setting-table">
					<div className="table-header">
						<span>项目</span>
						<span>能量规则</span>
						<span>开启</span>
					</div>
					<div className="table-content">
					<Spin spinning={this.state.loading} tip='加载中'>
						{
							this.state.items.map( (item , index)=>{
								let userInfo = Cookies.getJSON("userInfo");
								return (
									<div className="row" key={index}>
										<div className="option"><span>{item.name}</span></div>
										<div className="setting">
											<input disabled={(item.isOpen || userInfo.rw == 2) ? true : false} value={item.integral} ref={'integral_' + index} onChange={()=>this.onIntegralChange( item , index)} />
											<span className={(item.isOpen || userInfo.rw == 2) ? 'gray' : ''}>{item.ruleName}</span>
										</div>
										<div className="switch-wrap"><span onClick={()=>this.onSwitchChange(item, index)} className={item.isOpen ? 'switch open' : 'switch close'}></span></div>
									</div>
								)
							})
						}
					</Spin>
					</div>
				</div>
			</div>
		)
	}
}