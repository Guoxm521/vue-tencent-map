export const isPoint = obj => obj.lng && obj.lat
export const checkType = val => Object.prototype.toString.call(val).slice(8, -1)
export const checkBounds = (obj) => {
    if (obj.sw && obj.ne && obj.sw.lat && obj.sw.lng && obj.ne.lat && obj.ne.lng) {
        return true
    } else {
        return false
    }
}
export const checkControlPosition = (string) => {
    let CONTROL_POSITIONS = [
        'TOP_LEFT',
        'TOP_CENTER',
        'TOP_RIGHT',
        'CENTER_LEFT',
        'CENTER',
        'CENTER_RIGHT',
        'BOTTOM_LEFT',
        'BOTTOM_CENTER',
        'BOTTOM_RIGHT',
    ]
    return CONTROL_POSITIONS.indexOf(string) !== -1 ? true : false

}
export const checkBaseMapType = (string) => {
    let BaseMapType = ['vector', 'satellite', 'traffic']
    return BaseMapType.indexOf(string) !== -1 ? true : false
}
// TODO
export const checkFeatures = (type, features) => {
    if (Object.prototype.toString.call(val) !== '[object Array]') {
    } else {
    }
    return true
}

let flag = true
export const debounce = (fn, delay) => {
    if (flag) {
        setTimeout(() => {
            fn()
            flag = true
        }, delay);
    }
    flag = false
}

export const throttle = (fn, delay) => {
    let last = 0, timer = null
    console.log("de")
    return function () {
        let context = this
        let args = arguments
        let now = +new Date()
        console.log(now, last)
        if (now - last < delay) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                fn.apply(context, args)
            }, delay)
        } else {
            last = now
            fn.apply(context, args)
        }
    }
}
