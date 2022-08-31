export function createPoint(TMap, options = {}) {
  const { lng, lat } = options
  return new TMap.LatLng(lat, lng)
}

export function createMarkerStyle(TMap, options = {}) {
  const { width, height, anchor, src, faceTo, rotate, color, strokeColor, strokeWidth, size, direction, offset } = options
  return new TMap.MarkerStyle({
    width,
    height,
    anchor,
    src,
    faceTo: String(faceTo),
    rotate,
    color,
    strokeColor,
    strokeWidth,
    size,
    direction: String(direction),
    offset
  })
}

export function createGeometries(TMap, options = {}) {
  const { id, styleId, position, rank, properties, content } = options
  return {
    id,
    styleId,
    position: new TMap.LatLng(position.lat, position.lng, position.height),
    rank,
    properties,
    content
  }
}

export function createLabelStyle(TMap, options = {}) {
  const { color, size, offset, angle, alignment, verticalAlignment, height, width, backgroundColor, padding, borderWidth, borderRadius, borderColor } = options
  return new TMap.LabelStyle({
    color, size, offset, angle, alignment, verticalAlignment, height, width, backgroundColor, padding, borderWidth, borderRadius, borderColor
  })
}
