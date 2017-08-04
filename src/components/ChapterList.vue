<template>
  <mu-paper>
    <mu-list v-for="catalog ,index in chapter" :key="index">
      <mu-list-item :title="catalog.title"    @click="toArticleViewer(bookId , catalog.title)"/>
      <mu-divider shallowInset/>
    </mu-list>
  </mu-paper>
</template>
<script>
  import {Host,Static} from '../util/host'
  export default{
    name: 'ChapterList',
    data(){
      return {
        chapter: [],
        bookId: this.$route.params.bookid,
        num: 10,
        loading: false,
        scroller: null
      }
    },
    mounted: function () {
      this.getChapter(),
        this.scroller = this.$el;
    },
    methods: {
      getChapter(){
        this.$ajax.get(Host+'/app/catalog',{
         params:{
         bookid:this.bookId
         }
         }).then(response => {
            console.log(response.data);
                    this.$set(this, 'chapter', response.data);
          }, response => {
            console.log(response)
          }
        )
      },
      toArticleViewer(bookid, catalogid){
        this.$router.push({name: 'BookViewer', params: {bookid: bookid, catalogid: catalogid}})
      },
    }
  }
</script>
