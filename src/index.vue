<template>
	<div class="wscn-http404-container">
		<el-button @click="visible = !visible">按钮</el-button>
		<mapDialog :visible.sync="visible"></mapDialog>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'
	import mapDialog from './mapDialog.vue'
	@Component({
		name: 'Page405',
		components: {
			mapDialog
		}
	})
	export default class extends Vue {
		private message = '404 Page Not Found'
		private visible = false
	}
</script>

<style lang="scss" scoped>
</style>
