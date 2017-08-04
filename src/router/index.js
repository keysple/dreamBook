import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/Home'
import MyBookcase from '@/components/MyBookcase'
import MyData from '@/components/MyData'
import WorkmateBookcase from  '@/components/WorkmateBookcase'
import BookMes from '@/components/BookMes'
import ChapterList from  '@/components/ChapterList'
import  ArticleList from  '@/components/ArticleList'
import BookViewer from '@/components/BookViewer'
import  PdfViewer from '@/components/PdfViewer'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppHome',
      component: AppHome
    }, {
      path: '/myBookcase',
      name: 'MyBookcase',
      component: MyBookcase
    }, {
      path: '/myData',
      name: 'MyData',
      component: MyData
    }, {
      path: '/workmate',
      name: 'WorkmateBookcase',
      component: WorkmateBookcase
    }, {
      path: '/bookMes/:id',
      name: 'BookMes',
      component: BookMes
    }, {
      path: '/articleList',
      name: 'ArticleList',
      component: ArticleList
    }, {
      path: '/chapterList/:bookid',
      name: 'ChapterList',
      component: ChapterList
    }, {
      path: '/article/:bookid/:catalogid',
      name: 'BookViewer',
      component: BookViewer
    }, {
      path: '*',
      redirect: '/'
    }
]
})
