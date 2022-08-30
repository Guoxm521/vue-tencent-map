<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import commonMixin from "../base/mixins/common.js"
import bindEvents from "../base/bindEvent.js"
import { createLabelStyle, createGeometries } from "../base/factory.js"
export default {
  name: "tencent-info-window",
  mixins: [commonMixin("infoWindow")],
  props: {
    position: {
      type: Object,
      required: true,
    },
    content: {
      type: String,
    },
    zIndex: {
      type: Number,
    },
    offset: {
      type: Object,
    },
    enableCustom: {
      type: Boolean,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    content(val, oldval) {
      if (val !== oldval) {
        this.originInstance.setContent(val)
      }
    },
    position: {
      handler(val, oldval) {
        if (val !== oldval) {
          let { TMap } = this
          let position = new TMap.LatLng(Number(val.lat), Number(val.lng))
          this.originInstance.setPosition(position)
        }
      },
      deep: true,
    },
    visible(val) {
      if (this.originInstance) {
        val ? this.originInstance.open() : this.originInstance.close()
      }
    },
  },
  methods: {
    load() {
      const {
        TMap,
        map,
        renderByParent,
        position,
        content,
        zIndex,
        offset,
        enableCustom,
        visible,
      } = this
      const infoWindow = new TMap.InfoWindow({
        map: map,
        position: new TMap.LatLng(Number(position.lat), Number(position.lng)),
        content: content,
        zIndex: zIndex,
        offset: offset,
        enableCustom: enableCustom,
      })
      this.originInstance = infoWindow
      !visible ? infoWindow.close() : ""
      this.$emit("getInfoWindow", infoWindow)
      bindEvents.call(this, infoWindow)
      if (renderByParent) {
        $parent.reload()
      }
    },
    getMap() {
      let { originInstance } = this
      return originInstance ? originInstance.getMap() : ""
    },
    open() {
      let { originInstance } = this
      return originInstance ? originInstance.open() : ""
    },
    close() {
      let { originInstance } = this
      return originInstance ? originInstance.close() : ""
    },
    destroy() {
      let { originInstance } = this
      return originInstance ? originInstance.destroy() : ""
    },
  },
}
</script>
