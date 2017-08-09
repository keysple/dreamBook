<template>
  <div>
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close()">
      <mu-appbar title="Boss推荐">
        <mu-flat-button slot="right" label="关闭" color="white" @click="close()"/>
      </mu-appbar>
      <mu-content-block>
        <h3>你推荐的书是 <span>《{{book.name}}》</span></h3>
        <h3>选择推荐用户</h3>
        <div style="margin-left: 18px;display: inline">
          <mu-float-button icon="add" mini class="demo-float-button" @click="chooseDep"/>
        </div>
        <h3>说点什么</h3>
        <mu-text-field hintText="不允许超过100个字符" :errorText="multiLineInputErrorText" v-model="recMes"
                       @textOverflow="handleMultiLineOverflow" multiLine :rows="3" :rowsMax="6" :maxLength="100"
                       fullWidth="" icon="comment"/>
        <br/>
        <mu-raised-button label="Ding出去" id="ding" class="clickButton" @click="postDing" primary/>
      </mu-content-block>
    </mu-popup>
  </div>
</template>
<script>
  import dingweb from '../util/dd'
  export default {
    name: 'dingPopUp',
    props: {
      book: Object
    },
    data () {
      return {
        bottomPopup: false,
        value: '',
        recMes: '',
        Users:[]
      }
    },
    methods: {
      open () {
        this.bottomPopup = true;
      },
      close () {
        this.bottomPopup = false
      },
      handleMultiLineOverflow (isOverflow) {
        this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
      },
      chooseDep(){
        dingweb.getAuth().then(function (response) {
          var corpId = response.data.corpId;
          dingweb.getDepartments(corpId).then(function (result) {
              debugger
              const self=this;
            for (var i = 0; i < result.users.length; i++) {
              self.Users.push(result.users[i].emplId);
              /* alert(result.users[i].emplId)*/
            }
            alert(self.Users)
         /*   alert(self.users[0]);*/
            document.getElementById('ding').addEventListener("click", this.postDing(users, corpId), false);
          })
        })
      },
      postDing(users,corpId){
        dingweb.POSTDing(users,corpId);
/*        var Config = {
          method: "post",
          url: Host + '/app/recommend',
          data: {
            /!*userid: this.$store.state.userinfo[0].userid,*!/
            userid:'091208124330965749',
            bookid: this.book.bookid,
            msg: this.recMes,
            userids: users
          },
        };
        this.$ajax(Config).then(function (response) {

        }).catch(function (error) {

        })*/
      }
    },
  }
</script>
<style scoped>
  .demo-popup-bottom {
    width: 100%;
    max-width: 375px;
  }
</style>
