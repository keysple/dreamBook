<template>
  <mu-flexbox orient="vertical">
    <mu-flexbox-item v-for="article ,index in ArticleList" :key="index">
      <mu-card>
        <div class="bookCover">
          <img :src="article.cover"/>
        </div>
        <div class="bookDetail">
          <mu-card-header style="width: auto" :title="article.name" :subTitle="article.author"></mu-card-header>
          <mu-flat-button label="详情" @click="changeRoute(article.bookid)" primary></mu-flat-button>
        </div>
      </mu-card>
    </mu-flexbox-item>
  </mu-flexbox>
</template>
<script>
  import {Host,Static} from '../util/host'
  export default{
    name: 'ArticleList',
    data(){
      return {
        ArticleList: []
      }
    },
    mounted: function () {
      this.getArticle()
    },
    methods: {
      getArticle(){
        this.$ajax.get(Host+'/app/homePage', {
          params: {
            block: 'newBooks',
            /*type:'IT'*/
          }
        }).then(response => {
            console.log(response.data)
            this.$set(this, 'ArticleList', response.data)
          }, response => {
            console.log(response)
          }
        )
      },
      changeRoute(bookid){
        this.$router.push({name: 'BookMes', params: {id: bookid}})
      },
    }
  }
</script>
<style scoped>
  .bookCover {
    position: relative;
    display: inline-block;
    width: 40%;
    height: 100%;
    overflow: hidden;
    padding-top: 5px;
  }

  .bookCover img {
    height: 120px;
    transform: translateX(-50%);
    position: relative;
    left: 50%;
  }

  .bookDetail {
    position: relative;
    display: inline-block;
    width: 60%;
    height: 100%;
    float: right;
  }
</style>
