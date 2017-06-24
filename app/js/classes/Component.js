import 'babel-polyfill'
import $ from 'jquery'

import Mixin from './Mixin'
import Types from './Types'
import {EventEmitter, EventEmitterMixin} from './EventEmitter'

window.Types = Types
window.$ = $

class SObject {
  constructor(){
    this._createLifeCycle()
  }
  _createLifeCycle(){
    if(!this.hasOwnProperty('events')) this.events = {}
    this._lifeCycleEvents = [
      'onCreate', 'onInit', 'willReceiveData', 'onReceiveData', 'willUpdate',
      'onUpdate', 'onAttach', 'willRender', 'onRender', 'onDestroy',
    ]
    for(let eventName of this._lifeCycleEvents){
      if(!this.events.hasOwnProperty(eventName)) this.events[eventName] = []
      if(!this.hasOwnProperty(eventName)) this[eventName] = function(){}
    }
  }
  destroy(){
    this.emit('onDestroy')
  }
  onDestroy(){
    console.log('being destroyed')
    delete this
  }
}

function ManageInstanceMixin(instance) {
  const Class = instance.constructor
  if(!Class.hasOwnProperty('instances')){
    Class.instances = new Map()
    Class.addInstance = (instance)=>{
      const key = instance.options.selectors.el
      const value = instance
      if(Class.instances.has(key)){
        throw new Error(`Object of selector ${key} already has an instance of ${instance.constructor.name} attached to it.`)
      } else {
        Class.instances.set(key, value)
      }
    }
    Class.removeInstance = ()=>{

    }
  }
  return {
    name: "ManageInstanceMixin",
    instance: instance,
    onCreate(){
      console.log(this)
      Class.addInstance(this.instance)
    },
    onDestroy(){
      Class.removeInstance(this.instance)
    }
  }
}

class Component extends SObject{
  constructor(...args){
    super()
    this.options = {}

    this._setDefaults()
    this._handleArgs(...args)
    const data = this._initData()
    const mixins = this._initMixins()
    this._bindEvents()

    this.cacheDOM(data.selectors)
    this.render()
  }

  _setDefaults(){
    this.defaults = {
      selector: "*[data-module]",
      template: undefined,
      mixins: [
        EventEmitterMixin, ManageInstanceMixin
      ]
    }
  }

  _handleArgs(...args){
    /* #######################
      Procedure
    ####################### */

    switch (args.length) {
      case 1: handleSingleArg.apply(this, [args[0]])
      break
      case 2: handleTwoArgs.apply(this, [args[0], args[1]])
      break
      case 3: handleThreeArgs.apply(this, [args[0], args[1], args[2]])
      break
      default: this.options.selector = this.defaults.selector
    }

    /* #######################
      Local Functions
    ####################### */

    /* #######################
      Single Argument

      Component(selector | options)

      ------------------------

      String: selector
      * Selector of Component, should return 1 jQuery element, but doesn't have to.

      Object: options
      * Options object, see object documentation for more information.
    ####################### */

    function handleSingleArg(arg){
      switch(Types.asString(arg)) {
        // String: selector
        case 'string': {
          this.options.selectors = this.options.selectors || {}
          this.options.selectors.el = !Types.isEmpty(arg) ? arg : this.defaults.selector
        }
        break
        // Object: options
        case 'object': {
          this.options = arg
        }
        break
        default: {
          throw new Error(`Single argument passed into 'Component', is not a valid type (string, object).`)
        }
      }
    }

    /* #######################
      Two Arguments

      Component(selector | selectors, options)

      ------------------------

      String: selector
      * Selector of Component, should return 1 jQuery element, but doesn't have to.

      Object: selectors
      * Selectors of Component, must have an 'el' property. Other selectors are determined by Component.

      ------------------------

      Object: options
      * Options object, see object documentation for more information.
    ####################### */

    function handleTwoArgs(arg1, arg2){
      handleTwoArgsFirstArg.apply(this, [arg1])
      handleTwoArgsSecondArg.apply(this, [arg2])
    }

    function handleTwoArgsFirstArg(arg){
      switch(Types.asString(arg)) {
        // String: selector
        case 'string': {
          this.options.selectors = this.options.selectors || {}
          this.options.selectors.el = !Types.isEmpty(arg) ? arg : this.defaults.selector
        }
        break
        // Object: selectors
        case 'object': {
          this.options.selectors = arg
        }
        break
        default: {
          throw new Error(`First argument passed into ${this.constructor.name} is not a valid type (string, object).`)
        }
      }
    }

    function handleTwoArgsSecondArg(arg){
      switch(Types.asString(arg)) {
        // String: template
        case 'string': {
          this.options.template = !Types.isEmpty(arg) ? arg : this.defaults.template
        }
        break
        // Object: options
        case 'object': {
          if(!Types.isEmpty(this.options.selector)
            && !Types.isEmpty(arg.selector)
            || !Types.isEmpty(this.options.selector)
            && arg.hasOwnProperty('selectors')
            && arg.selectors.hasOwnProperty('el'))
            console.warn(`${this.constructor.name} object's selector was set multiple times. This may cause unexpected results.`)
          this.options = Object.assign({}, this.options, arg)
        }
        break
        default: {
          throw new Error(`Second argument passed into ${this.constructor.name} is not a valid type (object).`)
        }
      }
    }

    /* #######################
      Three Arguments

      Component(selector | selectors, template | templateOptions, options)

      ------------------------

      String: selector
      * Selector of Component, should return 1 jQuery element, but doesn't have to.

      Object: selectors
      * Selectors of Component, must have an 'el' property. Other selectors are determined by Component.

      ------------------------

      Object: template
      * Selector of template, should return 1 jQuery element, and element should be an HTML5 template, or a script tag.

      ------------------------

      Object: options
      * Options object, see object documentation for more information.
    ####################### */

    function handleThreeArgs(arg1, arg2, arg3){
      handleThreeArgsFirstArg.apply(this, [arg1])
      handleThreeArgsSecondArg.apply(this, [arg2])
      handleThreeArgsThirdArg.apply(this, [arg3])
    }

    function handleThreeArgsFirstArg(arg){
      switch(Types.asString(arg)) {
        // String: selector
        case 'string': {
          this.options.selector = !Types.isEmpty(arg) ? arg : this.defaults.selector
        }
        break
        // Object: selectors
        case 'object': {
          this.options.selectors = !Types.isEmpty(arg) ? arg : this.defaults.selector
        }
        break
        default: {
          throw new Error(`First argument passed into ${this.constructor.name} is not a valid type (string, object).`)
        }
      }
    }

    function handleThreeArgsSecondArg(arg){
      switch(Types.asString(arg)) {
        // String: template
        case 'string': {
          this.options.template = !Types.isEmpty(arg) ? arg : this.defaults.template
        }
        break
        // Object: templateOptions
        case 'object': {
          this.options.template = !Types.isEmpty(arg) ? arg : this.defaults.template
        }
        break
        default: {
          throw new Error(`First argument passed into ${this.constructor.name} is not a valid type (string, object).`)
        }
      }
    }

    function handleThreeArgsThirdArg(arg){
      switch(Types.asString(arg)) {
        // String: template
        case 'string': {
          this.options.template = !Types.isEmpty(arg) ? arg : this.defaults.template
        }
        break
        // Object: options
        case 'object': {
          if(!Types.isEmpty(this.options.selector)
            && !Types.isEmpty(arg.selector)
            || !Types.isEmpty(this.options.selector)
            && arg.hasOwnProperty('selectors')
            && arg.selectors.hasOwnProperty('el'))
            console.warn(`${this.constructor.name} object's selector was set multiple times. This may cause unexpected results.`)
          this.options = Object.assign({}, this.options, arg)
        }
        break
        default: {
          throw new Error(`Second argument passed into ${this.constructor.name} is not a valid type (object).`)
        }
      }
    }
  }

  _bindEvents(){
    this.emit('onCreate')
    this.onCreate()

    for(let label of this._lifeCycleEvents){
      this.addListener(label, ()=>{
        console.log(`${this.constructor.name}: ${label} event emitted.`)
        for(let mixin of Object.entries(this.mixins)){
          if(mixin.hasOwnProperty(label)) mixin[label]()
        }
        this[label]
      })
    }

    this.emit('onInit')
  }

  _initMixins(){
    this.mixins = {}
    if(!this.options.hasOwnProperty('mixins'))
      this.options.mixins = this.defaults.mixins || {}

    const mixins = this.options.mixins
    for(let mixin of mixins){
      let instance = mixin(this)
      instance.onCreate(this)
      this.mixins[instance.name] = instance
    }
  }

  _initData(){
    this.options.selectors = this.options.hasOwnProperty('selectors')
      ? Object.assign({}, this.defaults.selectors || {}, this.options.selectors)
      : this.defaults.selectors || {}

    this.options.selectors.hasOwnProperty('el')
      ? undefined
      : this.options.selectors.el = this.options.selector || this.defaults.selectors.el || this.defaults.selector

    if(!this.options.selectors.hasOwnProperty('el') )
      throw new Error(`${this.constructor.name} object has no valid selector. Selector must be passed in, overridden in the options, and/or overriden in the defaults`)

    return this.options
  }

  cacheDOM(selectors){
    /* #######################
      Procedure
    ####################### */

    const root = this['$el'] = $(selectors.el)
    const hasTemplate = !Types.isEmpty(this.options.template)
    const rootIsValid = !Types.isEmptyJQuery(root)
    if(rootIsValid){
      if(hasTemplate){
        const $template = $(this.options.template)
        if(!Types.isEmptyJQuery($template)){
          this.$template = $template
        }
        this.addListener('attach', function(){
          cacheDOMElements.apply(this, [selectors])
        })

      } else {
        cacheDOMElements.apply(this, [selectors])
        this.emit('attach')
      }
    } else {
      console.warn(`${this.constructor.name} object's container selector '${selectors.el}' returned no valid elements. Element is most likely missing from the DOM.`)
    }

    /* #######################
      Local Functions
    ####################### */

    function cacheDOMElements(selectors){
      for(let key in selectors){
        cacheDOMElementByKey.apply(this, [key])
      }
    }


    function cacheDOMElementByKey(key){
      if(key == 'el') return

      let selector = selectors[key]
      let $element = $(selector)
      if(!Types.isEmptyJQuery($element)){
        this[`$${key}`] = $element
      } else {
        console.warn(`${this.constructor.name} object's selector '${selector}' returned no valid elements. Element is most likely missing from the Component.`)
      }
    }
  }

  render(){
    if(this.hasOwnProperty('$template')){
      if(!Types.isEmptyJQuery(this.$template)){
        this.$el.html(this.$template.html())
        this.emit('render')
      } else {
        console.warn(`Could not render ${this.constructor.name} Component. Template selector '${this.options.template}' returned no valid elements. Template is most likely missing from the DOM or not imported.`)
      }
    }
  }
}

class MessengerComponent extends Component {
  constructor(...args){
    super(...args)
  }

  static getIndexGenerator(instance){
    return function*(instance, start = 0){
      let i = start
      do {
        yield instance.messages[i++]
      } while (i < instance.messages.length)
    }
  }

  _setDefaults(){
    this.defaults = {
      selector: `*[data-module='Messenger']`
    }
  }

  _handleArgs(...args){
    // Handle: args.length == 1
    function handleSingleArg(arg){
      switch(Types.asString(arg)) {
        case 'string':
          handleSingleSelector.apply(this, [arg])
          handleMessages.apply(this, '')
        break
        case 'object':
          handleMultipleSelectors.apply(this, [arg])
          handleMessages.apply(this, [])
        break
        case 'array':
          handleMessages.apply(this, [arg])
          handleSingleSelector.apply(this, [])
        default: {
          throw new Error(`Single argument passed into 'Component', is not a valid type (string, object).`)
        }
      }
    }

    // Handle: args.length == 1 && args[0] is a 'string'
    function handleSingleSelector(selector){
      this.options.selector = Types.isEmpty(selector)
        ? this.defaults.selector
        : selector
    }

    // Handle: args.length == 1 && args[0] is an 'object'
    function handleMultipleSelectors(selectors){
      Types.isEmpty(selectors)
        ? this.options.selector = this.defaults.selector
        : this.options.selectors = selectors
    }

    function handleMessages(messages){
      this.options.messages = Types.isEmpty(messages) ? messages : []
    }

    // Argument Reducer
    switch (args.length) {
      case 1: {
        handleSingleArg.apply(this, [args[0]])
      } break
      default: {
        handleMessages.apply(this, [])
        handleSingleSelector.apply(this, [])
      }
    }

    Types.isEmpty(this.messages)
      ? console.warn(`A 'MessageComponent' was instantiated without any messages. Make sure to use the 'MessageComponent.add' method to add some.`)
      : undefined

  }

  _initData(data){
    super._initData(data)
    this.messages = data.messages
    this.remaining = this.messages.length
    this.resets = 0
    this.generator = MessengerComponent.getIndexGenerator(this)
    this.hasMore = true
  }
}

window.Component = Component
window.MessengerComponent = MessengerComponent

export default Component
