/**
 * Created by 13006 on 2017/7/25.
 */
import  axios from 'axios'
axios.defaults.withCredentials = true;
const GlobalHost = 'http://fj2ku9.natappfree.cc/dingding';
var corpid;
export function getAuth() {
  var configParams;
  var params = encodeURIComponent(location.href);
  var Config = {
    url: GlobalHost + '/getConfig',
    params: {
      href: params
    }
  };
  return new Promise(function (resolve, reject) {
    axios(Config).then(function (response) {
      resolve(response);
      console.log(response.data);
      configParams = response.data;
      corpid = configParams.corpId;
      /*    document.cookie="corpId="+configParams.corpId;*/
      const config = {
        agentId: configParams.agentId,
        corpId: configParams.corpId,
        timeStamp: configParams.timeStamp,
        nonceStr: configParams.nonceStr,
        signature: configParams.signature,
        jsApiList: ['biz.user.get', 'dd.biz.ding.create', 'biz.contact.departmentsPicker',
          'biz.contact.complexPicker', 'biz.customContact.multipleChoose', 'runtime.permission.requestAuthCode']
      };
      dd.config(config);
    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  })
}
export function authCode(corpId) {
  return new Promise(function (resolve) {
    dd.ready(function () {
      dd.runtime.permission.requestAuthCode({
        corpId: "ding5ab588d9b1c9951935c2f4657eb6378f",
        /*    corpId:corpid,*/
        onSuccess: function (result) {
          resolve(result)
        },
        onFail: function (err) {
          alert('getCode error' + JSON.stringify(err))
        }
      });
    })
  });
}
dd.error(function (err) {
  alert('dd error: ' + JSON.stringify(err));
});
function getUserId(code) {
  var Config = {
    url: GlobalHost + '/getUserinfo',
    params: {
      code: code
    }
  };
  return new Promise(function (resolve) {
    axios(Config).then(function (response) {
      document.cookie = "userid=" + response.data.userid;
      resolve(response)
    }).catch(function (error) {
      alert('getUserId error' + JSON.stringify(error))
    })
  })
}
export function getUserinfoById(uid) {
  var Config = {
    url: GlobalHost + '/getUserinfoByUserid',
    params: {
      userid: uid
    }
  };
  return new Promise(function (resolve, reject) {
    axios(Config).then(function (response) {
      resolve(response);
    }).catch(function (error) {
      alert('getUserIdByid error' + JSON.stringify(error))
    });
  })
}
export  default {
  getAuth,
  getUserinfoById,
  authCode,
  getUserId,
  getDepartments,
  POSTDing
}
export function getDepartments(corpid) {
  return new Promise(function (resolve) {
    dd.ready(function () {
      dd.biz.contact.complexPicker({
        title: "测试标题",            //标题
        corpId:corpid,
        multiple: true,            //是否多选
        limitTips: "超出了",          //超过限定人数返回提示
        maxUsers: 1000,            //最大可选人数
        pickedUsers: [],            //已选用户
        pickedDepartments: [],          //已选部门
        disabledUsers: [],            //不可选用户
        disabledDepartments: [],        //不可选部门
        requiredUsers: [],            //必选用户（不可取消选中状态）
        requiredDepartments: [],        //必选部门（不可取消选中状态）
        appId: 114067127,              //微应用的Id
        permissionType: 'GLOBAL',          //选人权限，目前只有GLOBAL这个参数
        responseUserOnly: false,        //单纯返回人，或者返回人和部门
        onSuccess: function (result) {
          resolve(result)
        },
        onFail: function (err) {
          alert('get department', JSON.stringify(err))
        }
      });
    })
  })
}
export function POSTDing(users,corpId) {
  return new Promise(function () {
    var date = (new Date()).Format("yyyy-MM-dd hh:mm");
    dd.ready(function () {
      dd.biz.ding.create({
        users: [users],// 用户列表，工号
        corpId: corpId,
        type: 1,
        alertType: 2,
        alertDate: {"format":"yyyy-MM-dd HH:mm","value":date},
        text: 'hello!!!!!Ding Test',
        bizType :0,
        onSuccess: function () {
          alert('ding success')
        },
        onFail: function (errorMessage) {
          alert('fail', JSON.stringify(errorMessage))
        }
      })
    })
  })
}
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
