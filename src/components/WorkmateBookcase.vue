<template>
  <div>
    <mu-appbar style="height: 48px">
      <mu-row gutter class="pb8">
        <mu-col width="100" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <!--<img src="../assets/icon/ic_people_white_24px.svg">-->
          <i class="material-icons">people</i>
          <h5 style="display: inline">同事书架</h5></mu-col>
      </mu-row>
    </mu-appbar>
    <div v-for="(workmate,index) in workMate" :key="index">
      <mu-card>
        <!--  <user-mes :userMesAPI="usermesapi"></user-mes>-->
        <mu-flexbox class="mt8">
          <mu-flexbox-item>
            <mu-card-header :title="workmate.name" ><!--少添加了subtitle-->
              <mu-avatar slot="avatar" :src="workmate.avatar"></mu-avatar>
            </mu-card-header>
          </mu-flexbox-item>
        </mu-flexbox>
        <book-grid :Book="workmate.bookshelf" :titleChip=true :deleteChip=false></book-grid>
      </mu-card>
    </div>
  </div>
</template>
<script>
  import UserMes from "./UserMes";
  import BookGrid from "./bookGridList";
  import {Host,Static} from '../util/host'
  export default{
    components: {
      BookGrid,
      UserMes
    },
    name: 'WorkmateBookcase',
    data(){
      return {
        workmateBook: [],
        workMate: [], /*同部门同事的userid列表*/
        /*usermesapi: 'app/getUser?userId=1',*/
        userid:this.$store.state.userinfo[0].userid,
        departmentid:'26891226',
      }
    },
    mounted: function () {
      this.getWorkmateBook();
    },
    methods: {
      getWorkmateBook(){
        this.$ajax.get(Host+'/app/bookshelf/colleaguesBookshelf', {
          params: {
            userid: this.userid,
            departmentId: this.departmentid,
          }
        }).then(
          response => {
            this.$set(this, 'workMate', response.data);
            console.log(response.data)
          },
          response => {

          }
        )
      }
    }
  }
</script>
<style>
</style>
