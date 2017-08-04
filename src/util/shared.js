export function authCode(corpId){
  return new Promise(function(resolve, reject){
    dd.ready(function(){
      alert('dd.ready')
      dd.runtime.permission.requestAuthCode({
        corpId: corpId,
        onSuccess: function(result) {
          resolve(result);
        },
        onFail : function(err) {
          reject(err);
        }
      });
    });
    dd.error(function(error){
      alert('dd error: ' + JSON.stringify(err));
    });
  });
}
