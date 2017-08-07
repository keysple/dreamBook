<template>
  <div class="popContent">
    <mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
      <mu-appbar title="评论">
        <mu-flat-button slot="right" label="关闭" color="white" @click="close"/>
      </mu-appbar>
      <mu-text-field id="textField" v-model="content" hintText="不允许超过100个字符" fullWidth=""
                     :errorText="multiLineInputErrorText"
                     @textOverflow="handleMultiLineOverflow" multiLine :rows="6" :rowsMax="10" :maxLength="100"/>
      <br/>
      <mu-raised-button label="提交" class="clickButton" @click="postComment" primary/>
    </mu-popup>
  </div>
</template>
<script>
  import {Host, Static} from '../util/host'
  export default{
    name: 'popcontent',
    props: {
      Mes: String,
      reply: String,
    },
    data(){
      return {
        bottomPopup: false,
        multiLineInputErrorText: '',
        content: ''
      }
    },
    methods: {
      open(){
        this.bottomPopup = true
      },
      close () {
        this.bottomPopup = false
      },
      handleMultiLineOverflow (isOverflow) {
        this.multiLineInputErrorText = isOverflow ? '超过啦！！！！' : ''
      },
      postComment(){
        var Config = {
          method: "put",
          url: Host + '/app/book/comment',
          params: {
            bookid: this.Mes,
            /* reviewer: this.$store.state.userinfo[0].name,*/
            reviewer: 'bbb',
            content: this.content,
            reply: this.reply,
          },
        };
        if (Config.params.content === '') {
          alert('留言为空！')
        }
        else {
          this.$ajax(Config).then(function (response) {
            this.bottomPopup = false
          }).catch(function (error) {
            console.log(JSON.stringify(error))
          });
        }
      },
    }
  }
</script>
<style>
  .demo-popup-bottom {
    width: 100%;
  }

  .clickButton {
    width: 100%;
  }
</style>
