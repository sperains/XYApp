import {message} from 'antd';

function checkPath(pathname){

	let menuList = Cookies.getJSON('menuList');//获取权限菜单列表
	let flag = false;//是否验证通过的标识.
	//遍历菜单
	for(let i = 0 ; i < menuList.length ; i++){
		let menu = menuList[i];
		//如果路由地址在权限菜单中存在则验证通过.
		let k = pathname.indexOf(menu.router);
		if(k > 0){//若不存在则k为-1
			flag = true;break;
		}
	}
	return flag ;
}

function alertMessage(){
	message.info("该账户为只读权限!");
}
		


module.exports = {
	checkPath : checkPath,
	alertMessage : alertMessage
} ;