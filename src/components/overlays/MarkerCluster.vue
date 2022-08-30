<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import commonMixin from "../base/mixins/common.js"
import bindEvents from "../base/bindEvent.js"
import { createMarkerStyle, createGeometries } from "../base/factory.js"
export default {
  name: "tencent-marker-cluster",
  mixins: [commonMixin("marker")],
  props: {
    id: {
      type: String,
    },
    enableDefaultStyle: {
      type: Boolean,
      default: true,
    },
    minimumClusterSize: {
      type: Number,
      default: 2,
    },
    geometries: {
      type: Array,
    },
    zoomOnClick: {
      type: Boolean,
      default: true,
    },
    gridSize: {
      type: Number,
      default: 60,
    },
    averageCenter: {
      type: Boolean,
      default: false,
    },
    maxZoom: {
      type: Number,
      default: 20,
    },
  },
  watch: {
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
  },
  methods: {
    load() {
      const {
        TMap,
        map,
        renderByParent,
        id,
        enableDefaultStyle,
        minimumClusterSize,
        geometries,
        zoomOnClick,
        gridSize,
        averageCenter,
        maxZoom,
      } = this
      let geometries_copy = []
      if (geometries) {
        geometries.map((e) => {
          geometries_copy.push(createGeometries(TMap, e))
        })
      }
      var markerCluster = new TMap.MarkerCluster({
        id: id,
        map: map,
        enableDefaultStyle: enableDefaultStyle,
        minimumClusterSize: Number(minimumClusterSize),
        geometries: geometries_copy,
        zoomOnClick: zoomOnClick,
        gridSize: Number(gridSize),
        averageCenter: averageCenter,
        maxZoom: Number(maxZoom),
      })
      this.originInstance = markerCluster
      this.$emit("getMarkerCluster", markerCluster)
      bindEvents.call(this, markerCluster)
      if (renderByParent) {
        $parent.reload()
      }
    },
    getMap() {
      let { originInstance } = this
      return originInstance ? originInstance.getMap() : ""
    },
    getId() {
      let { originInstance } = this
      return originInstance ? originInstance.getId() : ""
    },
    getClusters() {
      let { originInstance } = this
      return originInstance ? originInstance.getClusters() : ""
    },
    getGeometries() {
      let { originInstance } = this
      return originInstance ? originInstance.getGeometries() : ""
    },
    getGeometryById(id) {
      let { originInstance } = this
      return originInstance ? originInstance.getGeometryById(id) : ""
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
