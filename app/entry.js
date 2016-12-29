// require('es5-shim');
// require('es5-shim/es5-sham');
// require('console-polyfill');

import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import  {Router , Route , IndexRoute , Redirect , hashHistory} from 'react-router';
import App from './App';
import Main from './containers/Main';
import Login from './components/login/Login';
import Donation from './components/donation/Donation';
import Active from './components/active/Active';
import NewActive from './components/active/newactive/NewActive';
import ActiveDetail from './components/active/detail/Detail';
import Member from './components/member/Member';
import MemberDetail from './components/member/detail/Detail';
import Number from './components/number/Number';
import Life from './components/life/Life';
import Identity from './components/identity/Identity';
import IdentityEdit from './components/identity/edit/Edit';
import Score from './components/score/Score';
import ScoreDetail from './components/score/ScoreDetail';
import Error404 from './components/Error404';
import FeedBack from './components/feedback/FeedBack';
import Test1 from './components/test/ImageCrop';
import store from './store.js';


let root = $('#container')[0];

function onRouterLeave(){
    console.log('leave')
}

ReactDOM.render(
    <Provider store={store}>
    	<Router history={hashHistory} onLeave={onRouterLeave}>
    		<Route  path="/mp" component={App}>
                                <Route path="/" component = {Login} />
                                <Route path="/main" component = {Main} >
                                    <Route path="/main/donation" component={Donation}/>
                                    <Route path="/main/active" component={Active}/>
                                    <Route path="/main/active-new" component={NewActive} />
                                    <Route path="/main/active-detail" component={ActiveDetail} />
                                    <Route path="/main/member" component={Member} />
                                    <Route path="/main/member-detail" component={MemberDetail} />
                                    <Route path="/main/number" component={Number} />
                                    <Route path="/main/life" component={Life} />
                                    <Route path="/main/identity" component={Identity} />
                                    <Route path="/main/identity-edit" component={IdentityEdit} />
                                    <Route path="/main/score" component={Score} />
                                    <Route path="/main/score-detail" component={ScoreDetail} />
                                    <Route path="/main/feedback" component={FeedBack} />
                                    <Route path="/main/test1" component={Test1} />
                                    ＜Redirect from="/main/*" to="/*" />
                                </Route>
                                <Route path="/login" component = {Login} />
                                <Route path="/test1" component={Test1} />
                                <Route path="/*" component={Error404} />
    		</Route>
    	</Router>
    </Provider>,
    root
);