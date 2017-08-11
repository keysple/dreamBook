/**
 * Created by 13006 on 2017/7/25.
 */
import  axios from 'axios'
axios.defaults.withCredentials = true;
const GlobalHost = 'http://10.50.0.217/dingding';
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
        jsApiList: ['biz.user.get', 'biz.navigation.setTitle', 'biz.ding.create', 'biz.ding.post', 'biz.contact.choose', 'runtime.permission.requestAuthCode', 'biz.contact.complexPicker']
      };
      dd.config(config);
    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  })
}
export function authCode() {
  return new Promise(function (resolve) {
    dd.ready(function () {
      dd.runtime.permission.requestAuthCode({
        corpId: "ding5ab588d9b1c9951935c2f4657eb6378f",
        onSuccess: function (result) {
          resolve(result)
        },
        onFail: function (err) {
          alert('getCode error' + JSON.stringify(err))
        }
      })
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
  POSTDing,
}
export function getDepartments(corpid) {
  return new Promise(function (resolve) {
    dd.ready(function () {
      dd.biz.contact.choose({
        startWithDepartmentId: 0, //-1表示打开的通讯录从自己所在部门开始展示, 0表示从企业最上层开始，(其他数字表示从该部门开始:暂时不支持)
        multiple: true, //是否多选： true多选 false单选； 默认true
        users: [], //默认选中的用户列表，userid；成功回调中应包含该信息
        disabledUsers: [],// 不能选中的用户列表，员工userid
        corpId: corpid,
        max: 1499, //人数限制，当multiple为true才生效，可选范围1-1500
        limitTips: "选择人数超过最大限制！", //超过人数限制的提示语可以用这个字段自定义
        isNeedSearch: true, // 是否需要搜索功能
        title: "Boss推荐", // 如果你需要修改选人页面的title，可以在这里赋值
        local: true, // 是否显示本地联系人，默认false
        onSuccess: function (data) {
          resolve(data)
        },
        onFail: function (err) {
          console.log(err)
          alert('fail', JSON.stringify(err))
        }
      })
    })
  })
}
export function POSTDing(corpId, Mes, usersId) {
  return new Promise(function (resolve) {
    dd.biz.ding.post({
      users: usersId,//用户列表，工号
      corpId: corpId,
      type: 1, //附件类型 1：image  2：link
      alertType: 2,
      alertDate: {"format": "yyyy-MM-d HH:mm", "value": "2015-05-09 08:00"},
      attachment: {
        images: [''],
      }, //附件信息
      text: Mes, //消息
      onSuccess: function (res) {
        resolve(res)
      },
      onFail: function (errorMessage) {
      }
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
