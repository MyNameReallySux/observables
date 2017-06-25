import Types from 'Classes/Utils/Types'

class SObject {
  constructor(...args) {
    this.onCreate(...args)
  }

  /* #######################
    Static Methods
  ####################### */

  static GetObjectIterator() {
    return function* lifeCycleEvents(obj) {
      if (!Types.isEmpty(obj)) {
        for (let key of Object.keys(obj)) {
          yield [key, obj[key]];
        }
      }
    }
  }

  /* #######################
    Private Methods
  ####################### */

  _handleArgs(...args) {
    this.options = this.defaults
    
    let data = {}
    this.emit('before_data', data)
    
    if (!Types.isEmpty(args)) {
      let data = this.beforeData(...args)
      if (Types.isUndefined(data)) throw new Error(`Data passed into ${this.constructor.name}'s beforeData function must be returned at end of function.`)

      data = this.afterData(...data)
      if (Types.isUndefined(data)) throw new Error(`Data passed into ${this.constructor.name}'s afterData function must be returned at end of function.`)

      this.options = data
    }
    
    this.emit('after_data', data)

  }

  _initEvents() {
    this.listeners = new Map()
    this.lifeCycleEvents = {
      create: 'onCreate',
      init: 'onInit',
      before_data: 'beforeData',
      after_data: 'afterData',
      update: 'onUpdate',
      attach: 'onAttach',
      render: 'onRender',
      destroy: 'onDestroy'
    }
  }

  _bindEvents() {
    const iterator = SObject.GetObjectIterator()

    for (let [event, methods] of iterator(this.lifeCycleEvents)) {
      if (!Types.isArray(methods)) methods = [methods];

      for (let method of methods) {
        if (!this.hasOwnProperty(method)) this[method] = function () {}
        this.addListener(event, () => {
          console.log(`${this.constructor.name}: handling ${event} event.`)

          for (let mixin of iterator(this.mixins)) {
            if (mixin.hasOwnProperty(event)) {
              mixin[event]
            }
          }

          this[method]()
        })
      }
    }
  }

  _initMixins() {
    this.mixins = this.options.hasOwnProperty('mixins') ? this.options.mixins : {}
  }

  /* #######################
    Public Methods
    - Lifecycle
  ####################### */

  onCreate(...args) {
    this.setDefaults()
    this._initEvents()
    this._bindEvents()
    this.emit('create')
    this._handleArgs(...args)
    this._initMixins()
  }

  beforeData(...data) {
    return data
  }
  afterData(...data) {
    /* #######################
      Local Functions
    ####################### */

    function handleOptionsObject(options) {
      this.options = Object.assign({}, this.defaults, this.options)
    }

    function handleDefaultCase() {
      this.options = this.defaults
    }

    function handleSingleArg(arg) {
      switch (Types.asString(arg)) {
        case 'object':
          {
            handleOptionsObject.apply(this, arg)
          }
          break
        default:
          {
            throw new Error(`Single argument passed into '${this.constructor.name}', is not a valid type (object). Found ${Types.asString(arg)}.`)
          }
      }
    }

    /* #######################
      Procedure
    ####################### */

    switch (data.length) {
      case 1:
        handleSingleArg.apply(this, [data[0]])
        break
      case 2:
        handleTwoArgs.apply(this, [data[0], data[1]])
        break
      case 3:
        handleThreeArgs.apply(this, [data[0], data[1], data[2]])
        break
      default:
        handleDefaultCase.apply(this, ...data)
    }

    return data
  }

  setDefaults() {
    this.defaults = {}
  }

  /* #######################
    Public Methods
    - Event Emitter
  ####################### */

  addListener(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, [])
    this.listeners.get(label).push(callback)
  }
  removeListener(label, callback) {
    let listeners = this.listeners.get(label),
      index = 0

    if (listeners && listeners.length) {
      index = listeners.reduce((i, listener, index) => {
        return Types.isFunction(listener) && listener === callback ? i = index : i
      }, -1)

      if (index > -1) {
        listeners.splice(index, 1)
        this.listeners.set(label, listeners)
        return true
      }
    }
    return false
  }
  emit(label, ...args) {
    let listeners = this.listeners.get(label)
    if (listeners && listeners.length) {
      listeners.forEach((listener) => {
        Types.isFunction(listener) ? listener.apply(this.context, ...args) : undefined
      })
      return true
    }
    return false
  }

  /* #######################
    Public Methods
    - Mixin Handler
  ####################### */

  addMixin(mixin) {
    /* Add new mixin to mixins*/
    this.mixins[mixin.name] = mixin
  }
  removeMixin(mixin) {
    delete this.mixins[mixin.name]
  }
  addAllMixins(mixins) {
    /* Append new mixins to defaults */
    this.mixins = Object.assign({}, mixins, this.mixins)
  }
  createMixins() {
    const iterator = SObject.GetObjectIterator()
    for (let [key, mixin] of iterator(this.mixins)) {
      let instance = mixin(this)
      instance.onCreate(this)
      console.log(key)
      this.mixins[instance.name] = instance
    }
  }
}

export default SObject