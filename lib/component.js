"use strict"

const Nano = require('nanocomponent')
    , nanobus = require('nanobus')

module.exports = Component

function Component () {
  const self = this
  if (!(self instanceof Component)) return new Component()
  Nano.call(self)
  const opts = {}
  self._name = 'nanobus'
  self._listeners = {}
  self._starListeners = []

  self._elwidth = null
  self._elheight = null
  self._opts = opts
  self._element = document.createElement('div')
  self._element.style.display = 'inline-block'
  if (opts.width) {
    self._element.style.width = opts.width + 'px'
    self._elwidth = opts.width
  }
  if (opts.height) {
    self._element.style.height = opts.height + 'px'
    self._elheight = opts.height
  }
}
Component.prototype = Object.create(Nano.prototype)

Component.prototype.emit = nanobus.prototype.emit
Component.prototype._emit = nanobus.prototype._emit
Component.prototype.on = nanobus.prototype.on
Component.prototype.addListener = nanobus.prototype.addListener
Component.prototype.prependListener = nanobus.prototype.prependListener
Component.prototype.once = nanobus.prototype.once
Component.prototype.prependOnceListener = nanobus.prototype.prependOnceListener
Component.prototype.removeListener = nanobus.prototype.removeListener
Component.prototype.removeAllListeners = nanobus.prototype.removeAllListeners
Component.prototype.listeners = nanobus.prototype.listeners

Component.prototype.update = function (props) {
  return this._elwidth !== props.width
    || this._elheight !== props.height
}

Component.prototype.createElement = function (props) {
  if (props.width !== this._elwidth) {
    this._element.style.width = props.width + 'px'
    this._elwidth = props.width
  }
  if (props.height !== this._elheight) {
    this._element.style.height = props.height + 'px'
    this._elheight = props.height
  }
  return this._element
}
