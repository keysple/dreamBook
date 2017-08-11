<template>
  <div>
    <mu-flexbox>
      <mu-flexbox-item :name="BookMes.bookid">
        <mu-paper class="demo-paper" :zDepth="2">
          <img :src="bookCover+BookMes.cover"/>
        </mu-paper>
        <mu-card-text class="demo-span"><span>{{BookMes.name}}</span><br/><span>{{BookMes.auth}}</span></mu-card-text>
        <mu-flat-button label="Boss推荐" class="demo-flat-button mb10" v-if="this.userinfo.isAdmin === true" primary @click="popDing">
          <!--v-if="this.userinfo.isAdmin === true"-->
          <i class="material-icons">thumb_up</i>
        </mu-flat-button>
        <ding-pop-up ref="popDing" :book="BookMes"></ding-pop-up>
      </mu-flexbox-item>
    </mu-flexbox>
    <mu-flexbox orient="vertical">
      <mu-flexbox-item order="0" class="mt8">
        <mu-card-title title="书籍导读"/>
        <mu-divider/>
        <mu-card-text>
          {{ BookMes.introduction }}
        </mu-card-text>
      </mu-flexbox-item>
      <mu-flexbox-item order="1" class="mt8">
        <mu-appbar title="目录">
          <mu-icon-button icon="menu" slot="right" @click="toMenuById(BookMes.bookid)"/>
        </mu-appbar>
      </mu-flexbox-item>
      <mu-flexbox-item order="4" class="mt8">
        <mu-card-actions>
          <mu-raised-button label="加入书架" @click="addBookCase" class="demo-raised-button" primary/>
          <mu-raised-button label="马上阅读" @click="toArticle(bookid, catalogid)" class="demo-raised-button" primary/>
        <!--  <vueshowpdf @closepdf="closepdf" v-model="isshowpdf" :pdfurl="pdfurls" @pdferr="pdferr" :maxscale='4'
                      :minscale='0.6' :scale='1.1'></vueshowpdf>-->
        </mu-card-actions>
      </mu-flexbox-item>
      <mu-flexbox-item order="3" class="mt8">
        <mu-card-title style="display: inline;float: left;" title="评论"/>
        <mu-icon-button class="demo-flat-button" @click="openPop">
          <i class="material-icons">insert_comment</i>
        </mu-icon-button>
        <mu-divider/>
        <mu-card-text>
          <book-comments  :bookid="bookId" ></book-comments>
          <popcontent ref="popOfReply" :Mes="BookMes.bookid"></popcontent>
        </mu-card-text>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>
<script>
  import BookComments from "./bookComments";
  import Popcontent from "./popContent";
  import DingPopUp from "./dingPoP";
/*  import vueshowpdf from 'vueshowpdf'*/
  import {Host, Static} from '../util/host'
  export default {
    components: {
      DingPopUp,
      Popcontent,
      BookComments,
    /*  vueshowpdf*/
    },
    name: 'BookMes',
    data(){
      return {
        BookMes: [],
        Dialog: false,
        returnMes: '',
        bookId: this.$route.params.id,
        bossRec: false,
        userinfo: this.$store.state.userinfo[0],
        bookCover: Host + Static,
   /*     pdfurls: '//cdn.mozilla.net/pdfjs/tracemonkey.pdf',
        isshowpdf: false*/
      }
    },
    created: function () {
      this.getBookMesById();
    },
    methods: {
  /*    closepdf(){
        this.isshowpdf = false
      },*/
      pdferr(errurl) {
        console.log(errurl);
      },
      getBookMesById: function () {
        this.$ajax.get(Host + '/app/book', {
          params: {
            bookId: this.bookId
          }
        }).then(response => {
            var result = JSON.stringify(response.data.bookInfo);
            console.log(result)
            this.$set(this, 'BookMes', response.data.bookInfo[0])
          }, response => {
            console.log(response)
          }
        )
      },
      toMenuById(bookid){
        this.$router.push({name: 'ChapterList', params: {bookid: bookid}})
      },
      openPop(){
        this.$refs.popOfReply.open()
      },
      popDing(){
        this.$refs.popDing.open()
      },
      addBookCase(){
        var Config = {
          method: "put",
          url: Host + '/app/bookshelf',
          params: {
            bookid: this.bookId,
            userid: '091208124330965749'
          },
        };
        this.$ajax(Config).then(function (response) {
          console.log(response.data);
          alert('加入书架成功')
        }).catch(function (error) {
            alert('加入书架失败，请查看书架是否已存在此书')
        });
        this.Dialog = true;
      },
      toArticle(bookid, catalogid){
        this.$router.push({name: 'BookViewer', params: {bookid: bookid, catalogid: catalogid}})
      },
/*      toPdf(){
        this.isshowpdf = true;
      },*/
    }
  }
</script>
<style>
  .mt8 {
    margin-top: 8px;
  }

  .demo-paper {
    position: relative;
    display: inline-block;
    height: 100%;
    overflow: hidden;
    margin-top: 5px;
    margin-left: 20px;
  }

  .demo-paper img {
    height: 120px;
    transform: translateX(-50%);
    position: relative;
    left: 50%;
  }

  .demo-span {
    display: inline-block;
    height: 100%;
    width: 35%;
    text-align: left;
    margin-bottom: -16px;
  }

  .demo-raised-button {
    width: 49%;
    display: inline;
  }

  .demo-flat-button {
    font-size: 20px;
    float: right;
    height: 100%;
    top: 15px;
  }
</style>
