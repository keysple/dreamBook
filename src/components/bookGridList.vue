<template>
  <div class="gridlist-demo-container">
    <mu-flexbox>
      <mu-flexbox-item>
        <mu-grid-list class="gridlist-demo" :cols="cols" :padding="padding">
          <book-box class="grid-tile" v-for="tile, index in Book" :key="index" >
            <mu-icon-button class="action-button" slot="action" :name="tile.bookid"
                            @click="changeRoute(tile.bookid)"></mu-icon-button>
            <img :src="bookCover+tile.cover"/>
            <span slot="title" v-show="titleChip">{{tile.name}}</span>
            <span slot="deleteChip" v-show="deleteChip">
               <mu-chip class="demo-chip" :name="tile.bookid" @delete="handleDelete(tile)" showDelete>
                   删除
            </mu-chip>
           </span>
          </book-box>
        </mu-grid-list>
      </mu-flexbox-item>
    </mu-flexbox>
  </div>
</template>
<script>
  import BookBox from "./BookBox";
  import {Host,Static} from '../util/host'
  export default {
    components: {BookBox},
    props: [
      'Book',
      'titleChip',
      'deleteChip',

    ],
    data () {
      return {
        cols: 3,
        padding: 10,
        bookCover:Host+Static,
      }
    },
    methods: {
      changeRoute(bookid){
        this.$router.push({name: 'BookMes', params: {id: bookid}})
      },
      handleDelete(book){
        this.$emit('delete',book);
      }
    }
  }
</script>
<style scoped>
  .gridlist-demo-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
    width: 100%;
  }
  .gridlist-demo {
    width: 100%;
    height: auto;
    margin: 10px;
    padding-left: 4px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
  .action-button {
    height: 100%;
    width: 100%;
  }

  .grid-tile {
    margin-bottom: 40px;
  }
</style>
