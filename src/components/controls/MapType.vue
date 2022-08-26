<script>
import commonMixin from "../base/mixins/common.js"
import { checkBaseMapType, checkFeatures } from "../base/util.js"
export default {
  name: "bm-zoom",
  render() {},
  mixins: [commonMixin("control")],
  props: {
    type: {
      type: String,
    },
    features: {
      type: Array,
    },
    filter: {
      type: Array,
    },
    opacity: {
      type: Number,
    },
    flowColor: {
      type: Array,
    },
    flowSpeed: {
      type: Array,
    },
  },
  computed: {
    baseMap() {
      return {
        type: this.type,
        features: this.features,
        filter: this.filter,
        opacity: this.opacity,
        flowColor: this.flowColor,
        flowSpeed: this.flowSpeed,
      }
    },
  },
  watch: {
    baseMap: {
      handler(val, oldVal) {
        if (checkBaseMapType(val.type) && checkFeatures(val.features)) {
          this.reload()
        }
      },
      deep: true,
    },
  },
  methods: {
    load() {
      const { TMap, map, baseMap } = this
      console.log(this.baseMap)
      //   map.setBaseMap({
      //     type: "traffic",
      //     features: ["base", "flow"],
      //   })
      //   let control = map.getControl(TMap.constants.DEFAULT_CONTROL_ID.ROTATION)
      //   map.addControl(control)
      //   if (checkControlPosition(this.position)) {
      //     control.setPosition(TMap.constants.CONTROL_POSITION[this.position])
      //   }
    },
  },
}
</script>
