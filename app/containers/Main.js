
import React , { Component , PropTypes } from 'react' ;
import { connect } from 'react-redux';
import { addTodo , completeTodo , setVisibilityFilter , VisibilityFilters} from '../actions/actions';
import AddTodo from '../components/AddTodo';
import TopBar from '../components/TopBar';
import Sider from '../components/singlemenu/SingleMenu';
import Active from '../components/active/Active';
import DataStore from '../utils/DataStore.js' ;
import './app.css';
import './main.scss';
import {hashHistory} from 'react-router';
import {message} from 'antd';
//获取当前页面的location

console.log(hashHistory);

    // <div className="edit-form-item">
    //     <span className="label">验证码:</span>
    //     <input type="password" />
    //     <span onClick={this.onSentCheckNumClick} className="get-checknum">{this.state.sentMsg ? this.state.timeCount + '(s)' : '获取短信验证码'}</span>
    // </div>

class Main extends Component{

    constructor(props) {
        super(props);
        this.state = {
            pathname : '',
            bodyHeight : '',                            //内容区高度
            userInfo : {},
            editPasswordDisplay : false ,       //是否显示密码修改窗口
            passwordInfo : {                           //密码相关信息
                'oldpw' : '',
                'password' : '',
                'password1' : '',
                'checkNum' : ''
            },
            timeCount : 60,                             //验证码倒计时
            sentMsg : false                             //已发送验证码
        };
        this.handleResize = this.handleResize.bind(this);
        this.displayEditPassword = this.displayEditPassword.bind(this);
        this.onOldPasswordChange = this.onOldPasswordChange.bind(this);
        this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
        this.onNewConfirmChange = this.onNewConfirmChange.bind(this);
        this.onEditPasswordSubmit = this.onEditPasswordSubmit.bind(this);
        this.onSentCheckNumClick = this.onSentCheckNumClick.bind(this);
        this.resetPasswordInfo = this.resetPasswordInfo.bind(this);
    }


    componentWillMount() {
        console.log('main')
        let location = hashHistory.getCurrentLocation();
        let pathname = location.pathname.substr(location.pathname.lastIndexOf('/')+1);
        // console.log(pathname);
        // 从Cookie中获取用户信息
        let userInfo = Cookies.getJSON('userInfo');

        // 没有读取到用户信息则进入登录页面
        if(!userInfo){
            hashHistory.push("/login")
        }else{  
            this.setState({
                userInfo : userInfo,            //设置userInfo传递给子组件
                pathname : pathname == 'main'  || pathname== '' ? 'active' : pathname         //设置默认选中的菜单
            })

            if(pathname == 'main' || pathname == ""){
                hashHistory.push("/main/active");
            }else{
                hashHistory.push("/main/" + pathname);
            }
            
        }

        // 为窗口添加resize事件
        window.addEventListener('resize', this.handleResize);  
        this.setState({
            bodyHeight : $(document).height() - 80
        })
    }

    // 组件卸载时移除resize事件
    componentWillUnmount() {
        window.removeEventListener('resize' , this.handleResize);
    }

    // 处理resize事件,当页面尺寸发生变化时,重新设置页面的高度
    handleResize(){
        this.setState({
            bodyHeight : $(document).height() - 80
        })
    }

    // 修改密码
    displayEditPassword(flag){
        this.setState({
            editPasswordDisplay : flag
        })
    }

    // 提交密码修改
    onEditPasswordSubmit(){
        let me = this ;
        let passwordInfo = this.state.passwordInfo;
        let userInfo = this.state.userInfo;

        if(passwordInfo.password  != passwordInfo.password1 ){
            message.error('密码不一致');
        }else{
            // console.log(userInfo);
            // console.log(passwordInfo);
            let obj = {
                id : userInfo.id , 
                oldpw : md5(passwordInfo.oldpw) , 
                password  : md5(passwordInfo.password) 
            }
            if(__DEV__){
                console.log(obj);
                message.info("测试环境!")
            }else{
                DataStore.updatePassword(obj).then( data => {
                    message.success("密码修改成功");
                    me.displayEditPassword(false);
                    me.resetPasswordInfo();
                }).catch( error => {
                    message.error("密码修改失败");
                })
            }
            
            
        }
        
    }

    onSentCheckNumClick(){

        let sentMsg = this.state.sentMsg;
        if(sentMsg){
            return ;
        }

        let me = this ;
        let timeCount = this.state.timeCount;
        me.setState({
            sentMsg : true
        })

        let timeInt = setInterval(function(){
            me.setState({
                timeCount : --timeCount
            })
            if(timeCount<= 0 ){
                clearInterval(timeInt)
                me.setState({
                    sentMsg : false
                })
            }
        },1000)
    }

    onOldPasswordChange(e){
        this.setPasswordInfo('oldpw' , e.target.value)
    }

    onNewPasswordChange(e){
        this.setPasswordInfo('password' , e.target.value);
    }

    onNewConfirmChange(e){
        this.setPasswordInfo('password1' , e.target.value);
    }

    resetPasswordInfo(){
        let passwordInfo = this.state.passwordInfo;
        passwordInfo.oldpw = "",
        passwordInfo.password  = "",
        passwordInfo.password1 = "",
        passwordInfo.checkNum = "",
        this.setState({
            passwordInfo : passwordInfo
        })
    }

    setPasswordInfo( prop , value){
        let passwordInfo = this.state.passwordInfo;
        passwordInfo[prop] = value;
        this.setState({
            passwordInfo : passwordInfo
        })
    }

    // <!-- <div className="modal"></div> -->

    render(){
        const { dispatch } = this.props;
        return (
            <div className="wrap">
                <TopBar displayEditPassword={this.displayEditPassword} isLogin={this.state.isLogin} userInfo={this.state.userInfo} />
                <div className="content" style={{height : this.state.bodyHeight + 'px'}}>
                    <Sider pathname={this.state.pathname} userInfo={this.state.userInfo}/>
                    <div className="right-wrap">
                        {this.props.children}       
                    </div>
                </div>

                <div className={this.state.editPasswordDisplay  ? "modal" : 'hidden'} ></div>

                <div className={this.state.editPasswordDisplay ? "password-edit-wrap" : 'hidden'} >
                    <div className="edit-form">
                        <div className="edit-form-item">
                            <span className="label">旧密码:</span>
                            <input type="password" placeholder="请输入旧密码" value={this.state.passwordInfo.oldpw} onChange={this.onOldPasswordChange}/>
                        </div>
                        <div className="edit-form-item">
                            <span className="label">新密码:</span>
                            <input type="password" placeholder="请输入新密码" value={this.state.passwordInfo.password } onChange={this.onNewPasswordChange}/>
                        </div>
                        <div className="edit-form-item">
                            <span className="label">再次输入:</span>
                            <input type="password" placeholder="请再次输入新密码" value={this.state.passwordInfo.password1 } onChange={this.onNewConfirmChange}/>
                        </div>
                    
                        <div className="edit-btn" onClick={this.onEditPasswordSubmit}>
                            <span>修改密码</span>
                        </div>

                        <div className="close" onClick={()=>this.displayEditPassword(false)}></div>
                    </div>
                </div>

            </div>
        )
    }
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

function select(state) {
    return {
        visibleTodos : selectTodos(state.todos , state.visibilityFilter),
        visibilityFilter : state.visibilityFilter
    }
}

export  default connect(select)(Main);




