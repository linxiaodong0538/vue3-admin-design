<!--
 * @Author: your name
 * @Date: 2021-09-22 15:20:40
 * @LastEditTime: 2021-09-30 16:17:07
 * @LastEditors: Lw
 * @Description: In User Settings Edit
 * @FilePath: \scs-ecocity-web\src\views\visual\footer.vue
-->
<template>
  <div class="__footer">
    <FrostedGlass class="card" title="传感检测" ref="aa">
      <div class="body">
        <div class="body__item">
          <div class="icon">
            <img src="../../assets/visual/cgjc_icon_tr.png" alt />
          </div>
          <div class="group">
            <span class="text1">土壤检测点</span>
            <span class="text2">88</span>
          </div>
          <div class="group">
            <span class="text1">正常</span>
            <span class="text2">56</span>
          </div>
          <div class="group">
            <span class="text1">异常</span>
            <span class="text2 danger">24</span>
          </div>
        </div>
        <div class="body__item">
          <div class="icon">
            <img src="../../assets/visual/cgjc_icon_hj.png" alt />
          </div>
          <div class="group">
            <span class="text1">环境检测点</span>
            <span class="text2">88</span>
          </div>
          <div class="group">
            <span class="text1">正常</span>
            <span class="text2">56</span>
          </div>
          <div class="group">
            <span class="text1">异常</span>
            <span class="text2 danger">24</span>
          </div>
        </div>
      </div>
    </FrostedGlass>
    <FrostedGlass class="card" title="生态监测">
      <div class="body">
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/stjc_icon_kqwd.png" alt />
            <span>空气温度：</span>
          </div>
          <span class="value">23C</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/stjc_icon_fog.png" alt />
            <span>空气湿度：</span>
          </div>
          <span class="value">78%</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/stjc_icon_wind.png" alt />
            <span>风速：</span>
          </div>
          <span class="value">16m/s</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/stjc_icon_sandstorm.png" alt />
            <span>风向：</span>
          </div>
          <span class="value">西南</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/stjc_icon_sun.png" alt />
            <span>光照强度：</span>
          </div>
          <span class="value">10万LUX</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/stjc_icon_qy.png" alt />
            <span>气压：</span>
          </div>
          <span class="value">78KPa</span>
        </div>
      </div>
    </FrostedGlass>
    <FrostedGlass class="card" title=" 土壤监测">
      <div class="body">
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/stjc_icon_kqwd.png" alt />
            <span>土壤温度：</span>
          </div>
          <span class="value">23C</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/stjc_icon_fog.png" alt />
            <span>土壤湿度：</span>
          </div>
          <span class="value">78%</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/trjc_icon_ph.png" alt />
            <span>PH值：</span>
          </div>
          <span class="value">3.9</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/trjc_icon_dan.png" alt />
            <span>氮：</span>
          </div>
          <span class="value">34.5mg/kg</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/trjc_icon_lin.png" alt />
            <span>磷：</span>
          </div>
          <span class="value">34.2mg/kg</span>
        </div>
        <div class="body__item">
          <div class="name">
            <img src="../../assets/visual/trjc_icon_jia.png" alt />
            <span>钾：</span>
          </div>
          <span class="value">98.7mg/kg</span>
        </div>
      </div>
    </FrostedGlass>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import FrostedGlass from './frostedGlass.vue'
const aa = ref(null)
console.log('a', aa)
</script>

<style lang="scss" scoped>
.__footer {
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  white-space: nowrap;
  .card {
    display: inline-block;
    width: 659px;
    height: 230px;
    font-size: 14px;
    margin-right: 16px;
    flex-shrink: 0;
    &:nth-child(1) {
      .body {
        &__item {
          width: 627px;
          height: 72px;
          display: flex;
          align-items: center;
          background: rgba(5, 90, 84, 0.5);
          margin-bottom: 8px;

          .icon {
            margin: 0 30px;
            width: 48px;
            height: 48px;
          }
          .group {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-right: 110px;
            .text1 {
              color: #00eccb;
            }
            .text2 {
              padding-top: 6px;
              color: #ffffff;
              font-weight: 600;
              font-size: 24px;
            }
            .danger {
              color: #ec4d41;
            }
          }
        }
      }
    }
    .body {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      &__item {
        display: flex;
        align-items: center;
        width: 306px;
        height: 46px;
        background: rgba(5, 90, 84, 0.5);
        margin-bottom: 7px;
        padding: 0 12px;
        .name {
          display: flex;
          align-items: center;
          color: #00eccb;
          width: 100px;
          span {
            padding-left: 10px;
          }
        }
        .value {
          padding-left: 40px;
          font-size: 16px;
          color: #fff;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
