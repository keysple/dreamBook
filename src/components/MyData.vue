<template>
  <div>
    <user-mes :userMesAPI="usermesapi"></user-mes>
    <mu-tabs :value="activeTab" @change="handleTabChange">
      <mu-tab value="tab1" title="我的阅历"/>
      <mu-tab value="tab2" title="Boss推荐"/>
    </mu-tabs>
    <div v-if="activeTab === 'tab1'">
      <data-chatrs></data-chatrs>
    </div>
    <div v-if="activeTab === 'tab2'">
      <boss-recommend></boss-recommend>
    </div>
  </div>
</template>
<script>
  import UserMes from "./UserMes";
  import BossRecommend from "./BossRecommend";
  import DataChatrs from "./echarts";
  export default{
    components: {
      DataChatrs,
      BossRecommend,
      UserMes
    },
    name: 'MyData',
    data(){
      return {
        activeTab: 'tab1',
        usermesapi:this.$store.state.userinfo[0]
      }
    },
    mounted: function () {
    },
    methods: {
      handleTabChange (val) {
        this.activeTab = val;
      },
    }
  }
</script>

