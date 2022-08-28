<script>
	import commonMixin from "../base/mixins/common.js";
	import { checkBaseMapType, checkFeatures } from "../base/util.js";
	export default {
		name: "bm-zoom",
		mixins: [commonMixin("mapType")],
		render() {},
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
				};
			},
		},
		watch: {
			baseMap: {
				handler(val) {
					this.reload();
				},
				deep: true,
			},
		},
		methods: {
			load() {
				const { TMap, map, baseMap } = this;
				if (checkBaseMapType(this.baseMap.type)) {
					let params = JSON.parse(JSON.stringify(this.baseMap));
					map.setBaseMap(params);
				}
			},
		},
	};
</script>
