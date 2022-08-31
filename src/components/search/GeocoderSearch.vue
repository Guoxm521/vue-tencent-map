<script>
	import commonMixin from '../base/mixins/common.js'
	import { createPoint } from '../base/factory.js'
	export default {
		name: 'tencent-geocoder-search',
		mixins: [commonMixin()],
		props: {},
		watch: {},
		render() {},
		data() {
			return {
				geocoder: null
			}
		},
		methods: {
			load() {
				let { map, TMap, renderByParent } = this
				var geocoder = new TMap.service.Geocoder()
				this.geocoder = geocoder
				if (renderByParent) {
					$parent.reload()
				}
			},
			async getAddress(GetAddressParams) {
				let { map, TMap, geocoder } = this
				if (!GetAddressParams.location) {
					throw new Error('location必填')
				}
				GetAddressParams.location = createPoint(TMap, GetAddressParams.location)
				let res = await geocoder.getAddress(GetAddressParams)
				return res
			},
			async getLocation(GetLocationParams) {
				let { map, TMap, geocoder } = this
				let res = await geocoder.getLocation(GetLocationParams)
				return res
			}
		}
	}
</script>
