<template>
  <div>
    <mu-card v-for="recommend, index in recommendList" :key="index">
      <user-mes :userMesAPI=usermesapi></user-mes>
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
        usermesapi: 'app/getUser?userId=1',
        userid: this.$store.state.userinfo[0].userid,
        userType: '',
        bookCover: Host + Static
      }
    },
    mounted: function () {
      this.getRecommendList();
      this.isBoss();
    },
    methods: {
      isBoss(){
        if (this.$store.state.userinfo[0].isAdmin) {
          this.userType = boss;
        }
        else {
          this.userType = employee;
        }
      },
      getRecommendList(){
        this.$ajax.get(Host + '/app/recommend', {
          params: {
            userid: this.userid,
            userType: this.userType,
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
    margin-left: 10%
  }

  . demo-flat-button {
    float: right;
  }
</style>
