<template>
  <div>
    <mu-card v-for="recommend, index in recommendList" :key="index">
      <mu-flexbox >
        <mu-flexbox-item>
          <mu-card-header class="mt8" :title="recommend.bossName"><!--少添加了subtitle-->
            <mu-avatar slot="avatar" :src="recommend.bossAvatar"></mu-avatar>
          </mu-card-header>
        </mu-flexbox-item>
      </mu-flexbox>
      <mu-card-text class="bookText">
        <span>{{recommend.msg}}</span>
        <div class="bookCard" @click="toBookMes(recommend.bookId)">
          <div class="bookimg"><img :src="bookCover+recommend.cover"/></div>
          <div class="bookmes"><p><strong>[{{recommend.auth}}]</strong> <span>{{recommend.name}}</span></p></div>
        </div>
        <!-- <mu-flat-button label="阅读人数" class="demo-flat-button" primary/>-->
      </mu-card-text>
    </mu-card>
  </div>
</template>
<script>
  import {Host, Static} from '../util/host'
  import UserMes from "./UserMes";
  export default{
    components: {
      UserMes
    },
    name: 'bossRecommend',
    data(){
      return {
        recommendList: [],
        userType: '',
        bookCover: Host + Static
      }
    },
    mounted: function () {
      this.getRecommendList();
    },
    methods: {
      getRecommendList(){
          var usertype='employee';
        /*     if(this.$store.state.userinfo[0].isAdmin){
         usertype='boss';
         }*/
        this.$ajax.get(Host + '/app/recommend', {
          params: {
          /*  userid: this.$store.state.userinfo[0].userid,*/
          userid:'091208124330965749',
            userType: usertype,
          }
        }).then(
          response => {
            this.$set(this, 'recommendList', response.data)
          },
          response => {
          }
        )
      },
      toBookMes(id){
        this.$router.push({name: 'BookMes', params: {id: id}})
      }
    }
  }
</script>
<style scoped>
  .bookCard {
    background-color: #f5f5f5;
    width: 100%;
    height: 70px;
  }

  .bookimg {
    position: relative;
    display: inline-block;
    width: 20%;
    height: 100%;
    overflow: hidden;
    padding-top: 5px;
  }

  .bookimg img {
    height: 60px;
    transform: translateX(-50%);
    position: relative;
    left: 40%;
  }

  .bookmes {
    float: right;
    width: 80%;
    text-align: left;
    padding-left: 10px;
    position: relative;
    display: inline-block;
    height: 100%;
  }

  .bookText {
    font-size: 18px;
    text-align: left;
  }

  . demo-flat-button {
    float: right;
  }

  .mt8 {
 padding: 18px 0 0 18px ;
  }
</style>
