<template>
  <div>
    <!-- <div>-->
    <div v-for="(comment ,index) in commentList" :key="index" class="comment">
      <table>
        <tr>
          <td class="commentUser">{{comment.reviewer}}</td>
          <td class="commentText">
            <div>{{comment.content}}</div>
          </td>
          <td>
            <mu-flat-button label="回复"  class="demo-flat-button" primary @click="openPop(index)"/>
            <popcontent ref="commentid" :reply="comment.commentid" :Mes="bookId"></popcontent>
          </td>
        </tr>
      </table>
      <!--reply-->
      <div v-for="replyComment in comment"  class="comment">
        <div v-if="replyComment.reply">
          <table style="margin-left: 20%; margin-top: 10px">
            <tr>
              <td class="commentUser">{{replyComment.reviewer}}</td>
              <td class="commentText">
                <div>{{replyComment.content}}</div>
              </td>
            </tr>
          </table>
        </div>

      </div>
      <mu-divider/>
    </div>
  </div>
</template>
<script>
  import {Host,Static} from '../util/host'
  import Popcontent from "./popContent";
  export default{
    name: 'bookComments',
    props:{
        bookid:String,
    },
    components: {
      Popcontent
    },
    data(){
      return {
        commentList: [],
        bookId: this.bookid,
      }
    },
    mounted: function () {
      this.getCommentList();
    },
    methods: {
      openPop(id){
        this.$refs.commentid[id].open()
      },
      getCommentList(){
        this.$ajax.get(Host+'/app/book/comment',{
            params:{
              bookid: this.bookId
            }
        }).then(response => {
            this.$set(this, 'commentList', response.data);
          }, response => {

          }
        )
      },
    }
  }
</script>
<style scoped>
  .commentUser {
    vertical-align: top;
    align: left;
    width: 20%;
    color: #bdbdbd;
  }
.comment{
   margin-top: 10px;
}
  .demo-flat-button {
    float: right;
    margin-bottom: 5%;
  }
</style>
