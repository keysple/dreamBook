<template>   <!--引入路由页面，固定的底部导航栏-->
  <div id="app">
    <div id="appContainer">
      <router-view></router-view>
    </div>
    <div id="bottomNav">
      <mu-paper>
        <mu-bottom-nav :value="bottomNav" shift="" @change="handleNavChange">
          <mu-bottom-nav-item value="appHome" title="书城" icon="home" to="/appHome">
          </mu-bottom-nav-item>
          <mu-bottom-nav-item value="myBookcase" title="书架" icon="grade" to="/myBookcase">
          </mu-bottom-nav-item>
          <mu-bottom-nav-item value="workmate" title="同事" icon="person_pin" to="/workmate">
          </mu-bottom-nav-item>
          <mu-bottom-nav-item value="myData" title="我的" icon="insert_chart" to="/myData">
          </mu-bottom-nav-item>
        </mu-bottom-nav>
      </mu-paper>
    </div>
  </div>
</template>
<script>
  import  dingWEB from  './util/dd'
  export default {
    name: 'app',
    data () {
      return {
        bottomNav: 'appHome',
        userInfo: '',
        corpId: ''
      }
    },
    mounted(){
      //判断cookie的值
      var corpid, uid;
      uid = document.cookie.split('userid=')[1];
      //判断cookie是否存在userid
      if (uid) {
        alert('use uid');
        this.getUserInfo(uid);
      } else {
        alert('no uid');
        this.AuthConfig();
      }
    },
    methods: {
      //切换底部tab导航
      handleNavChange(val){
        this.bottomNav = val;
      },
      AuthConfig(){
        const self = this;
        dingWEB.authCode().then(function (result) {
          console.log(result)
          const code = result.code;
          dingWEB.getUserId(code).then(function (response) {
            var result = response.data;
            self.$store.dispatch("addInfo", result)
          });
        })
      },
      getUserInfo(uid){
        const self = this;
        dingWEB.getUserinfoById(uid).then(function (response) {
          var result = response.data;
          self.$store.dispatch("addInfo", result)
        });
      },
    },
  }
</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 3px;
  }

  #appContainer {
    padding-bottom: 58px;
  }

  #bottomNav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 56px;
  }

</style>

