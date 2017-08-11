<template>
  <div>
    <mu-card>
      <div id="readNum" style="width: 100%;height:300px"></div>
    </mu-card>
    <mu-card>
      <div id="readFavor" style="width: 100%;height:300px">
        <mu-card-media v-show="showPic"><h3>没有数据可以体现你的阅读偏好了，快去阅读吧！</h3><img src="../assets/nodata.png"/></mu-card-media>
      </div>
    </mu-card>
  </div>
</template>
<script>
  import echarts from  'echarts'
  import {Host, Static} from '../util/host'
  export default{
    name: 'dataChatrs',
    data(){
      return {
        readNums: [],
        readFavor: [],
        readType: [],
        showPic: false,
      }
    },
    mounted: function () {
      this.getStatics();
    },
    methods: {
      getStatics(){
        this.$ajax.get(Host + '/app/statistics', {
          params: {
            userid: this.$store.state.userinfo[0].userid,
            departmentId: this.$store.state.userinfo[0].department[0],
          }
        }).then(
          response => {
            /*阅读本数*/
            var readNum = response.data.team;
            this.readNums.push(readNum.me, readNum.most, readNum.avg);
            this.drawNumCharts();
            /*阅读偏好*/
            this.$set(this, 'readFavor', response.data.bookstype);
            for (var i = 0; i < this.readFavor.length; i++) {
              this.readType.push(this.readFavor[i].name)
            }
            if (this.readFavor.length > 0) {
              this.showPic = false;
              this.drawFavorCharts();
            } else {
              this.showPic = true;
            }
          },
          response => {
            console.log(response)
          }
        )
      },
      drawFavorCharts: function () {
        var readFavorCharts = echarts.init(document.getElementById('readFavor'));
        readFavorCharts.setOption({
          title: {text: '阅读偏好'},
          legend: {
            orient: 'vertical',
            x: 'right',
            data: this.readType
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '60%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              data: this.readFavor
            }
          ]
        });
      },
      drawNumCharts: function () {
        var readNumCharts = echarts.init(document.getElementById('readNum'));
        readNumCharts.setOption({
          itemStyle: {
            normal: {
              color: '#81d4fa',
            }
          },
          title: {text: '阅读本数'},
          xAxis: {
            data: ['我的', '团队最多', '团队平均']
          },
          yAxis: {},
          series: [{
            type: 'bar',
            data: this.readNums,
          }]
        });
      }
    },
  }
</script>
