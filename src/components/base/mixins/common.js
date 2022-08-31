const getParent = $component => ($component.abstract || $component.$el === $component.$children[0].$el) ? getParent($component.$parent) : $component
function destroyInstance() {
    const { unload, renderByParent, $parent } = this
    if (renderByParent) {
        $parent.reload()
    }
    unload()
}
class Mixin {
    constructor(prop) {
        this.methods = {
            ready() {
                const $parent = getParent(this.$parent)
                const TMap = this.TMap = $parent.TMap
                const map = this.map = $parent.map
                this.load()
                this.$emit('ready', {
                    TMap,
                    map
                })
            },
            transmitEvent(e) {
                this.$emit(e.replace(/^on/, ''), e)
            },
            reload() {
                this && this.TMap && this.$nextTick(() => {
                    this.unload()
                    this.$nextTick(this.load)
                })
            },
            unload() {
                let { map, originInstance } = this
                try {
                    switch (prop.type) {
                        case 'search':
                            return originInstance.clearResults()
                        case 'autoComplete':
                        case 'lushu':
                            return originInstance.dispose()
                        case 'marker':
                            originInstance.setMap(null);
                            originInstance = null;
                            break
                        case 'label':
                            originInstance.setMap(null);
                            originInstance = null;
                            break
                        case 'infoWindow':
                            originInstance.setMap(null);
                            originInstance = null;
                            break
                        case 'local-search':
                            originInstance.setMap(null);
                            originInstance = null;
                            break
                        case 'control':
                            return map['removeControl'](originInstance)
                        default:
                            break
                    }
                } catch (e) {
                    throw new Error(e)
                }
            }
        }
        this.computed = {
            renderByParent() {
                return this.$parent.preventChildrenRender
            }
        }
        this.mounted = function () {
            const $parent = getParent(this.$parent)
            const map = $parent.map
            const { ready } = this
            map ? ready() : $parent.$on('ready', ready)
        }
        this.destroyed = destroyInstance
        this.beforeDestroy = destroyInstance
    }
}

export default type => new Mixin({ type })
