const Component = require('./lib/component.js')
const Map = require('./lib/map.js')

module.exports = MixMap

function MixMap (regl, opts) {
  const self = this
  if (!(self instanceof MixMap)) return new MixMap(regl, opts)
  if (!opts) opts = {}
  self._com = new Component()
  self._regl = regl(self._com._element, opts)
  self._map = null
  window.addEventListener('resize', redraw)
  window.addEventListener('scroll', redraw)
  function redraw () {
    draw()
    window.requestAnimationFrame(draw)
  }
  function draw () {
    if (self._map) {
      self._map.draw()
    }
  }
}

MixMap.prototype.create = function (opts) {
  const m = new Map(this._com, this._regl, opts)
  this._map = m
  return m
}
