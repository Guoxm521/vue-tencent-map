<script>
import commonMixin from "../base/mixins/common.js"
import { checkControlPosition } from "../base/util.js"
export default {
  name: "tencent-zoom",
  render() {},
  mixins: [commonMixin("control")],
  props: {
    position: {
      type: String,
    },
    className: {
      type: String,
    },
  },
  watch: {
    position() {
      this.reload()
    },
    className(val) {
      this.reload()
    },
  },
  methods: {
    load() {
      const { TMap, map, anchor, offset } = this
      this.originInstance = TMap.constants.DEFAULT_CONTROL_ID.ROTATION
      let control = map.getControl(this.originInstance)
      map.addControl(control)
      if (checkControlPosition(this.position)) {
        control.setPosition(TMap.constants.CONTROL_POSITION[this.position])
      }
      if (this.className) {
        control.setClassName(this.className)
      }
    },
  },
}
</script>
