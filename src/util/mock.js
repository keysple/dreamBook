/**
 * Created by 13006 on 2017/7/11.
 */
import Mock from 'mockjs';
let BookList = new Array(~~(3)).fill(0).map(() => ({
  'name': Mock.Random.ctitle(),
  'resource|1': ['新书推荐', '我司热书'],
  'type|1': ['IT', '金融', '制造', '物流'],
  'author': Mock.Random.cname(),
  'bookid|1-5': 10,
  'cover': 'https://img3.doubanio.com/lpic/s1727290.jpg',
  "IntroduceText": Mock.Random.cparagraph(1, 3),
  'bookUrl': Mock.Random.url()
}))
let workMate = new Array(~~(Math.random() * 10)).fill(0).map(() => ({
  'name': Mock.Random.ctitle(),
  'resource|1': ['newBooks', 'companyRecommends'],
  'type|1': ['IT', '金融', '制造', '物流'],
  'author': Mock.Random.cname(),
  'bookid|20-30': 10,
  'cover': 'https://img3.doubanio.com/lpic/s1727290.jpg',
  "IntroduceText": Mock.Random.cparagraph(1, 3),
  'bookUrl': Mock.Random.url()
}))
let BookMes = {
  'name': Mock.Random.ctitle(),
  'resource|1': ['newBooks', 'companyRecommends'],
  'type|1': ['IT', '金融', '制造', '物流'],
  'author': Mock.Random.cname(),
  'bookid|20-30': 10,
  'cover': 'https://img3.doubanio.com/lpic/s1727290.jpg',
  "IntroduceText": Mock.Random.cparagraph(1, 3),
  'bookUrl': Mock.Random.url()
}
let myBookCase = {
  'name': Mock.Random.ctitle(),
  'resource|1': ['newBooks', 'companyRecommends'],
  'type|1': ['IT', '金融', '制造', '物流'],
  'author': Mock.Random.cname(),
  'bookid|20-30': 10,
  'cover': 'https://img3.doubanio.com/lpic/s1727290.jpg',
  "IntroduceText": Mock.Random.cparagraph(1, 3),
  'bookUrl': Mock.Random.url()
}
let catalog = {
  'catalogList|20-40': [{
    'id|+1': 1,
    'name': Mock.Random.ctitle(),
  }]
}
let user = {
  'userList|1-10': [{
    'userid|+1': 1,
    'name': Mock.Random.cname(),
    'img': 'http://img1.skqkw.cn:888/2014/12/06/08/21ofdtyslqn-62877.jpg',
    'reading': '读了10本书'
  }]
}
let bookComments = {
  'commentsList|3': [{
    'userid|+1': 1,
    'name': Mock.Random.cname(),
    'content':Mock.Random.csentence(),
    'reply|2':[{
      'userid|0-10':10,
      'name': Mock.Random.cname(),
      'content':Mock.Random.csentence(),
    }]
  }]
}
let data= {
   'num': Mock.Random.range(0,5,3),
}
let recommend= {
  'recommendList|2': [{
    'bookid|20-30': 10,
    'msg': Mock.Random.csentence(),
    'bookcover':  'https://img3.doubanio.com/lpic/s1727290.jpg',
    'author': Mock.Random.cname(),
    'name': Mock.Random.ctitle()
  }]
}

export default Mock.mock('app/homepage?type=general&block=companyBook', BookList)
  .mock('app/homepage?type=general&block=newBooks',BookList)
  .mock('app/book?bookId=1', BookMes)
  .mock('http://uixr7y.natappfree.cc/', workMate)
  .mock('app/getChapterById/id', catalog)
  .mock('app/bookshelf/colleaguesBookshelfList?userId=1', workMate)
  .mock('app/getUser?userId=1', user)
  .mock('app/myBookCase?id=1', BookList)
  .mock('/deletebookById', 'post',
    function (res) {
   console.log('删除的参数是'+res.body)
    })
  .mock('app/postcomments', 'post', function (res) {
    console.log('回复成功的参数：'+res.body)
  })
  .mock('app/getCommentBybookId',bookComments)
  .mock('app/bookshelf/add','post',function (res) {
    console.log('加入书架的参数是'+res.body)
  })
  .mock('app/bookList?block=newBooks',BookList)
  .mock('app/recommend?userId=1',recommend)
  .mock('app/readNum',data);
