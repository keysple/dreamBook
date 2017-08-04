<template>
  <mu-flexbox class="mt8">
    <mu-flexbox-item>
      <mu-card-header :title="UserMes.name" ><!--少添加了subtitle-->
        <mu-avatar slot="avatar" :src="UserMes.avatar"></mu-avatar>
      </mu-card-header>
    </mu-flexbox-item>
  </mu-flexbox>
</template>
<script>
  import  ding from '../util/dd.js'
  export default{
    name: 'UserMes',
    props: {
      userMesAPI: String
    },
    data(){
      return {
        UserMes: this.userMesAPI,
      }
    }
  }
</script>
