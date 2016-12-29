/**
 * Created by itachi on 16/11/3.
 */
const uuid = require('uuid');
var Mock = require("mockjs");
var MockRandom = Mock.Random;
var AppConfig = require("./AppConfig.js");

// 配置请求的相应时间
Mock.setup({timeout:'500-800'});

// 模拟首页请求数据
Mock.mock(AppConfig.ApiConfig.getBarginInfo,{
    'status':0,
    'data':{
        'openId': '@string',
        'isMine|0-1': 1,
        'isFirst|0-1': 1,
        'money':MockRandom.integer(30000,40000),
        'price':MockRandom.integer(100000,500000),
        'originalPrice':MockRandom.integer(500000,600000),
        'name|1':['奥迪A7','奔驰','雪铁龙'],
        'deadline|1':['2016/11/08 00:00:00','2016/11/09 00:00:00','2016/11/10 00:00:00']
    }
});

Mock.mock(AppConfig.ApiConfig.getActiveList,{
    'status' : 0 ,
    'data|1-10' : [
        {
            'id' : '@string',
            'createTime' : MockRandom.date('yyyy-MM-dd'),
            'release|0-2' : MockRandom.natural(0, 2),
            'title' : MockRandom.csentence(2),
            'subTitle' : MockRandom.csentence(20),
            'address' : MockRandom.province() + MockRandom.city() + MockRandom.county() + 'XX大酒店2楼',
            'isOpenLimit|1' : true,
            'activeLimit' : 0,
            'personCount' : MockRandom.natural(0, 1000),
            'imageUrl' : 'https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg',
            'lng' : '30.5092',
            'lat' : '10.4879',
            'activeTime' : MockRandom.date('yyyy-MM-dd HH:mm'),
            'desc':MockRandom.csentence(50)
        }
    ]
});

Mock.mock(AppConfig.ApiConfig.getEnrollList,{
    'status' : 0 , 
    'data|1-200' : [
        {   
            "id":"1",
            "name":"潘",
            "phone":"15623240925", 
            "ageGroup" : '1' ,
            "checkInStatus":0,
            'sex' : '0' , 
            'wechatId' : 'test',
            'address' : 'sdffffffffffsadfasdfasdfasdfasdfsdf发撒旦法撒旦法是大法师打发撒旦法阿萨德',
            'diseaseRecord' : '病病病病病病病病病病病病病病病病病病病病病病'
        }
    ]
});


Mock.mock(AppConfig.ApiConfig.getMemberList,{
    'status' : 0 ,
    'data|1-1000' : [
        {
            'id': '@string',
            'name': MockRandom.csentence(Math.random()*2+1),
            'phone' : '15623551300',
            'birthday' : MockRandom.date('yyyy-MM-dd') ,
            'nickname': `Sperains`,
            'totalScore': Math.round(Math.random()*1000),
            'donatedMoney|0-1000' : MockRandom.integer(100,1000),
            'inviter' : '万德武',
            'identity|1-3' : MockRandom.integer(1,3),
            'detail' : '详情',
            'attendCount' : MockRandom.integer(0,3)
        }
    ]
});

Mock.mock(AppConfig.ApiConfig.getMemberListById,{
    'status' : 0 ,
    'data|1-100' : [
        {
            'id' :'@string',
            'imgUrl' : MockRandom.dataImage('80x80'),
            'name' : MockRandom.csentence(Math.random()*2+1)
        }
    ]
});

Mock.mock(AppConfig.ApiConfig.getNumDetail ,{
    'status' : 0,
    'data' : [
        {   
            'name' : '命运数',
            'infolist' : [
                {
                    'id' : uuid(),
                    'num' : 1 ,
                    'desc' : 'a',
                    'natureadv' : 'b',
                    'natureweak' : 'c',
                    'details' : [
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : uuid(),
                    'num' : 2 ,
                    'desc' : '',
                    'natureadv' : "",
                    'natureweak' : "" ,
                    'details' : [
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : uuid(),
                    'num' : 3 ,
                    'desc' : MockRandom.csentence(5),
                    'natureadv' : MockRandom.csentence(5),
                    'natureweak' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : uuid(),
                    'num' : 4 ,
                    'desc' : MockRandom.csentence(5),
                    'natureadv' : MockRandom.csentence(5),
                    'natureweak' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : uuid(),
                    'num' : 5 ,
                    'desc' : MockRandom.csentence(5),
                    'natureadv' : MockRandom.csentence(5),
                    'natureweak' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : uuid(),
                    'num' : 6,
                    'desc' : MockRandom.csentence(5),
                    'natureadv' : MockRandom.csentence(5),
                    'natureweak' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : uuid(),
                    'num' : 7 ,
                    'desc' : MockRandom.csentence(5),
                    'natureadv' : MockRandom.csentence(5),
                    'natureweak' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : uuid(),
                    'num' : 8 ,
                    'desc' : MockRandom.csentence(5),
                    'natureadv' : MockRandom.csentence(5),
                    'natureweak' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : uuid(),
                    'num' : 9 ,
                    'desc' : MockRandom.csentence(5),
                    'natureadv' : MockRandom.csentence(5),
                    'natureweak' : MockRandom.csentence(5),
                    'details' : [
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                }
            ]
        },
        {   
            'name' : '天赋数',
            'infolist' : [
                {
                    'id' : '@string',
                    'num' : 1 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [
                          { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)},
                        { 'id' : uuid() , 'content' : MockRandom.csentence(20)}
                    ]
                },
                {
                    'id' : '@string',
                    'num' : 2 ,
                    'keyword' : MockRandom.csentence(5),
                    'details' : [

                    ]
                }
            ]
        }
    ]
});




Mock.mock(AppConfig.ApiConfig.getIntegralRule ,{
    'status' : 0 ,
    'data' : [
        {
            "id":"1",
            "name":"喜悦捐赠",
            "rule":1,
            "ruleName":"点能量/元",
            "integral":10,
            "isOpen":1
        },
        {
            "id":"2",
            "name":"活动报名",
            "rule":2,
            "ruleName":"点能量/次",
            "integral":0,
            "isOpen":0
        },
        {
            "id":"3",
            "name":"活动签到",
            "rule":2,
            "ruleName":"点能量/次",
            "integral":0,
            "isOpen":0
        },
        {
            "id":"4",
            "name":"生命数字",
            "rule":2,
            "ruleName":"点能量/次",
            "integral":0,
            "isOpen":1
        },
        {
            "id":"5",
            "name":"正念静坐",
            "rule":2,
            "ruleName":"点能量/次",
            "integral":0,
            "isOpen":1
        },
        {
            "id":"6",
            "name":"正念行走",
            "rule":2,
            "ruleName":"点能量/次",
            "integral":0,
            "isOpen":0
        },
        {
            "id":"7",
            "name":"正念用餐",
            "rule":2,
            "ruleName":"点能量/次",
            "integral":0,
            "isOpen":1
        }
    ]
})




Mock.mock(AppConfig.ApiConfig.getIntegralRank ,{
    'status' : 0 ,
    'data' : [
        {
            "id":"1",
            "rankIndex":"1",
            "name":"Rains",
            "identity" : 1 ,
            "activeScore":"2",
            "numberScore":"3",
            "lifeScore":"4",
            "donationScore":"5",
            "totalScore":"9"
        },
        {
            "id":"3",
            "rankIndex":"2",
            "name":"Rains",
            "identity" : 2 ,
            "activeScore":"2",
            "numberScore":"3",
            "lifeScore":"4",
            "donationScore":"6",
            "totalScore":"10"
        },
        {
            "id":"2",
            "rankIndex":"3",
            "name":"Rains",
            "identity" : 3 ,
            "activeScore":"6",
            "numberScore":"44",
            "lifeScore":"45",
            "donationScore":"45",
            "totalScore":"456"
        }
    ]
})

Mock.mock(AppConfig.ApiConfig.getScoreDetail ,{
    'status' : 0 , 
    'data' : [
        {
            'item' : '喜悦捐赠',
            'time' : MockRandom.date('yyyy-MM-dd'),
            'score' : MockRandom.integer(500,1000) ,
            'type' : 4
        },
        {
            'item' : '[静心]活动报名',
            'time' : MockRandom.date('yyyy-MM-dd'),
            'score' : MockRandom.integer(500,1000),
            'type' : 1
        },
        {
            'item' : '静心活动签到',
            'time' : MockRandom.date('yyyy-MM-dd'),
            'score' : MockRandom.integer(500,1000) ,
            'type' : 1
        },{
            'item' : '声明数字',
            'time' : MockRandom.date('yyyy-MM-dd'),
            'score' : MockRandom.integer(500,1000),
            'type' : 2
        },
        {
            'item' : '正念静坐',
            'time' : MockRandom.date('yyyy-MM-dd'),
            'score' : MockRandom.integer(500,1000) ,
            'type' : 3
        },
        {
            'item' : '正念行走',
            'time' : MockRandom.date('yyyy-MM-dd'),
            'score' : MockRandom.integer(500,1000),
            'type' : 3 
        },
        {
            'item' : '正念用餐',
            'time' : MockRandom.date('yyyy-MM-dd'),
            'score' : MockRandom.integer(500,1000),
            'type' : 3
        }

    ]
});

Mock.mock(AppConfig.ApiConfig.getIdentityInfo ,{
    'status' : 0 ,
    'data'  : [
        {
            'identityName' : '超级管理员',
            'type' : 1,
            'username' : 'admin',
            'password' : '123456',
            'phone' : '15623551300',
            'rw' : 1,
            'permission' : [1,2,3,4,5,6,7,8],
        },
        {
            'identityName' : '管理员',
            'type' : 2,
            'username' : 'rains',
            'password' : '123456',
            'phone' : '18927501347',
            'rw' : 2,
            'permission' : [1,2],
        }
    ]
});

Mock.mock(AppConfig.ApiConfig.getIdentityTypes ,{
    'status' : 0 ,
    'data' : [
        {
            'name' : '超级管理员',
            'type' : 1
        },
        {
            'name' : '普通管理员',
            'type' : 2
        }
    ]
});

Mock.mock(AppConfig.ApiConfig.getLifeInfo ,{
    "status":"0",
    "data":{
        "walkAudioList":[
            // {
            //     "id":"1",
            //     "text":
            //     "语音引导",
            //     "fileName":"n5.mp3",
            //     "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/n5.mp3",
            //     "type":0,
            //     "useType":1,
            //     "isUsed":0
            // },
            {
                "id":"2",
                "text":"背景音乐",
                "fileName":"释迦牟尼佛心咒-马常胜.mp3",
                "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/释迦牟尼佛心咒-马常胜.mp3",
                "type":0,
                "useType":2,
                "isUsed":1
            },
            {
                "id":"3",
                "text":"计时铃声",
                "fileName":"闹钟音效.mp3",
                "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/闹钟音效.mp3",
                "type":0,
                "useType":3,
                "isUsed":1
            },
            {
                "id":"4",
                "text":"背景文字",
                "type":1,
                "useType":4,
                "isUsed":1,
                "content":"1.如果你的心是乱的，你看这个世上，也就是乱的\n\n你想的越多，遇到的麻烦就会越多;什么都不想，反倒一点麻烦没有。你怕的越多，欺负你的人就越多;什么都不怕了，反倒没人敢欺负你。你人品好，别人就来占你的便宜。你横一点，反倒都来讨好你。\n\n所以，别一味退让，当受到委屈时，你要勇敢地说No。能让你笑着面对的，就是最好的生活。\n\n2.不要对爱你的人太过于刻薄\n\n一辈子真正对你好的人也没有几个。多少人在一切都将失去时，才幡然醒悟：爱的宽厚，不能过度消耗。每个人都有脾气，为你忍下所有的怒气，仅仅因为那个人比你更心疼你。\n\n生活总不完美，总有辛酸的泪，总有失足的悔，总有幽深的怨，总有抱憾的恨。生活亦很完美，总让我们泪中带笑，悔中顿悟，怨中藏喜，恨中生爱。从明天起，做一个这样的人：率性而行，继之而悟，随遇而安。\n\n以最自然的姿态和意愿去生活，你会发现内心深处的快乐，将不可一世地蓬勃生长。\n\n3.总有某段路，只能你一个人走\n\n总有许多事，需要你一个人扛。别畏惧孤独，它能帮你划清内心的清浊，是你无法拒绝的命运历程;别躲避困苦，莫让冷世的尘埃，冰封你的笑容，迟滞你的步履。走得越久，时光越老，人心越淡。忘不掉昨天，它就是束缚你的阴影;向往着明天，你才能描绘它的模样。\n\n每只毛毛虫都可以变成自己的蝴蝶。只不过，在变成蝴蝶之前，自己会先变成作茧自缚的蛹。在茧里边面对自己制造的痛苦，任何挣扎或试图改变的行为都是徒劳的。蛹只有一个选择，那就是放弃所有抗拒、全然接纳当下感觉、平静等待。直到有一天破茧而出成为蝴蝶。\n\n4.那么多当时你觉得快要要了你的命的事情\n\n那么多你觉得快要撑不过去的境地，都会慢慢的好起来。就算再慢，只要你愿意等，它也愿意成为过去。而那些你暂时不能战胜的，不能克服的，不能容忍的，不能宽容的，就告诉自己，凡是不能杀死你的，最终都会让你更强。\n\n幸福，就是当激情退去容颜衰老，牵你的还是那双不怨悔的手；就是当财富散尽一无所有，陪你的还是那颗不回头的心；就是当灾难降临众生远离，暖你的还是那份不冷却的情。\n\n幸福很简单，就是找一个温暖的人共同燃烧此生，奢侈、富贵、炫耀只是一层包装，只要你觉得是幸福的，其它一切都无所谓。\n\n5.生活不是用来妥协的\n\n你退缩得越多，能让你喘息的空间就越有限；日子不是用来将就的，你表现得越卑微，一些幸福的东西就会离你越远。在有些事中，无须把自己摆得太低，属于自己的，都要积极地争取；在有些人前，不必一而再的容忍，不能让别人践踏你的底线。只有挺直了腰板，世界给你的回馈才会多点。\n\n一个人的内心，要像一捧清澈的水。风来，只是一道道涟漪，终究会归于平静；雨落，只是一些些涌动，终究会落幕成寂；云过，只是一道道风景，终究会成为记忆。守候一片自己的领域，无关尘世，无关风月，只是一种善良，一种责任，一种深深的爱恋。\n\n一个老板再难也不会轻言放弃，而一个员工做得不顺就想逃走，一对夫妻再吵再大矛盾，也不会轻易离婚，而一对情侣常为一些很小的事就分开了。说到底，你在一件事，一段关系上的投入多少，决定你能承受多大的压力，能坚守多长时间，伟大都是熬出来的。为什么用熬，因为普通人承受不了的委屈你得承受。\n\n情绪，就是心魔。当你决定不再在乎的时候，生活就好起来了。"
            }
        ],
        "mealAudioList":[
            // {
            //     "id":"9",
            //     "text":"语音引导",
            //     "type":0,
            //     "useType":1,
            //     "isUsed":0
            // },
            {
                "id":"10",
                "text":"背景音乐",
                "fileName":"释迦牟尼佛心咒-马常胜.mp3",
                "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/释迦牟尼佛心咒-马常胜.mp3",
                "type":0,"useType":2,"isUsed":1
            },
            {
                "id":"11",
                "text":"计时铃声",
                "type":0,
                "useType":3,
                "isUsed":0
            },
            {
                "id":"12",
                "text":"背景文字",
                "type":1,
                "useType":4,
                "isUsed":1,
                "content":"1.如果你的心是乱的，你看这个世上，也就是乱的\n\n你想的越多，遇到的麻烦就会越多;什么都不想，反倒一点麻烦没有。你怕的越多，欺负你的人就越多;什么都不怕了，反倒没人敢欺负你。你人品好，别人就来占你的便宜。你横一点，反倒都来讨好你。\n\n所以，别一味退让，当受到委屈时，你要勇敢地说No。能让你笑着面对的，就是最好的生活。\n\n2.不要对爱你的人太过于刻薄\n\n一辈子真正对你好的人也没有几个。多少人在一切都将失去时，才幡然醒悟：爱的宽厚，不能过度消耗。每个人都有脾气，为你忍下所有的怒气，仅仅因为那个人比你更心疼你。\n\n生活总不完美，总有辛酸的泪，总有失足的悔，总有幽深的怨，总有抱憾的恨。生活亦很完美，总让我们泪中带笑，悔中顿悟，怨中藏喜，恨中生爱。从明天起，做一个这样的人：率性而行，继之而悟，随遇而安。\n\n以最自然的姿态和意愿去生活，你会发现内心深处的快乐，将不可一世地蓬勃生长。\n\n3.总有某段路，只能你一个人走\n\n总有许多事，需要你一个人扛。别畏惧孤独，它能帮你划清内心的清浊，是你无法拒绝的命运历程;别躲避困苦，莫让冷世的尘埃，冰封你的笑容，迟滞你的步履。走得越久，时光越老，人心越淡。忘不掉昨天，它就是束缚你的阴影;向往着明天，你才能描绘它的模样。\n\n每只毛毛虫都可以变成自己的蝴蝶。只不过，在变成蝴蝶之前，自己会先变成作茧自缚的蛹。在茧里边面对自己制造的痛苦，任何挣扎或试图改变的行为都是徒劳的。蛹只有一个选择，那就是放弃所有抗拒、全然接纳当下感觉、平静等待。直到有一天破茧而出成为蝴蝶。\n\n4.那么多当时你觉得快要要了你的命的事情\n\n那么多你觉得快要撑不过去的境地，都会慢慢的好起来。就算再慢，只要你愿意等，它也愿意成为过去。而那些你暂时不能战胜的，不能克服的，不能容忍的，不能宽容的，就告诉自己，凡是不能杀死你的，最终都会让你更强。\n\n幸福，就是当激情退去容颜衰老，牵你的还是那双不怨悔的手；就是当财富散尽一无所有，陪你的还是那颗不回头的心；就是当灾难降临众生远离，暖你的还是那份不冷却的情。\n\n幸福很简单，就是找一个温暖的人共同燃烧此生，奢侈、富贵、炫耀只是一层包装，只要你觉得是幸福的，其它一切都无所谓。\n\n5.生活不是用来妥协的\n\n你退缩得越多，能让你喘息的空间就越有限；日子不是用来将就的，你表现得越卑微，一些幸福的东西就会离你越远。在有些事中，无须把自己摆得太低，属于自己的，都要积极地争取；在有些人前，不必一而再的容忍，不能让别人践踏你的底线。只有挺直了腰板，世界给你的回馈才会多点。\n\n一个人的内心，要像一捧清澈的水。风来，只是一道道涟漪，终究会归于平静；雨落，只是一些些涌动，终究会落幕成寂；云过，只是一道道风景，终究会成为记忆。守候一片自己的领域，无关尘世，无关风月，只是一种善良，一种责任，一种深深的爱恋。\n\n一个老板再难也不会轻言放弃，而一个员工做得不顺就想逃走，一对夫妻再吵再大矛盾，也不会轻易离婚，而一对情侣常为一些很小的事就分开了。说到底，你在一件事，一段关系上的投入多少，决定你能承受多大的压力，能坚守多长时间，伟大都是熬出来的。为什么用熬，因为普通人承受不了的委屈你得承受。\n\n情绪，就是心魔。当你决定不再在乎的时候，生活就好起来了。"
            }
        ],
        "sittingAudioList":[
            // {
            //     "id":"5",
            //     "text":"语音引导",
            //     "fileName":"正念呼吸练习.mp3",
            //     "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/正念呼吸练习.mp3",
            //     "type":0,
            //     "useType":1,
            //     "isUsed":1
            // },
            {
                "id":"6",
                "text":"背景音乐",
                "fileName":"C:\\fakepath\\n5.mp3",
                "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/n5.mp3",
                "type":0,
                "useType":2,
                "isUsed":0
            },
            {
                "id":"7",
                "text":"计时铃声",
                "fileName":"闹钟音效.mp3",
                "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/闹钟音效.mp3",
                "type":0,
                "useType":3,
                "isUsed":1
            },
            {
                "id":"8",
                "text":"背景文字",
                "type":1,
                "useType":4,
                "isUsed":1,
                "content":"1.如果你的心是乱的，你看这个世上，也就是乱的\n\n你想的越多，遇到的麻烦就会越多;什么都不想，反倒一点麻烦没有。你怕的越多，欺负你的人就越多;什么都不怕了，反倒没人敢欺负你。你人品好，别人就来占你的便宜。你横一点，反倒都来讨好你。\n\n所以，别一味退让，当受到委屈时，你要勇敢地说No。能让你笑着面对的，就是最好的生活。\n\n2.不要对爱你的人太过于刻薄\n\n一辈子真正对你好的人也没有几个。多少人在一切都将失去时，才幡然醒悟：爱的宽厚，不能过度消耗。每个人都有脾气，为你忍下所有的怒气，仅仅因为那个人比你更心疼你。\n\n生活总不完美，总有辛酸的泪，总有失足的悔，总有幽深的怨，总有抱憾的恨。生活亦很完美，总让我们泪中带笑，悔中顿悟，怨中藏喜，恨中生爱。从明天起，做一个这样的人：率性而行，继之而悟，随遇而安。\n\n以最自然的姿态和意愿去生活，你会发现内心深处的快乐，将不可一世地蓬勃生长。\n\n3.总有某段路，只能你一个人走\n\n总有许多事，需要你一个人扛。别畏惧孤独，它能帮你划清内心的清浊，是你无法拒绝的命运历程;别躲避困苦，莫让冷世的尘埃，冰封你的笑容，迟滞你的步履。走得越久，时光越老，人心越淡。忘不掉昨天，它就是束缚你的阴影;向往着明天，你才能描绘它的模样。\n\n每只毛毛虫都可以变成自己的蝴蝶。只不过，在变成蝴蝶之前，自己会先变成作茧自缚的蛹。在茧里边面对自己制造的痛苦，任何挣扎或试图改变的行为都是徒劳的。蛹只有一个选择，那就是放弃所有抗拒、全然接纳当下感觉、平静等待。直到有一天破茧而出成为蝴蝶。\n\n4.那么多当时你觉得快要要了你的命的事情\n\n那么多你觉得快要撑不过去的境地，都会慢慢的好起来。就算再慢，只要你愿意等，它也愿意成为过去。而那些你暂时不能战胜的，不能克服的，不能容忍的，不能宽容的，就告诉自己，凡是不能杀死你的，最终都会让你更强。\n\n幸福，就是当激情退去容颜衰老，牵你的还是那双不怨悔的手；就是当财富散尽一无所有，陪你的还是那颗不回头的心；就是当灾难降临众生远离，暖你的还是那份不冷却的情。\n\n幸福很简单，就是找一个温暖的人共同燃烧此生，奢侈、富贵、炫耀只是一层包装，只要你觉得是幸福的，其它一切都无所谓。\n\n5.生活不是用来妥协的\n\n你退缩得越多，能让你喘息的空间就越有限；日子不是用来将就的，你表现得越卑微，一些幸福的东西就会离你越远。在有些事中，无须把自己摆得太低，属于自己的，都要积极地争取；在有些人前，不必一而再的容忍，不能让别人践踏你的底线。只有挺直了腰板，世界给你的回馈才会多点。\n\n一个人的内心，要像一捧清澈的水。风来，只是一道道涟漪，终究会归于平静；雨落，只是一些些涌动，终究会落幕成寂；云过，只是一道道风景，终究会成为记忆。守候一片自己的领域，无关尘世，无关风月，只是一种善良，一种责任，一种深深的爱恋。\n\n一个老板再难也不会轻言放弃，而一个员工做得不顺就想逃走，一对夫妻再吵再大矛盾，也不会轻易离婚，而一对情侣常为一些很小的事就分开了。说到底，你在一件事，一段关系上的投入多少，决定你能承受多大的压力，能坚守多长时间，伟大都是熬出来的。为什么用熬，因为普通人承受不了的委屈你得承受。\n\n情绪，就是心魔。当你决定不再在乎的时候，生活就好起来了。"
            }
        ],
        "sleepAudioList":[
            // {
            //     "id":"5",
            //     "text":"语音引导",
            //     "fileName":"正念呼吸练习.mp3",
            //     "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/正念呼吸练习.mp3",
            //     "type":0,
            //     "useType":1,
            //     "isUsed":1
            // },
            {
                "id":"6",
                "text":"背景音乐",
                "fileName":"C:\\fakepath\\n5.mp3",
                "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/n5.mp3",
                "type":0,
                "useType":2,
                "isUsed":0
            },
            {
                "id":"7",
                "text":"计时铃声",
                "fileName":"闹钟音效.mp3",
                "src":"http://xyhd.oss-cn-shenzhen.aliyuncs.com/mp3/闹钟音效.mp3",
                "type":0,
                "useType":3,
                "isUsed":1
            },
            {
                "id":"8",
                "text":"背景文字",
                "type":1,
                "useType":4,
                "isUsed":1,
                "content":"1.如果你的心是乱的，你看这个世上，也就是乱的\n\n你想的越多，遇到的麻烦就会越多;什么都不想，反倒一点麻烦没有。你怕的越多，欺负你的人就越多;什么都不怕了，反倒没人敢欺负你。你人品好，别人就来占你的便宜。你横一点，反倒都来讨好你。\n\n所以，别一味退让，当受到委屈时，你要勇敢地说No。能让你笑着面对的，就是最好的生活。\n\n2.不要对爱你的人太过于刻薄\n\n一辈子真正对你好的人也没有几个。多少人在一切都将失去时，才幡然醒悟：爱的宽厚，不能过度消耗。每个人都有脾气，为你忍下所有的怒气，仅仅因为那个人比你更心疼你。\n\n生活总不完美，总有辛酸的泪，总有失足的悔，总有幽深的怨，总有抱憾的恨。生活亦很完美，总让我们泪中带笑，悔中顿悟，怨中藏喜，恨中生爱。从明天起，做一个这样的人：率性而行，继之而悟，随遇而安。\n\n以最自然的姿态和意愿去生活，你会发现内心深处的快乐，将不可一世地蓬勃生长。\n\n3.总有某段路，只能你一个人走\n\n总有许多事，需要你一个人扛。别畏惧孤独，它能帮你划清内心的清浊，是你无法拒绝的命运历程;别躲避困苦，莫让冷世的尘埃，冰封你的笑容，迟滞你的步履。走得越久，时光越老，人心越淡。忘不掉昨天，它就是束缚你的阴影;向往着明天，你才能描绘它的模样。\n\n每只毛毛虫都可以变成自己的蝴蝶。只不过，在变成蝴蝶之前，自己会先变成作茧自缚的蛹。在茧里边面对自己制造的痛苦，任何挣扎或试图改变的行为都是徒劳的。蛹只有一个选择，那就是放弃所有抗拒、全然接纳当下感觉、平静等待。直到有一天破茧而出成为蝴蝶。\n\n4.那么多当时你觉得快要要了你的命的事情\n\n那么多你觉得快要撑不过去的境地，都会慢慢的好起来。就算再慢，只要你愿意等，它也愿意成为过去。而那些你暂时不能战胜的，不能克服的，不能容忍的，不能宽容的，就告诉自己，凡是不能杀死你的，最终都会让你更强。\n\n幸福，就是当激情退去容颜衰老，牵你的还是那双不怨悔的手；就是当财富散尽一无所有，陪你的还是那颗不回头的心；就是当灾难降临众生远离，暖你的还是那份不冷却的情。\n\n幸福很简单，就是找一个温暖的人共同燃烧此生，奢侈、富贵、炫耀只是一层包装，只要你觉得是幸福的，其它一切都无所谓。\n\n5.生活不是用来妥协的\n\n你退缩得越多，能让你喘息的空间就越有限；日子不是用来将就的，你表现得越卑微，一些幸福的东西就会离你越远。在有些事中，无须把自己摆得太低，属于自己的，都要积极地争取；在有些人前，不必一而再的容忍，不能让别人践踏你的底线。只有挺直了腰板，世界给你的回馈才会多点。\n\n一个人的内心，要像一捧清澈的水。风来，只是一道道涟漪，终究会归于平静；雨落，只是一些些涌动，终究会落幕成寂；云过，只是一道道风景，终究会成为记忆。守候一片自己的领域，无关尘世，无关风月，只是一种善良，一种责任，一种深深的爱恋。\n\n一个老板再难也不会轻言放弃，而一个员工做得不顺就想逃走，一对夫妻再吵再大矛盾，也不会轻易离婚，而一对情侣常为一些很小的事就分开了。说到底，你在一件事，一段关系上的投入多少，决定你能承受多大的压力，能坚守多长时间，伟大都是熬出来的。为什么用熬，因为普通人承受不了的委屈你得承受。\n\n情绪，就是心魔。当你决定不再在乎的时候，生活就好起来了。"
            }
        ]
    }
});

Mock.mock(AppConfig.ApiConfig.login ,{
    "status":"0",
    "data":{
        "id":"0b35d100-f99a-473b-a29d-3eff7387cc88",//用户id
        "type":1,//职级类型 1 超级管理员 2 管理员 3普通员工
        "username":"zzx", //用户名
        "rw":1, //编辑权限  1 可编辑 2 仅查看
        "canScan":0,//扫码登录
        "permission":[1,2,3,4,5,6,7,8]
    } //模块权限
})

Mock.mock(AppConfig.ApiConfig.getIntegralRank,{
    "status" : "0",
    "data" : []
});
