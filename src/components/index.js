import TencentMap from './map/Map.vue'
import TencentView from './map/MapView.vue'
import TencentScale from './controls/Scale.vue'
import TencentMapType from './controls/MapType.vue'
import TencentRotation from './controls/Rotation.vue'
import TencentZoom from './controls/Zoom.vue'
import TencentLabel from './overlays/Label.vue'
import TencentMarker from './overlays/Marker.vue'
import TencentInfoWindow from './overlays/InfoWindow.vue'
import TencentMarkerCluster from './overlays/MarkerCluster.vue'
import TencentLocalSearch from './search/LocalSearch.vue'
import TencentGeocoderSearch from './search/GeocoderSearch.vue'

export default {
  install(Vue, options) {
    const { ak } = options
    Vue.prototype._TMap = () => ({ ak })
    Vue.component('tencent-map', TencentMap)
    Vue.component('tencent-view', TencentView)
    Vue.component('tencent-scale', TencentScale)
    Vue.component('tencent-map-type', TencentMapType)
    Vue.component('tencent-rotation', TencentRotation)
    Vue.component('tencent-zoom', TencentZoom)
    Vue.component('tencent-label', TencentLabel)
    Vue.component('tencent-marker', TencentMarker)
    Vue.component('tencent-info-window', TencentInfoWindow)
    Vue.component('tencent-marker-cluster', TencentMarkerCluster)
    Vue.component('tencent-local-search', TencentLocalSearch)
    Vue.component('ttencent-geocoder-search', TencentGeocoderSearch)
  }
}
export {
  TencentMap, TencentView, TencentScale, TencentMapType, TencentRotation, TencentZoom, TencentLabel, TencentMarker, TencentInfoWindow, TencentMarkerCluster, TencentLocalSearch, TencentGeocoderSearch
}

