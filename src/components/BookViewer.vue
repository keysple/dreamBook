<template>
  <div>
    <div>
      <div>
        <div class="artical-action-mid" id="action_mid" @click="popMenu"></div>
      </div>
      <div id="container" class="container">
        <div id="content" class="content">
          作者：茶寂
          链接：https://www.zhihu.com/question/41327565/answer/115966536
          来源：知乎
          著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
          也是刚刚看完这部小说，宏伟长篇，开头无尽的凄凉惨淡，到进去剧情后的快意恩仇，中期自江湖到庙堂的残酷政争，大人物，小市民，形形色色特点鲜明的人物塑造，层出不穷的悬念设置。        虽说是转型作品，其中不乏月关类历史小说的惯用套路——比如开后宫，深入敌后的开挂情节，巡抚天下，力挽狂澜等烂俗模式。        但愚以为，此依然是一部令人尊敬的上佳作品，无它，作品中始终保持着一种对历史的敬畏感，其中在作品后半截着重明显。        情节发散而不偏离历史，主要人物主要事件依照历史上的主流解读，但于细节和空白之处填上了主角的作用，如此一来，使本来苍白的历史成为鲜明于纸上的传奇。        常人读历史，常常有着无法逾越的代沟感和苍白感。而历史类小说恰恰弥补了这点，可惜从古至今的太多历史小说或者过分演义，或者逻辑混乱，或者人物单调，更逞论叼炸天的爽文。       终醉枕一篇，不管再如何主角光环，再意淫无罪，终未有让人感到对历史的不尊重，反而，历史的变换风云，政治的无奈残酷，随着主角的历练而展现的淋漓尽致。       作品后半截，甚至于历史性上而牺牲了小说性，读者不满意，作者自身也不满意。      其实这也是一个对历史敬畏的作者的两难选择，历史的构架在这里，是在这个构架里面苦心寻觅合理的解释合理的发挥，还是打破这个构架，我还是更欣赏前者。      再者，一篇数百万字的作品，在保持作品完整性上诚尤可贵，开篇挖的大坑，直到最后一章才给出一个令人头皮发麻的解释！      不到最后一章，甚至以为作者已经忘记或者圆不上这个坑，可是最后才发现作者的苦心孤诣。      原来已经在一系列之前情节的暗示中，已经预示了结尾的大爆炸，只是雁过无痕。      更难能可贵的事，历史人物终归他们的宿命，原创剧情跟历史事实的融合，如浑然一体。      如此佳品，淹没在一众网络爽文中，不禁唏嘘……
        </div>
        <div>
          <mu-raised-button label="上一章" class="demo-raised-button"/>
          <mu-raised-button label="下一章" class="demo-raised-button"/>
        </div>
      </div>
      <div class="buttomMenu" v-show="buttomMenuSHow">
        <div>
          <span style="color: white;">字体</span>
          <button class="font-change " @click="changeFont" id="large">大</button>
          <button class="font-change " @click="changeFont" id="middle">中</button>
          <button class="font-change " @click="changeFont" id="small">小</button>
          <mu-divider/>
        </div>
        <div>
          <span style="color: white;">背景</span>
          <button class="circle" @click="changeCol" id="pink" style="background-color: pink"></button>
          <button class="circle" @click="changeCol" id="grey" style="background-color: grey"></button>
          <button class="circle" @click="changeCol" id="yellow" style="background-color: #EEE1C1"></button>
          <mu-divider/>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'BookViewer',
    data(){
      return {
        buttomMenuSHow: false,
      }
    },
    created: function () {
      /* document.getElementById('bottomNav').style.display = 'none';
       document.getElementById('appContainer').style.paddingBottom = 0 + 'px';*/
      this.getBookContent();
    },
    methods: {
      getBookContent(){
        this.$ajax.get('', {
          params: {
            /*bookid,chapterid*/
          }
        }).then(
          response => {

          },
          response => {

          }
        )
      },
      popMenu(){
        if (this.buttomMenuSHow === false) {
          this.buttomMenuSHow = true;

        }
        else {
          this.buttomMenuSHow = false;
        }
      },
      changeFont(val){

        if (val.srcElement.id == 'large') {
          document.getElementById('content').style.fontSize = 24 + 'px';

        } else if (val.srcElement.id == 'small') {
          document.getElementById('content').style.fontSize = 14 + 'px';
        }
        else {
          document.getElementById('content').style.fontSize = 18 + 'px';
        }
      },
      changeCol(val){
        if (val.srcElement.id == 'pink') {
          document.getElementById('container').style.backgroundColor = '#fce4ec';
        }
        else if (val.srcElement.id == 'grey') {
          document.getElementById('container').style.backgroundColor = '#eeeeee';
        }
        else if (val.srcElement.id == 'yellow') {
          document.getElementById('container').style.backgroundColor = '#EEE1C1'
        }
      }
    }
  }
</script>
<style scoped>
  .demo-raised-button {
    width: 40%;
    display: inline;
    margin-top: 15px;
    bottom: 10px;
    background-color: black;
    opacity: 0.6;
    color: white;
    border-radius: 10px;
  }

  .artical-action-mid {
    z-index: 10002;
    width: 100%;
    position: fixed;
    height: 80%;
    top: 10%;
  }

  .container {
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    background-color: #EEE1C1;
    height: 100%;
    font-size: 18px;
    text-align: left;
    font-family: 微软雅黑;
    text-indent: 2em;
    bottom: 0px;
    z-index: 10004;
  }

  .buttomMenu {
    width: 100%;
    height: 100px;
    background-color: #000000;
    opacity: 0.8;
    position: fixed;
    margin: 0 auto;
    text-align: center;
    bottom: 57px;
    z-index: 10004;
  }

  .content {
    margin: 10px 10px;
  }

  .font-change {
    background: none;
    border: 1px solid #8c8c8c;
    color: #fff;
    border-radius: 16px;
    padding: 5px 40px;
    margin-top: 10px;
  }

  .circle {
    width: 40px;
    height: 40px;
    -moz-border-radius: 20px;
    -webkit-border-radius: 20px;
    border-radius: 20px;
    margin: 5px 30px;
  }
</style>
