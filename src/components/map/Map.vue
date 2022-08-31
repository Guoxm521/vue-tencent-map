<template>
  <div class="papa-tencent-map">
    <div v-if="!hasBmView" ref="view" style="width: 100%; height: 100%"></div>
    <slot></slot>
  </div>
</template>

<script>
import bindEvents from "../base/bindEvent.js"
import { checkType, checkBounds } from "../base/util.js"
import { createPoint } from "../base/factory.js"

export default {
  name: "tencent-map",
  props: {
    ak: {
      type: String,
    },
    center: {
      type: [Object, String],
    },
    zoom: {
      type: Number,
    },
    minZoom: {
      type: Number,
    },
    maxZoom: {
      type: Number,
    },
    mapClick: {
      type: Boolean,
      default: true,
    },
    dragging: {
      type: Boolean,
      default: true,
    },
    scrollable: {
      type: Boolean,
      default: true,
    },
    doubleClickZoom: {
      type: Boolean,
      default: true,
    },
    rotation: {
      type: Number,
    },
    pitch: {
      type: Number,
    },
    scale: {
      type: Number,
    },
    offset: {
      type: Object,
    },
    boundary: {
      type: Object,
    },
    pitchable: {
      type: Boolean,
    },
    rotatable: {
      type: Boolean,
    },
  },
  watch: {
    center(val, oldVal) {
      const { map, zoom } = this
      if (checkType(val) === "String" && val !== oldVal) {
        map.centerAndZoom(val, zoom)
      }
    },
    "center.lng"(val, oldVal) {
      const { TMap, map, zoom, center } = this
      if (val !== oldVal && val >= -180 && val <= 180) {
        map.centerAndZoom(new TMap.Point(val, center.lat), zoom)
      }
    },
    "center.lat"(val, oldVal) {
      const { TMap, map, zoom, center } = this
      if (val !== oldVal && val >= -74 && val <= 74) {
        map.centerAndZoom(new TMap.Point(center.lng, val), zoom)
      }
    },
    zoom(val, oldVal) {
      const { map } = this
      if (val !== oldVal && val >= 3 && val <= 19) {
        map.setZoom(val)
      }
    },
    minZoom(val) {
      const { map } = this
      map.setMinZoom(val)
    },
    maxZoom(val) {
      const { map } = this
      map.setMaxZoom(val)
    },
    mapClick() {
      this.reset()
    },
    dragging(val) {
      const { map } = this
      map.setDraggable(Boolean(val))
    },
    scrollable(val) {
      const { map } = this
      val ? map.setScrollable(true) : map.setScrollable(false)
    },
    doubleClickZoom(val) {
      const { map } = this
      val ? map.setDoubleClickZoom(true) : map.setDoubleClickZoom(false)
    },

    rotation(val) {
      const { map, TMap } = this
      val ? map.setRotation(val) : ""
    },
    pitch(val) {
      const { map, TMap } = this
      val ? map.setPitch(val) : ""
    },
    scale(val) {
      const { map, TMap } = this
      val ? map.setScale(val) : ""
    },
    offset(val, oldVal) {
      const { TMap, map } = this
      if (val !== oldVal) {
        map.setOffset(val)
      }
    },
    boundary(val, oldVal) {
      const { TMap, map, setLatLngBounds } = this
      if (val !== oldVal) {
        setLatLngBounds(val)
      }
    },
    pitchable(val) {
      const { map, TMap } = this
      val ? map.setPitchable(true) : map.setPitchable(false)
    },
    rotatable(val) {
      const { map, TMap } = this
      val ? map.setRotatable(true) : map.setPitchable(false)
    },
  },
  methods: {
    setMapOptions() {
      const {
        map,
        TMap,
        minZoom,
        maxZoom,
        dragging,
        scrollable,
        doubleClickZoom,
        rotation,
        pitch,
        scale,
        offset,
        boundary,
        setLatLngBounds,
        pitchable,
        rotatable,
      } = this
      minZoom && map.setMinZoom(minZoom)
      maxZoom && map.setMaxZoom(maxZoom)
      dragging ? map.setDraggable(true) : map.setDraggable(false)
      scrollable ? map.setScrollable(true) : map.setScrollable(false)
      doubleClickZoom
        ? map.setDoubleClickZoom(true)
        : map.setDoubleClickZoom(false)
      rotation ? map.setRotation(rotation) : ""
      pitch ? map.setPitch(pitch) : ""
      scale ? map.setScale(scale) : ""
      offset ? map.setOffset(offset) : ""
      boundary ? setLatLngBounds(boundary) : ""
      pitchable ? map.setPitchable(true) : ""
      rotatable ? map.setPitchable(true) : ""
    },
    init(TMap) {
      if (this.map) {
        return
      }
      let $el = this.$refs.view
      for (let $node of this.$slots.default || []) {
        if (
          $node.componentOptions &&
          $node.componentOptions.tag === "tencent-view"
        ) {
          this.hasBmView = true
          $el = $node.elm
        }
      }
      const map = new TMap.Map($el, {
        enableMapClick: this.mapClick,
        showControl: false,
      })
      this.map = map
      const { setMapOptions, zoom, getCenterPoint } = this
      setMapOptions()
      bindEvents.call(this, map)
      map.setCenter(this.getCenterPoint())
      this.$emit("ready", { TMap, map })
    },
    getCenterPoint() {
      const { center, map, TMap } = this
      switch (checkType(center)) {
        case "String":
          return center
        case "Object":
          return map.setCenter(createPoint(TMap, center))
        default:
          return map.getCenter()
      }
    },
    initMap(TMap) {
      this.TMap = TMap
      this.init(TMap)
    },
    getMapScript() {
      if (!global.TMap) {
        const ak = this.ak || this._TMap().ak
        global.TMap = {}
        global.TMap._preloader = new Promise((resolve, reject) => {
          global._initBaiduMap = function() {
            resolve(global.TMap)
            global.document.body.removeChild($script)
            global.TMap._preloader = null
            global._initBaiduMap = null
          }
          const $script = document.createElement("script")
          global.document.body.appendChild($script)
          $script.src = `https://map.qq.com/api/gljs?v=1.exp&libraries=service&key=${ak}&callback=_initBaiduMap`
        })
        return global.TMap._preloader
      } else if (!global.TMap._preloader) {
        return Promise.resolve(global.TMap)
      } else {
        return global.TMap._preloader
      }
    },
    reset() {
      const { getMapScript, initMap } = this
      getMapScript()
        .then(initMap)
        .catch((err) => {
          console.log(err)
        })
    },
    setLatLngBounds() {
      const { map, TMap, boundary } = this
      if (checkBounds(boundary)) {
        let sw = new TMap.LatLng(boundary.sw.lat, boundary.sw.lng)
        let ne = new TMap.LatLng(boundary.ne.lat, boundary.ne.lng)
        let LatLngBounds = new TMap.LatLngBounds(sw, ne)
        map.setBoundary(LatLngBounds)
      }
    },
  },
  mounted() {
    this.reset()
  },
  data() {
    return {
      hasBmView: false,
    }
  },
}
</script>

<style scoped>
.papa-tencent-map {
  position: relative;
}
</style>
