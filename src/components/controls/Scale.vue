<script>
import commonMixin from "../base/mixins/common.js"
import { checkControlPosition } from "../base/util.js"
export default {
  name: "bm-scale",
  render() {},
  mixins: [commonMixin("control")],
  props: {
    position: {
      type: String,
    },
  },
  watch: {
    position() {
      this.reload()
    },
  },
  methods: {
    load() {
      const { TMap, map, anchor, offset } = this
      let control = map.getControl(TMap.constants.DEFAULT_CONTROL_ID.SCALE)
      map.addControl(control)
      if (checkControlPosition(this.position)) {
        control.setPosition(TMap.constants.CONTROL_POSITION[this.position])
      }
    },
  },
}
</script>
