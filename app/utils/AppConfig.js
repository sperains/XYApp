/**
 * Created by itachi on 16/11/3.
 */

const domain = "http://" + __SERVER_URL__;
const serverUrl = "services/";


function _getFullUrlFromRelative(relativeUrl){
    return domain + serverUrl + relativeUrl;
}

function _exportToExcel(){
    return domain + "services/ExcelServlet"
}

var Config =  {
    /*
    * 接口配置
    * */
    ApiConfig:{
        getBarginInfo:_getFullUrlFromRelative("CheckInServer/getGoodsInfo"),            
        getActiveList : _getFullUrlFromRelative("CheckInServer/getAllActivityList"),                        //获取活动列表
        getActiveDetail : _getFullUrlFromRelative("CheckInServer/getActiveDetail"),                 //获取活动详情
        getEnrollList : _getFullUrlFromRelative("CheckInServer/getEnrollList"),                           //获取活动报名详情
        getMemberList : _getFullUrlFromRelative("UserServer/getMemberList"),                 //获取会员列表
        getMemberListById : _getFullUrlFromRelative("UserServer/getMemberDetail"),      //获取会员详情
        updateMemberLevel : _getFullUrlFromRelative("UserServer/modMemberLevel"),   //修改会员等级
        addActive : _getFullUrlFromRelative("CheckInServer/addActivity"),                           //添加活动
        editActive : _getFullUrlFromRelative("CheckInServer/modActivity"),                          //编辑活动
        deleteActive : _getFullUrlFromRelative("CheckInServer/delActivity"),                        //删除活动
        releaseActive : _getFullUrlFromRelative("CheckInServer/releaseActivity"),                  
        getNumDetail : _getFullUrlFromRelative("CheckInServer/getNumerologyList"),
        updateNumInfo : _getFullUrlFromRelative("CheckInServer/putNumerology"),
        getScoreRank : _getFullUrlFromRelative("CheckInServer/getScoreRank"),
        updateLifeInfo : _getFullUrlFromRelative("CheckInServer/putJoyLife"),
        getLifeInfo : _getFullUrlFromRelative("CheckInServer/getJoyLife"),
        getIntegralRule : _getFullUrlFromRelative("CheckInServer/getIntegralRule"),
        setIntegralRule : _getFullUrlFromRelative("CheckInServer/setIntegralRule"),
        getIntegralRank : _getFullUrlFromRelative("CheckInServer/getIntegralRanking"),
        getScoreDetail : _getFullUrlFromRelative("IntegralServer/getIntegralById"),
        getIdentityInfo : _getFullUrlFromRelative("MaintenanceServer/getPersonnel"),
        delIdentityInfo : _getFullUrlFromRelative("MaintenanceServer/delPersonnel"),
        saveIdentityInfo : _getFullUrlFromRelative("MaintenanceServer/putPersonnel"),
        getIdentityTypes : _getFullUrlFromRelative("CheckInServer/getIdentityTypes"),
        login : _getFullUrlFromRelative("MaintenanceServer/sysLogin"),
        updatePassword : _getFullUrlFromRelative("MaintenanceServer/modPassword")
    },
};

module.exports = Config;