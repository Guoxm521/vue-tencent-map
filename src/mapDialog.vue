<template>
	<el-dialog :title="title" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="dialogVisible" class="main_dialog dialog840" @close="close_map">
		<el-form :inline="false" class="demo-form-inline" label-width="0px">
			<el-form-item label="">
				<div id="allmap" style="height: 350px">
					<TencentMap
						ref="TencentMap"
						ak="UJIBZ-VFXC5-NBYIE-QMTSJ-4ZOV7-EBBOZ"
						style="width: 100%; height: 100%"
						:center="center"
						:isPanTo="true"
						@ready="ready"
						@panend="panend"
						@click="handleClickMap"
					>
						<TencentRotation></TencentRotation>
						<TencentZoom></TencentZoom>
						<TencentScale></TencentScale>
						<TencentLocalSearch :location="center" @getSuggestions="getSuggestions" @searchByKeyword="searchByKeyword" @select="handleSelect"> </TencentLocalSearch>
						<TencentMarker :geometries="geometries"></TencentMarker>
						<TencentMarker :geometries="centerGeometries" :styles="styles"></TencentMarker>
						<TencentGeocoderSearch ref="TencentGeocoderSearch"></TencentGeocoderSearch>
					</TencentMap>
				</div>
				<el-empty v-show="surroundingPois.length === 0" description="暂无周围点推荐" :image-size="100" />
				<div v-show="surroundingPois.length > 0" class="tip_box">
					<div v-for="(item, index) in surroundingPois" :key="index" class="address_item" @click="changeLocation(item)">
						<h3>{{ item.title }}</h3>
						<p>{{ item.address }}</p>
					</div>
				</div>
			</el-form-item>
		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="close_map">取 消</el-button>
			<el-button type="primary" @click="setupmine_map">确 定</el-button>
		</div>
	</el-dialog>
</template>
<script lang="ts">
	import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
	import { TencentMap, TencentView, TencentScale, TencentRotation, TencentZoom, TencentLocalSearch, TencentMarker, TencentGeocoderSearch } from './components/index'
	declare const BMap: any

	@Component({
		name: 'MapDialog',
		components: {
			TencentMap,
			TencentView,
			TencentScale,
			TencentRotation,
			TencentZoom,
			TencentLocalSearch,
			TencentMarker,
			TencentGeocoderSearch
		}
	})
	export default class extends Vue {
		@Prop({ type: Boolean }) visible!: boolean
		@Prop({ type: String, default: '地图选点' }) title!: string
		@Prop({
			type: Object,
			default: () => {
				return { lng: 113.94681, lat: 22.546212 }
			}
		})
		private zcenter!: any
		private center: any = this.zcenter
		private TMap: any = null
		private map: any = null
		private geometries: any = []
		private centerGeometries: any = []
		private styles: any = {
			small: {
				// 点标注的相关样式
				width: 34, // 宽度
				height: 46, // 高度
				anchor: { x: 17, y: 23 }, // 标注点图片的锚点位置
				src: 'https://mapapi.qq.com/web/lbs/visualizationApi/demo/img/small.png', // 标注点图片url或base64地址
				color: '#333', // 标注点文本颜色
				size: 16, // 标注点文本文字大小
				direction: 'bottom', // 标注点文本文字相对于标注点图片的方位
				offset: { x: 0, y: 8 }, // 标注点文本文字基于direction方位的偏移属性
				strokeColor: '#fff', // 标注点文本描边颜色
				strokeWidth: 2 // 标注点文本描边宽度
			}
		}
		private form: any = {
			center: {
				lng: '',
				lat: ''
			},
			address: '',
			title: ''
		}
		private surroundingPois = []
		private polygonPath: any = []

		get dialogVisible(): boolean {
			return this.visible
		}
		set dialogVisible(value: boolean) {
			this.$emit('update:visible', value)
		}
		private close_map() {
			console.log(3123)
			this.dialogVisible = false
		}
		private setupmine_map() {}
		private getSuggestions(e) {
			let data: any = e.data
		}
		private searchByKeyword(e) {
			let data: any = e.data
			this.surroundingPois = data
			let list = []
			data.map(e => {
				list.push({
					position: e.location
				})
			})
			this.geometries = list
		}
		private handleSelect(e) {
			let obj = {
				lat: e.location.lat,
				lng: e.location.lng
			}
			this.center = obj
		}

		private changeLocation(e) {
			let obj = {
				lat: e.location.lat,
				lng: e.location.lng
			}
			let $TencentMapRef: any = this.$refs['TencentMap']
			let mapStatus: any = {
				center: obj,
				zoom: 16
			}
			$TencentMapRef.easeTo(mapStatus)
			this.form.address = e.address
			this.form.title = e.title
			this.form.center.lng = e.location.lng
			this.form.center.lat = e.location.lat
		}
		private mounted() {
			let position = this.center
			this.centerGeometries.push({ position: position, styleId: 'small' })
		}
		private ready(e) {
			this.TMap = e.TMap
			this.map = e.map
		}
		private panend(e) {
			let $TencentMapRef: any = this.$refs['TencentMap']
			let position = $TencentMapRef.getCenter()
			this.centerGeometries = [{ position: position, styleId: 'small' }]
		}
		private async handleClickMap(e) {
			console.log(e)
			let $TencentMapRef: any = this.$refs['TencentMap']
			let position = e.latLng
			this.centerGeometries = [{ position: position, styleId: 'small' }]
			let $TencentGeocoderSearch: any = this.$refs['TencentGeocoderSearch']
			let res = await $TencentGeocoderSearch.getAddress({ location: position })
			console.log(res)
		}
	}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.serachinput {
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
	&:focus {
		border-color: #1890ff;
	}
	&:active {
		border-color: #1890ff;
	}
}
#allmap {
	height: 350px;
}
::v-deep .el-dialog__body {
	padding-bottom: 0;
	padding-top: 10px;
}
.tip_box {
	margin-top: 10px;
	height: 170px;
	overflow: auto;
	.address_item {
		padding: 2px 5px;
		border-radius: 5px;
		overflow: hidden;
		cursor: pointer;
		&:hover {
			background-color: #edf1f6;
		}
	}
	h3 {
		font-size: 16px;
		line-height: 1.2;
	}
	p {
		font-size: 14px;
		line-height: 1.8;
		color: #a9bdd3;
	}
}
::v-deep .el-empty {
	padding: 20px 0;
}
.tips {
	p {
		margin: 0;
		padding: 0;
		line-height: 1.4;
		color: #1f2d3d;
	}
}
.search {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 10000;
}
</style>
