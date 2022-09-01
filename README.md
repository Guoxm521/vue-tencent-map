# tencenmap

## 一、开始

### 安装

```js
 npm install pp-vue-tencent-map --save
```

### 全局注册

```js
import Vue from 'vue'
import TencentMap from 'pp-vue-tencent-map'

Vue.use(TencentMap, {
  // ak 是在腾讯地图开发者平台申请的密钥
  ak: 'YOUR_APP_KEY'
})
```

### 局部注册

```js
<template>
  <tencent-map class="bm-view" ak="YOUR_APP_KEY">
  </tencent-map>
</template>
<script>
import TencentMap from 'pp-vue-tencent-map/components/map/Map.vue'
export default {
  components: {
    TencentMap
  }
}
</script>
<style>
.bm-view {
  width: 100%;
  height: 300px;
}
</style>
```

## 二、组件

```js
TencentMap,  地图
TencentView, 容器
TencentScale, 比例尺组件
TencentMapType,  地图类型
TencentRotation, 旋转组件
TencentZoom, 缩放组件
TencentLabel,  文本标记
TencentMarker, 点标记
TencentInfoWindow,信息窗体
TencentMarkerCluster,点聚合
TencentLocalSearch,地点搜索
TencentGeocoderSearch,正逆地址解析
```

## 三、参考

- [腾讯位置服务 | api文档](https://lbs.qq.com/webApi/javascriptGL/glGuide/glOverview)
- [腾讯位置服务 | 示例中心](https://lbs.qq.com/demoList/glAPI)











































