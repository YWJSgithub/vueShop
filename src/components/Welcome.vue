<template>
  <div class="body">
    <div class="header">
      <h1>数据可视化-echart</h1>
      <div class="showtime">当前时间:{{showTime | dateFomat}}</div>
    </div>
    <div class="mainbox">
      <div class="column">
        <div class="panel bar">
          <h2>就业行业</h2>
          <div class="chart">tubiao</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2>人员变化 &nbsp;  &nbsp; 
            <a style="color:#fff;">2020</a> &nbsp;  &nbsp; 
            <a style="color:#fff;">2021</a>
          </h2>
          <div class="chart">tubiao</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>年龄分布</h2>
          <div class="chart">tubiao</div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <!-- 中间地图 -->
      <div class="column">
        <!-- 数字模块 -->
        <div class="no">
          <div class="no_hd">
            <div>12345</div>
            <div>098</div>
          </div>
          <div class="no_bd">
            <div>前端需求人数</div>
            <div>市场供应人数</div>
          </div>
        </div>
        <!-- 地图模块 -->
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <div class="chart"></div>
        </div>
      </div>
      <div class="column">
        <div class="panel bar2">
          <h2>就业行业</h2>
          <div class="chart">tubiao</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line2">
          <h2>播放量</h2>
          <div class="chart">tubiao</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie2">
          <h2>地区分布</h2>
          <div class="chart">tubiao</div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/js/flexible.js"
import welcome from "../assets/js/welcome.js"
export default {
  ...welcome
    
}
</script>
<style lang="less" scoped>
  .body {
    height: calc(100% + 40px);
    background: url(../assets/images/bg.jpg) no-repeat top center;
    line-height: 1.15;
    margin: -20px;
    overflow: auto;
  }
  @font-face {
    font-family: electronicFont;
    src: url(../assets/fonts/DS-DIGIT.TTF);
  }
  .header {
    position: relative;
    height: 1.25rem;
    background: url(../assets/images/head_bg.png) no-repeat;
    background-size: 100% 100%;
    h1 {
      font-size: 0.475rem;
      color: #fff;
      text-align: center;
      line-height: 1rem;
      margin: 0;
    }
    .showtime {
      position: absolute;
      right: 0.375rem;
      top: 0;
      line-height: 0.9375rem;
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.25rem;
    }
  }
  .mainbox {
    display: flex;
    min-width: 1024px;
    max-width: 1920px;
    margin: 0 auto;
    padding: 0.25rem 0.25rem 0;
    .column {
      flex: 3;
      &:nth-child(2) {
        flex: 5;
        margin: 0.125rem 0.1875rem;
      }
      .panel {
        position: relative;
        height: 3.875rem;
        border: 0.0125rem solid rgba(25, 186, 139, 0.17);
        background: url(../assets/images/line.png);
        padding: 0 0.1875rem 0.2rem;
        margin-bottom: 0.1875rem;
        &::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 10px;
          border-left: 2px solid #02a6b5;
          border-top: 2px solid #02a6b5;
          content: "";
        }
        &::after {
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 10px;
          border-right: 2px solid #02a6b5;
          border-top: 2px solid #02a6b5;
          content: "";
        }
        .panel-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          &::before {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 20px;
            height: 10px;
            border-left: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            content: "";
          }
          &::after {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 20px;
            height: 10px;
            border-right: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            content: "";
          }
        }
        h2 {
          height: 0.6rem;
          line-height: 0.6rem;
          margin: 0;
          color: #fff;
          text-align: center;
          font-size: 0.25rem;
          font-weight: 400;
        }
        .chart {
          height: 3.275rem;
        }
      }
    }
  }
  .no {
    background: rgba(101, 132, 226, 0.1);
    .no_hd {
      position: relative;
      display: flex;
      padding: 0.1875rem;
      border: 1px solid #19ba8b30;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 10px;
        content: "";
        border-top: 2px solid #02a6b5;
        border-left: 2px solid #02a6b5;
      }
      &::after {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 30px;
        height: 10px;
        content: "";
        border-bottom: 2px solid #02a6b5;
        border-right: 2px solid #02a6b5;
      }
      > div {
        flex: 1;
        line-height: 1rem;
        font-size: .6875rem;
        color: #ffeb7b;
        text-align: center;
        font-family: "electronicFont";
        &:bth-child(1)::after {
          content: "";
          position: absolute;
          top: 25%;
          right: 0;
          height: 50%;
          width: 1px;
          background: rgba(255, 255, 255, 0.2);
        }
      }
    }
    .no_bd{
      display: flex;
      >div{
        flex: 1;
        text-align: center;
        color: #ffffff70;
        font-size: .225rem;
        height: .5rem;
        line-height: .5rem;
      }
    }
  }
  .map{
    position: relative;
    height: 10.125rem;
    .map1{
      width:  6.475rem;
      height: 6.475rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: url(../assets/images/map.png);
      background-size: 100% 100% ;
      opacity: .3;
    }
    .map2{
      width: 8.0375rem;
      height: 8.0375rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: url(../assets/images/lbx.png);
      background-size: 100% 100% ;
      opacity: .6;
      animation: rotate1 15s linear infinite;
    }
    .map3{
      width: 7.075rem;
      height: 7.075rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      background: url(../assets/images/jt.png);
      background-size: 100% 100% ;
      opacity: .6;
      animation: rotate2 10s linear infinite;
    }
    .chart{
      position:absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 10.125rem;
    }
  }
  @keyframes rotate1 {
    from {
      transform: translate(-50%,-50%) rotate(0deg);
    }
    to {
      transform: translate(-50%,-50%) rotate(360deg);
    }
  }
  @keyframes rotate2 {
    from {
      transform: translate(-50%,-50%) rotate(0deg);
    }
    to {
      transform: translate(-50%,-50%) rotate(-360deg);
    }
  }

</style>