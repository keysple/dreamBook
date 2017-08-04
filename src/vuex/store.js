/**
 * Created by 13006 on 2017/7/13.
 */
"use strict";
import Vue from 'vue'
import  Vuex from  'vuex'
const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      {id: 1, done: true},
      {id: 2, done: false}
    ],
    userinfo:[],
  },
  mutations: {
    ADDINFO(state,info){
     state.userinfo.push(info);
    },
  },
  actions :{
    addInfo(context,info){
      context.commit("ADDINFO",info);
      alert('success actions')
    }
  }
})
export  default  store
