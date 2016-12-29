import React ,{ Component} from 'react';

export default class Map extends Component{

	constructor(props) {
		super(props);
	}

	componentDidMount() {

		var me = this ;
		var map, geolocation;
			//加载地图，调用浏览器定位服务
			map = new AMap.Map('map', {
			resizeEnable: true,
			zoom : 12
		});
		me.map = map ;
		me.geolocation = geolocation;

		AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
			function(){
				map.addControl(new AMap.ToolBar({
				}));
		});
		
		//设置标记点
		let marker = new AMap.Marker({
			icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png"
		});
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
						me.props.setAddress(address , e.lnglat);
					}
				});     
			});
		});
	}

	componentWillReceiveProps(nextProps) {
		let address = nextProps.address;
		let me = this ;
		me.map.plugin(["AMap.Geocoder"], function () {
			var geocoder = new AMap.Geocoder({
					radius: 1000,
					extensions: "all"
				});  
			geocoder.getLocation(address, function(status, result) {
				if (status === 'complete' && result.info === 'OK') {
					//TODO:获得了有效经纬度，可以做一些展示工作
					//比如在获得的经纬度上打上一个Marker
					me.marker.setPosition(result.geocodes[0].location);
					me.marker.setMap(me.map);
					me.map.setCenter(me.marker.getPosition());
					// me.props.setLnglat(result.geocodes[0].location);

				}else{
					//获取经纬度失败
				}
			});      
		});
	}

	showCityInfo() {
		//实例化城市查询类
		var citysearch = new AMap.CitySearch();
		//自动获取用户IP，返回当前城市
		citysearch.getLocalCity(function(status, result) {
			if (status === 'complete' && result.info === 'OK') {
				if (result && result.city && result.bounds) {
					var cityinfo = result.city;
					var citybounds = result.bounds;
					document.getElementById('tip').innerHTML = '您当前所在城市：'+cityinfo;
					//地图显示当前城市
					map.setBounds(citybounds);
				}
			} else {
				document.getElementById('tip').innerHTML = result.info;
			}
		});
	}


	render() {
		return (
			<div className="map" id="map"></div>
		)
	}
} 