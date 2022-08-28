<template>
	<div id="app">
		<BaiduMap ak="2F7BZ-CRP6J-AXKFP-KH7FV-KLC5J-DNF4CF" @click="handleClick">
		</BaiduMap>
		<button @click="handleClick">点击</button>
		<div>{{ position }}</div>
	</div>
</template>

<script>
	import { BaiduMap } from "./components/index";
	import Scale from "./components/controls/Scale.vue";
	import Zoom from "./components/controls/Zoom.vue";
	import MapType from "./components/controls/MapType.vue";
	export default {
		components: {
			BaiduMap,
			Scale,
			Zoom,
			MapType,
		},
		data() {
			return {
				numVisible: true,
				position: "TOP_CENTER",
				boundary: {
					ne: {
						lat: 39.916527,
						lng: 116.397128,
					},
					sw: {
						lat: 39.86,
						lng: 116.28666,
					},
				},
				map_type: "satellite",
			};
		},
		methods: {
			handleClick() {},
		},
	};
</script>

