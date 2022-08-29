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
  name: "tencent-label",
  mixins: [commonMixin("label")],
  props: {
    id: {
      type: String,
    },
    styles: {
      type: Object,
    },
    enableCollision: {
      type: Boolean,
    },
    geometries: {
      type: Array,
    },
    visible: {
      type: Boolean,
    },
  },
  watch: {
    setStyles: {
      handler(val, oldval) {
        if (this.originInstance) {
          this.originInstance.setStyles(val)
        } else {
          this.reload()
        }
      },
      deep: true,
    },
    geometries: {
      handler(val, oldval) {
        if (this.originInstance) {
          this.originInstance.setGeometries(val)
        } else {
          this.reload()
        }
      },
      deep: true,
    },
    visible(val) {
      if (this.originInstance) {
        this.originInstance.setVisible(val)
      } else {
        this.reload()
      }
    },
  },
  methods: {
    load() {
      const {
        TMap,
        map,
        renderByParent,
        id,
        enableCollision,
        styles,
        geometries,
      } = this
      for (const key in styles) {
        styles[key] = createLabelStyle(TMap, styles[key])
      }
      let geometries_copy = []
      if (geometries) {
        geometries.map((e) => {
          geometries_copy.push(createGeometries(TMap, e))
        })
      }
      const overlay = new TMap.MultiLabel({
        map: map,
        styles: styles,
        enableCollision: enableCollision,
        id: id,
        geometries: geometries_copy,
      })
      this.originInstance = overlay
      this.$emit("getMultiLabel", overlay)
      bindEvents.call(this, overlay)
      if (renderByParent) {
        $parent.reload()
      }
    },
    clear() {
      this.originInstance.setMap(null)
      this.originInstance = null
    },
    getMap() {
      let { originInstance } = this
      return originInstance ? originInstance.getMap() : ""
    },
    getId() {
      let { originInstance } = this
      return originInstance ? originInstance.getId() : ""
    },
    getGeometries() {
      let { originInstance } = this
      return originInstance ? originInstance.getGeometries() : ""
    },
    getStyles() {
      let { originInstance } = this
      return originInstance ? originInstance.getStyles() : ""
    },
    getVisible() {
      let { originInstance } = this
      return originInstance ? originInstance.getVisible() : ""
    },
    getGeometryById(id) {
      let { originInstance } = this
      return originInstance ? originInstance.getGeometryById(id) : ""
    },
    updateGeometries(geometry) {
      let { originInstance } = this
      return originInstance ? originInstance.updateGeometries(geometry) : ""
    },
    add(geometry) {
      let { originInstance } = this
      return originInstance ? originInstance.add(geometry) : ""
    },
    remove(ids) {
      let { originInstance } = this
      return originInstance ? originInstance.remove(ids) : ""
    },
  },
}
</script>
