<template>
  <div>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="general" title="综合"/>
      <mu-tab value="IT" title="IT"/>
      <mu-tab value="finance" title="金融"/>
      <mu-tab value="Administration" title="行政"/>
      <mu-tab value="logistics" title="物流"/>
    </mu-tabs>
    <!--综合类-->
    <div v-if="activeTab === 'general'">
      <mu-row gutter class="pb8 mt10">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">fiber_new</i>
          <!--<img src="../assets/icon/fibernew.svg">-->
          <h2 style="display: inline">新书上架</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="newBooks" :titleChip=true :deleteChip=false></book-grid>
      <mu-row gutter class="pb8">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">book</i>
          <h2 style="display: inline">我司热书</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="companyBooks" :titleChip=true :deleteChip=false></book-grid>
    </div>
    <!--IT类-->
    <div v-if="activeTab === 'IT'">
      <mu-row gutter class="pb8 mt10">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">fiber_new</i>
          <!--<img src="../assets/icon/fibernew.svg">-->
          <h2 style="display: inline">新书上架</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="newBooks" :titleChip=true :deleteChip=false></book-grid>
      <mu-row gutter class="pb8">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">book</i>
          <h2 style="display: inline">我司热书</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="companyBooks" :titleChip=true :deleteChip=false></book-grid>
    </div>
    <!--金融类-->
    <div v-if="activeTab === 'finance'">
      <mu-row gutter class="pb8 mt10">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">fiber_new</i>
          <!--<img src="../assets/icon/fibernew.svg">-->
          <h2 style="display: inline">新书上架</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="newBooks" :titleChip=true :deleteChip=false></book-grid>
      <mu-row gutter class="pb8">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">book</i>
          <h2 style="display: inline">我司热书</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="companyBooks" :titleChip=true :deleteChip=false></book-grid>
    </div>
    <!--行政类-->
    <div v-if="activeTab === 'Administration'">
      <mu-row gutter class="pb8 mt10">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">fiber_new</i>
          <!--<img src="../assets/icon/fibernew.svg">-->
          <h2 style="display: inline">新书上架</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="newBooks" :titleChip=true :deleteChip=false></book-grid>
      <mu-row gutter class="pb8">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">book</i>
          <h2 style="display: inline">我司热书</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="companyBooks" :titleChip=true :deleteChip=false></book-grid>
    </div>
    <!--物流类-->
    <div v-if="activeTab === 'logistics'">
      <mu-row gutter class="pb8 mt10">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">fiber_new</i>
          <!--<img src="../assets/icon/fibernew.svg">-->
          <h2 style="display: inline">新书上架</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="newBooks" :titleChip=true :deleteChip=false></book-grid>
      <mu-row gutter class="pb8">
        <mu-col width="85" tablet="50" desktop="33" style="text-align: left; margin-left: 15px">
          <i class="material-icons">book</i>
          <h2 style="display: inline">我司热书</h2></mu-col>
        <mu-col width="15" tablet="50" desktop="33">
          <router-link to="/articleList">
            <img src="../assets/icon/arrow.svg">
          </router-link>
        </mu-col>
      </mu-row>
      <book-grid :Book="companyBooks" :titleChip=true :deleteChip=false></book-grid>
    </div>
  </div>
</template>
<script>
  import BookGrid from "./bookGridList";
  import {Host} from '../util/host'
  export default {
    components: {
      BookGrid
    },
    data () {
      return {
        activeTab: 'general',
        newBooks: [],
        companyBooks: [],
        Type: 'general',
      }
    },
    mounted: function () {
      this.getnewBooksPage();
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val;
        this.Type = val;
        this.getnewBooksPage();
      },
      getnewBooksPage: function () {
        this.$ajax.get(Host + '/app/homepage', {
          params: {
            type: this.Type,
          }
        }).then(response => {
            console.log(response.data);
            this.$set(this, 'newBooks', response.data.newBooks);
            this.$set(this, 'companyBooks', response.data.companyBooks);
          }, response => {
            console.log(response)
          }
        )
      },
    }
  }
</script>
<style scoped>
  .pb8 {
    padding-bottom: 18px;
  }

  .mt10 {
    margin-top: 10px;
  }
</style>
