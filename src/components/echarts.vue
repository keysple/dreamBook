<template>
  <div>
    <mu-card>
      <div id="readNum" style="width: 100%;height:300px"></div>
    </mu-card>
    <mu-card>
      <div id="readFavor" style="width: 100%;height:300px"></div>
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
      }
    },
    mounted: function () {
      this.drawCharts();
    },
    methods: {
      drawCharts: function () {
        var readNumCharts = echarts.init(document.getElementById('readNum'));
        var readFavorCharts = echarts.init(document.getElementById('readFavor'));
        readNumCharts.setOption({
          itemStyle: {
            normal: {
              color: '#81d4fa',
            }
          },
          title: {text: '阅读本数'},
          xAxis: {
            data: []
          },
          yAxis: {},
          series: [{
            type: 'bar',
            data: [],
          }]
        });
        readFavorCharts.setOption({
          title: {text: '阅读偏好'},
          legend: {
            orient: 'vertical',
            x: 'right',
            data: []
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
              data: []
            }
          ]
        });
        this.$ajax.get(Host + '/app/statistics', {
          params: {
            userid:this.$store.state.userinfo[0].userid,
            departmentId:this.$store.state.userinfo[0].department[0],
          }
        }).then(
          response => {
            var readNum = response.data.team;
            this.readNums.push(readNum.me, readNum.most, readNum.avg);
            this.$set(this, 'readFavor', response.data.bookstype);
            for (var i = 0; i < this.readFavor.length; i++) {
              this.readType.push(this.readFavor[i].name)
            }
            readNumCharts.setOption({
              xAxis: {
                data: ['我的', '团队最多', '团队平均']
              },
              series: [{
                data: this.readNums
              }]
            })
            readFavorCharts.setOption({
              legend: {
                orient: 'vertical',
                x: 'right',
                data: this.readType
              },
              series: [{
                data: this.readFavor
              }]
            })
          },
          response => {
            console.log(response)
          }
        )
      },
    },
  }
</script>
