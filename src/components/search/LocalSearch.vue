<template>
  <div>
    <div class="search_box">
      <input
        id="keyword"
        type="text"
        v-model="keyword"
        @keyup.enter="searchEnter"
        @input="oninput"
      />
      <ul id="suggestionList">
        <li
          v-for="(item, index) in suggestions"
          :key="index"
          @click="selectChange(item)"
        >
          <span class="title">{{ item.title }}</span>
          <span class="address">{{ item.address }}</span>
        </li>
      </ul>
    </div>
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
import { throttle, debounce } from "../base/util.js"
export default {
  name: "tencent-local-search",
  mixins: [commonMixin()],
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
    delay: {
      type: Number,
      default: 500,
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
  },
  data() {
    return {
      suggest: null,
      search: null,
      suggestions: [],
      keyword: "",
    }
  },
  methods: {
    load() {
      let {
        map,
        TMap,
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
      this.suggest = suggest
      this.search = search
      this.markers = markers
      if (renderByParent) {
        $parent.reload()
      }
    },
    getSuggestions() {
      let { suggest, keyword, suggestParams, TMap, location } = this
      this.suggestions = []
      if (keyword) {
        let params = Object.assign({ keyword: keyword }, suggestParams)
        params.location = createPoint(TMap, location)
        suggest
          .getSuggestions(params)
          .then((res) => {
            this.suggestions = res.data
            this.$emit("getSuggestions", res)
          })
          .catch((error) => {
            console.error({ methods: "getSuggestions", error })
          })
      }
    },
    searchByKeyword() {
      let { search, keyword, SearchNearbyParams, TMap, location, radius } = this
      if (keyword) {
        let params = Object.assign(
          {
            keyword: keyword,
            radius: radius,
            center: createPoint(TMap, location),
          },
          SearchNearbyParams
        )
        search.searchNearby(params).then((res) => {
          this.$emit("searchByKeyword", res)
        })
      }
    },
    oninput() {
      let getSuggestions = this.getSuggestions
      let searchByKeyword = this.searchByKeyword
      let delay = this.delay
      debounce(() => {
        getSuggestions()
        searchByKeyword()
      }, delay)
    },
    searchEnter() {
      this.suggestions = []
      this.searchByKeyword()
    },
    selectChange(item) {
      this.$emit("select", item)
      this.keyword = item.title
      this.suggestions = []
    },
  },
}
</script>

<style scoped>
.search_box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  max-width: 50%;
}
#keyword {
  font-size: 14px;
  color: #1f2d3d;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: inline-block;
  height: 32px;
  line-height: 32px;
  outline: 0;
  padding: 0 15px;
  -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
}
#suggestionList {
  list-style-type: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 300px;
}
#suggestionList .title {
  font-size: 14px;
  color: #333;
  margin-right: 10px;
}
#suggestionList .address {
  font-size: 14px;
  color: #666;
}
#suggestionList li {
  padding: 10px 5px;
  cursor: pointer;
}

#suggestionList li .item_info {
  font-size: 12px;
  color: grey;
}

#suggestionList li:hover {
  background-color: #eee;
}

/* 设置滚动条的样式 */
#suggestionList::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
/* 滚动槽 */
#suggestionList::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  background: #ededed;
}
/* 滚动条滑块 */
#suggestionList::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 8px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
