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
  props: {},
  watch: {},
  methods: {},
}
</script>
