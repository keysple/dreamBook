/**
 * Created by 13006 on 2017/7/25.
 */
import  axios from 'axios'
axios.defaults.withCredentials = true;
const GlobalHost = 'http://10.50.1.27/dingding';
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
  return new Promise(function (resolve) {
    var date = (new Date()).Format("yyyy-MM-dd hh:mm");
    dd.ready(function () {
      dd.biz.ding.create({
        users: users,// 用户列表，工号
        corpId: corpId,
        type: 1,
        alertType: 2,
        alertDate: date,
        text: 'hello!!!!!Ding Test',
        attachment: {
          images: [''],
        },
        text: 'ddddddddddddddddddddddddddd',  // 正文
        bizType :0, // 业务类型 0：通知DING；1：任务；2：会议；
        confInfo:{
          bizSubType:0, // 子业务类型如会议：0：预约会议；1：预约电话会议；2：预约视频会议；（注：目前只有会议才有子业务类型）
          location:'某某会议室' , //会议地点；（非必填）
          startTime:{"format":"yyyy-MM-dd HH:mm","value":"2015-05-09 08:00"},// 会议开始时间
          endTime:{"format":"yyyy-MM-dd HH:mm","value":"2015-05-09 08:00"}, // 会议结束时间
          remindMinutes:30, // 会前提醒。单位分钟-1：不提醒；0：事件发生时提醒；5：提前5分钟；15：提前15分钟；30：提前30分钟；60：提前1个小时；1440：提前一天；
          remindType:2 // 会议提前提醒方式。0:电话, 1:短信, 2:应用内
        },
        taskInfo:{
          ccUsers: ['100', '101'], // 抄送用户列表，工号
          deadlineTime:{"format":"yyyy-MM-dd HH:mm","value":"2015-05-09 08:00"} , // 任务截止时间
          taskRemind:30// 任务提醒时间，单位分钟0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；
        },
        onSuccess: function () {
          alert('ding success')
        },
        onFail: function (err) {
          alert('fail', JSON.stringify(err))
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
