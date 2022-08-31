<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import commonMixin from "../base/mixins/common.js"
import bindEvents from "../base/bindEvent.js"
import {
  createMarkerStyle,
  createGeometries,
  createPoint,
} from "../base/factory.js"
export default {
  name: "tencent-local-search",
  mixins: [commonMixin("local-search")],
  props: {
    location: {
      type: Object,
      required: true,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    region: {
      type: String,
    },
    regionFix: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: String,
    },
    keyword: {
      type: String,
    },
    suggestParams: {
      type: Object,
    },
    radius: {
      type: Number,
      default: 100,
    },
    SearchNearbyParams: {
      type: Object,
    },
  },
  watch: {
    pageSize(val) {
      this.suggest ? this.suggest.setPageSize(val) : ""
    },
    region(val) {
      this.suggest ? this.suggest.setRegion(val) : ""
    },
    regionFix(val) {
      this.suggest ? this.suggest.setRegionFix(val) : ""
    },
    filter(val) {
      this.suggest ? this.suggest.setFilter(val) : ""
    },
    keyword(val) {
      this.getSuggestions()
      this.searchByKeyword()
    },
  },
  data() {
    return {
      suggest: null,
      search: null,
    }
  },
  methods: {
    load() {
      let {
        map,
        Tmap,
        renderByParent,
        pageSize,
        region,
        regionFix,
        filter,
      } = this
      //地点搜索类
      var search = new TMap.service.Search({ pageSize: pageSize })
      //   关键字输入提示类
      var suggest = new TMap.service.Suggestion({
        pageSize: Number(pageSize),
        region: region,
        regionFix: regionFix,
        filter: filter,
      })
      var markers = new TMap.MultiMarker({
        map: map,
        geometries: [],
      })
      this.originInstance = search
      this.suggest = suggest
      this.search = search
      this.markers = markers
      if (renderByParent) {
        $parent.reload()
      }
    },
    getSuggestions() {
      let { suggest, keyword, suggestParams, Tmap, location } = this
      if (keyword) {
        let params = Object.assign({ keyword: keyword }, suggestParams)
        params.location = createPoint(Tmap, location)
        suggest
          .getSuggestions(params)
          .then((res) => {
            this.$emit("getSuggestions", res)
          })
          .catch((error) => {
            console.error({ methods: "getSuggestions", error })
          })
      }
    },
    searchByKeyword() {
      let { search, keyword, SearchNearbyParams, Tmap, location, radius } = this
      if (keyword) {
        let params = Object.assign(
          { keyword: keyword, radius: radius, center: createPoint(location) },
          SearchNearbyParams
        )
        search.searchRectangle(params).then((res) => {
          this.$emit("searchByKeyword", res)
        })
      }
    },
  },
}
</script>
