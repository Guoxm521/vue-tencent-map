<template>
  <div id="app">
    <TencentMap
      ak="UJIBZ-VFXC5-NBYIE-QMTSJ-4ZOV7-EBBOZ"
      @click="handleClick"
      style="width: 800px; height: 400px"
    >
      <!-- <bm-marker
        ref="mark"
        :styles="styles"
        :geometries="geometries"
        @click="handleClickMarker"
        @getMultiMarker="getMultiMarker"
        @getMap="getMap"
      ></bm-marker> -->
      <!-- <bm-label
        :styles="labelStyle"
        :geometries="labelgeometries"
        @click="handleClickMarker"
      ></bm-label> -->
      <!-- <TencentInfoWindow
        :position="{ lat: 39.916527, lng: 116.397128 }"
        :content="content"
        @closeclick="closeclick"
        :visible="true"
      ></TencentInfoWindow> -->
      <!-- <TencentMarkerCluster
        :geometries="geometries"
        @click="cluster_click"
        @cluster_changed="cluster_changed"
      ></TencentMarkerCluster> -->
      <!-- <TencentScale></TencentScale>
      <TencentRotation></TencentRotation>
      <TencentZoom></TencentZoom> -->
      <TencentLocalSearch
        :location="location"
        :keyword="keyword"
        @getSuggestions="getSuggestions"
        @searchByKeyword="searchByKeyword"
      ></TencentLocalSearch>
    </TencentMap>
    <button @click="handleClick12">点击</button>
    <div>{{ position }}</div>
  </div>
</template>

<script>
import {
  TencentMap,
  TencentInfoWindow,
  TencentMarkerCluster,
  TencentScale,
  TencentRotation,
  TencentZoom,
  TencentLocalSearch,
} from "./components/index"
import Scale from "./components/controls/Scale.vue"
import Zoom from "./components/controls/Zoom.vue"
import MapType from "./components/controls/MapType.vue"
import BmMarker from "./components/overlays/Marker.vue"
import BmLabel from "./components/overlays/Label.vue"
export default {
  components: {
    TencentMap,
    Scale,
    Zoom,
    MapType,
    BmMarker,
    BmLabel,
    TencentInfoWindow,
    TencentMarkerCluster,
    TencentScale,
    TencentRotation,
    TencentZoom,
    TencentLocalSearch,
  },
  data() {
    return {
      location: {
        lat: 39.916527,
        lng: 116.397128,
      },
      numVisible: true,
      position: "TOP_CENTER",
      boundary: {
        ne: {
          lat: 39.916527,
          lng: 116.397128,
        },
        sw: {
          lat: 39.86,
          lng: 116.28666,
        },
      },
      map_type: "satellite",
      styles: {
        small: {
          // 点标注的相关样式
          width: 34, // 宽度
          height: 46, // 高度
          anchor: { x: 17, y: 23 }, // 标注点图片的锚点位置
          src:
            "https://mapapi.qq.com/web/lbs/visualizationApi/demo/img/small.png", // 标注点图片url或base64地址
          color: "#333", // 标注点文本颜色
          size: 16, // 标注点文本文字大小
          direction: "bottom", // 标注点文本文字相对于标注点图片的方位
          offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
          strokeColor: "#fff", // 标注点文本描边颜色
          strokeWidth: 2, // 标注点文本描边宽度
        },
        big: {
          width: 58,
          height: 76,
          anchor: { x: 36, y: 32 },
          src:
            "https://mapapi.qq.com/web/lbs/visualizationApi/demo/img/big.png",
          color: "#333",
          size: 22,
          direction: "bottom",
          strokeColor: "#fff",
          offset: { x: 0, y: 10 },
          strokeWidth: 2,
        },
      },
      geometries: [
        {
          styleId: "small", // 对应中的样式id
          position: {
            lat: 39.9944,
            lng: 116.33066,
          }, // 标注点位置
          content: "全聚德", // 标注点文本
        },
        {
          styleId: "big",
          position: {
            lat: 39.978867,
            lng: 116.371452,
          },
          content: "北平楼",
        },
        {
          styleId: "small",
          position: {
            lat: 39.92442,
            lng: 116.29199,
          },
          content: "大董烤鸭店",
        },
        {
          styleId: "small",
          position: {
            lat: 39.97912,
            lng: 116.30563,
          },
          content: "白家大院",
        },
        {
          styleId: "small",
          position: {
            lat: 39.93282,
            lng: 116.34813,
          },
          content: "四世同堂",
        },
        {
          styleId: "small",
          position: {
            lat: 39.96305,
            lng: 116.38794,
          },
          content: "便宜坊",
        },
        {
          styleId: "small",
          position: {
            lat: 39.993057,
            lng: 116.209706,
          },
          content: "小吊梨汤",
        },
        {
          styleId: "small",
          position: {
            lat: 39.972919,
            lng: 116.229874,
          },
          content: "那家山城",
        },
      ],

      //
      labelStyle: {
        label: {
          color: "#3777FF", // 颜色属性
          size: 20, // 文字大小属性
          offset: { x: 0, y: 0 }, // 文字偏移属性单位为像素
          angle: 0, // 文字旋转属性
          alignment: "center", // 文字水平对齐属性
          verticalAlignment: "middle", // 文字垂直对齐属性
        },
      },
      labelgeometries: [
        {
          id: "label", // 点图形数据的标志信息
          styleId: "label", // 样式id
          position: {
            lat: 39.916527,
            lng: 116.397128,
          }, // 标注点位置
          content: "腾讯北京总部", // 标注文本
          properties: {
            // 标注点的属性数据
            title: "label",
          },
        },
      ],
      content: "32131",
      keyword: "",
    }
  },
  methods: {
    handleClick(evt) {
      // this.BmMarkerc.add({
      //   position: evt.latLng,
      // })
    },
    handleClick12() {
      // this.$refs["mark"].clear()
      // console.log(this.$refs["mark"].transmitEvent("ongetMap"))
      // this.content += "3"
      this.keyword = "深圳"
    },
    handleClickMarker(e) {
      console.log(312312, e)
    },
    getMultiMarker(e) {
      this.BmMarkerc = e
    },
    getMap(e) {
      console.log("getMap", e)
    },
    closeclick() {
      console.log(31321312312312312)
    },
    cluster_changed() {
      console.log(312312)
    },
    cluster_click(e) {
      console.log(3, e)
    },
    getSuggestions(e) {
      console.log("getSuggestions", e)
    },
    searchByKeyword(e) {
      console.log("searchByKeyword", e)
    },
  },
}
</script>
