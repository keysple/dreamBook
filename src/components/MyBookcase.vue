<template>
  <div>
    <mu-appbar style="height: 48px">
      <mu-row gutter>
        <mu-col width="100" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">library_books</i>
          <h5 style="display: inline">我的书架</h5></mu-col>
      </mu-row>
    </mu-appbar>
    <!--UserMes-->
    <user-mes :userMesAPI="usermesapi"></user-mes>
    <mu-flexbox class="mt8" orient="vertical">
      <mu-flexbox-item>
        <book-grid :Book="MyBook" :titleChip="IsShow" :deleteChip="IsHide" @delete="postDeleteBook"></book-grid>
      </mu-flexbox-item>
      <mu-flexbox-item>
        <mu-raised-button label="删除" @click="opendelete" v-show="IsShow" class="mu-raised-button" fullWidth="" primary/>
        <mu-raised-button label="保存" @click="closedelete" v-show="IsHide" class="mu-raised-button" fullWidth=""
                          primary/>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>
<script>
  import BookGrid from "./bookGridList";
  import UserMes from "./UserMes";
  import {Host, Static} from '../util/host';
  export default{
    components: {
      UserMes,
      BookGrid
    },
    name: 'MyBookcase',
    data(){
      return {
        HomePageApi: '/book/bookMes',
        IsShow: true,
        IsHide: false,
        MyBook: [],
        usermesapi: this.$store.state.userinfo[0],
      }
    },
    mounted: function () {
      this.showMyBookCase();
    },
    /*    updated:function () {
     this.showMyBookCase();
     },*/
    methods: {
      opendelete () {
        this.IsShow = false;
        this.IsHide = true;
      },
      closedelete () {
        this.IsShow = true;
        this.IsHide = false;
      },
      showMyBookCase(){
        /*显示书架的书*/
        this.$ajax.get(Host + '/app/bookshelf', {
          params: {
              userid:this.$store.state.userinfo[0].userid,
        /*    userid: '091208124330965749'*/
          }
        }).then(response => {
            console.log(response.data);
            this.$set(this, 'MyBook', response.data)
          }, response => {
            console.log(response)
          }
        )
      },
      postDeleteBook(book){
        const self = this;
        var Config = {
          method: "delete",
          url: Host + '/app/bookshelf',
          params: {
            type: book.type,
            bookshelfid: book.bookshelfid,
          },
        };
        this.$ajax(Config).then(function (response) {
              self.showMyBookCase();
        }).catch(function () {
        })
      },
    }
  }
</script>
<style lang="css">
  .mt8 {
    margin-top: 18px;
  }

  .mu-raised-button {
    margin-bottom: 20px;
  }

</style>
