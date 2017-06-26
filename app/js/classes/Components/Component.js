//import 'babel-polyfill'
//import $ from 'jquery'
//
//import SObject from 'Classes/Core/SObject'
//import LifeCycleObject from 'Classes/Core/LifeCycleObject'
//import Types from 'Classes/Utils/Types'
//
//window.Types = Types
//window.$ = $
//
//class Component extends LifeCycleObject {
//  constructor(...args){
//    super(...args)
//
//    const data = this._initData()
//    const mixins = this._initMixins()
//    this._bindEvents()
//
//    this.cacheDOM(data.selectors)
//    this.render()
//  }
//
//  onCreate(){
//    console.log(`${this.constructor.name}: onCreate`)
//  }
//  
//  setDefaults(){
//    super.setDefaults()
//    this.options = Object.assign({}, {
//      selector: "*[data-module]",
//      template: undefined,
//      mixins: []
//    }, this.options);
//  }
//
//  handleData(...args){
//    super.handleData(args)
//    
//    /* #######################
//      Procedure
//    ####################### */
//
//    switch (args.length) {
//      case 1: handleSingleArg.apply(this, [args[0]])
//      break
//      case 2: handleTwoArgs.apply(this, [args[0], args[1]])
//      break
//      case 3: handleThreeArgs.apply(this, [args[0], args[1], args[2]])
//      break
//      default: this.options.selector = this.defaults.selector
//    }
//
//    /* #######################
//      Local Functions
//    ####################### */
//    
//    function handleSelectorString(selector){
//      const options = { 
//        selector: selector,
//        selectors: {
//          el: selector
//        }
//      }
//      handleOptionsObject.apply(this, options)
//    }
//    
//    function handleOptionsObject(options){
//      if(!options.hasOwnProperty('selectors')        
//        && !options.selectors.hasOwnProperty('el')
//        && !options.hasOwnProperty('selector')){
//        options.selectors = this.defaults.selectors
//      } else if (!options.hasOwnProperty('selectors')
//                && !options.selectors.hasOwnProperty('el')
//                && options.hasOwnProperty('selector')){
//        options.selectors = this.defaults.selectors
//        options.selectors.el = this.defaults.selector
//      } else {
//        options.selectors = this.defaults.selectors
//      }
//      this.options = Object.assign({}, this.defaults, this.options)
//    }
//
//    /* #######################
//      Single Argument
//
//      Component(selector | options)
//
//      ------------------------
//
//      String: selector
//      * Selector of Component, should return 1 jQuery element, but doesn't have to.
//
//      Object: options
//      * Options object, see object documentation for more information.
//    ####################### */
//
//    function handleSingleArg(arg){
//      switch(Types.asString(arg)) {
//        // String: selector
//        case 'string': {
//          this.options.selectors = this.options.selectors || {}
//          this.options.selectors.el = !Types.isEmpty(arg) ? arg : this.defaults.selector
//        }
//        break
//        // Object: options
//        case 'object': {
//          this.options = arg
//        }
//        break
//        default: {
//          throw new Error(`Single argument passed into 'Component', is not a valid type (string, object).`)
//        }
//      }
//    }
//
//    /* #######################
//      Two Arguments
//
//      Component(selector | selectors, options)
//
//      ------------------------
//
//      String: selector
//      * Selector of Component, should return 1 jQuery element, but doesn't have to.
//
//      Object: selectors
//      * Selectors of Component, must have an 'el' property. Other selectors are determined by Component.
//
//      ------------------------
//
//      Object: options
//      * Options object, see object documentation for more information.
//    ####################### */
//
//    function handleTwoArgs(arg1, arg2){
//      handleTwoArgsFirstArg.apply(this, [arg1])
//      handleTwoArgsSecondArg.apply(this, [arg2])
//    }
//
//    function handleTwoArgsFirstArg(arg){
//      switch(Types.asString(arg)) {
//        // String: selector
//        case 'string': {
//          this.options.selectors = this.options.selectors || {}
//          this.options.selectors.el = !Types.isEmpty(arg) ? arg : this.defaults.selector
//        }
//        break
//        // Object: selectors
//        case 'object': {
//          this.options.selectors = arg
//        }
//        break
//        default: {
//          throw new Error(`First argument passed into ${this.constructor.name} is not a valid type (string, object).`)
//        }
//      }
//    }
//
//    function handleTwoArgsSecondArg(arg){
//      switch(Types.asString(arg)) {
//        // String: template
//        case 'string': {
//          this.options.template = !Types.isEmpty(arg) ? arg : this.defaults.template
//        }
//        break
//        // Object: options
//        case 'object': {
//          if(!Types.isEmpty(this.options.selector)
//            && !Types.isEmpty(arg.selector)
//            || !Types.isEmpty(this.options.selector)
//            && arg.hasOwnProperty('selectors')
//            && arg.selectors.hasOwnProperty('el'))
//            console.warn(`${this.constructor.name} object's selector was set multiple times. This may cause unexpected results.`)
//          this.options = Object.assign({}, this.options, arg)
//        }
//        break
//        default: {
//          throw new Error(`Second argument passed into ${this.constructor.name} is not a valid type (object).`)
//        }
//      }
//    }
//
//    /* #######################
//      Three Arguments
//
//      Component(selector | selectors, template | templateOptions, options)
//
//      ------------------------
//
//      String: selector
//      * Selector of Component, should return 1 jQuery element, but doesn't have to.
//
//      Object: selectors
//      * Selectors of Component, must have an 'el' property. Other selectors are determined by Component.
//
//      ------------------------
//
//      Object: template
//      * Selector of template, should return 1 jQuery element, and element should be an HTML5 template, or a script tag.
//
//      ------------------------
//
//      Object: options
//      * Options object, see object documentation for more information.
//    ####################### */
//
//    function handleThreeArgs(arg1, arg2, arg3){
//      handleThreeArgsFirstArg.apply(this, [arg1])
//      handleThreeArgsSecondArg.apply(this, [arg2])
//      handleThreeArgsThirdArg.apply(this, [arg3])
//    }
//
//    function handleThreeArgsFirstArg(arg){
//      switch(Types.asString(arg)) {
//        // String: selector
//        case 'string': {
//          this.options.selector = !Types.isEmpty(arg) ? arg : this.defaults.selector
//        }
//        break
//        // Object: selectors
//        case 'object': {
//          this.options.selectors = !Types.isEmpty(arg) ? arg : this.defaults.selector
//        }
//        break
//        default: {
//          throw new Error(`First argument passed into ${this.constructor.name} is not a valid type (string, object).`)
//        }
//      }
//    }
//
//    function handleThreeArgsSecondArg(arg){
//      switch(Types.asString(arg)) {
//        // String: template
//        case 'string': {
//          this.options.template = !Types.isEmpty(arg) ? arg : this.defaults.template
//        }
//        break
//        // Object: templateOptions
//        case 'object': {
//          this.options.template = !Types.isEmpty(arg) ? arg : this.defaults.template
//        }
//        break
//        default: {
//          throw new Error(`First argument passed into ${this.constructor.name} is not a valid type (string, object).`)
//        }
//      }
//    }
//
//    function handleThreeArgsThirdArg(arg){
//      switch(Types.asString(arg)) {
//        // String: template
//        case 'string': {
//          this.options.template = !Types.isEmpty(arg) ? arg : this.defaults.template
//        }
//        break
//        // Object: options
//        case 'object': {
//          if(!Types.isEmpty(this.options.selector)
//            && !Types.isEmpty(arg.selector)
//            || !Types.isEmpty(this.options.selector)
//            && arg.hasOwnProperty('selectors')
//            && arg.selectors.hasOwnProperty('el'))
//            console.warn(`${this.constructor.name} object's selector was set multiple times. This may cause unexpected results.`)
//          this.options = Object.assign({}, this.options, arg)
//        }
//        break
//        default: {
//          throw new Error(`Second argument passed into ${this.constructor.name} is not a valid type (object).`)
//        }
//      }
//    }
//  }
//
//  _bindEvents(){
//    const iterator = SObject.GetObjectIterator()
//    
//    for(let [event, methods] of iterator(this._lifeCycleEvents)){      
//      if(!Types.isArray(methods)) methods = [methods];
//      
//      for(let method of methods){
//        this.addListener(event, ()=>{
//          console.log(`${this.constructor.name}: ${method} running.`)
//
//          for(let mixin of iterator(this.mixins)){
//            if(mixin.hasOwnProperty(event)) {
//              mixin[event]
//            }
//          }
//
//          this[method]()
//        })
//      }
//    }
//  }
//
//  _initMixins(){
//    if(!this.options.hasOwnProperty('mixins'))
//      this.options.mixins = this.defaults.mixins || {}
//
//    const mixins = this.options.mixins
//    
////    this.mixins = {}
////    if(!this.options.hasOwnProperty('mixins'))
////      this.options.mixins = this.defaults.mixins || {}
////
////    const mixins = this.options.mixins
////    for(let mixin of mixins){
////      let instance = mixin(this)
////      instance.onCreate(this)
////      this.mixins[instance.name] = instance
////    }
//  }
//
//  _initData(){
//    this.options.selectors = this.options.hasOwnProperty('selectors')
//      ? Object.assign({}, this.defaults.selectors || {}, this.options.selectors)
//      : this.defaults.selectors || {}
//
//    this.options.selectors.hasOwnProperty('el')
//      ? undefined
//      : this.options.selectors.el = this.options.selector || this.defaults.selectors.el || this.defaults.selector
//
//    if(!this.options.selectors.hasOwnProperty('el') )
//      throw new Error(`${this.constructor.name} object has no valid selector. Selector must be passed in, overridden in the options, and/or overriden in the defaults`)
//
//    return this.options
//  }
//
//  cacheDOM(selectors){
//    /* #######################
//      Procedure
//    ####################### */
//
//    const root = this['$el'] = $(selectors.el)
//    const hasTemplate = !Types.isEmpty(this.options.template)
//    const rootIsValid = !Types.isEmptyJQuery(root)
//    if(rootIsValid){
//      if(hasTemplate){
//        const $template = $(this.options.template)
//        if(!Types.isEmptyJQuery($template)){
//          this.$template = $template
//        }
//        this.addListener('attach', function(){
//          cacheDOMElements.apply(this, [selectors])
//        })
//
//      } else {
//        cacheDOMElements.apply(this, [selectors])
//        this.emit('attach')
//      }
//    } else {
//      console.warn(`${this.constructor.name} object's container selector '${selectors.el}' returned no valid elements. Element is most likely missing from the DOM.`)
//    }
//
//    /* #######################
//      Local Functions
//    ####################### */
//
//    function cacheDOMElements(selectors){
//      for(let key in selectors){
//        cacheDOMElementByKey.apply(this, [key])
//      }
//    }
//
//
//    function cacheDOMElementByKey(key){
//      if(key == 'el') return
//
//      let selector = selectors[key]
//      let $element = $(selector)
//      if(!Types.isEmptyJQuery($element)){
//        this[`$${key}`] = $element
//      } else {
//        console.warn(`${this.constructor.name} object's selector '${selector}' returned no valid elements. Element is most likely missing from the Component.`)
//      }
//    }
//  }
//
//  render(){
//    if(this.hasOwnProperty('$template')){
//      if(!Types.isEmptyJQuery(this.$template)){
//        this.$el.html(this.$template.html())
//        this.emit('render')
//      } else {
//        console.warn(`Could not render ${this.constructor.name} Component. Template selector '${this.options.template}' returned no valid elements. Template is most likely missing from the DOM or not imported.`)
//      }
//    }
//  }
//}
//
//class MessengerComponent extends Component {
//  constructor(...args){
//    super(...args)
//  }
//
//  static getIndexGenerator(instance){
//    return function*(instance, start = 0){
//      let i = start
//      do {
//        yield instance.messages[i++]
//      } while (i < instance.messages.length)
//    }
//  }
//
//  _setDefaults(){
//    this.defaults = {
//      selector: `*[data-module='Messenger']`
//    }
//  }
//
//  _handleArgs(...args){
//    // Handle: args.length == 1
//    function handleSingleArg(arg){
//      switch(Types.asString(arg)) {
//        case 'string':
//          handleSingleSelector.apply(this, [arg])
//          handleMessages.apply(this, '')
//        break
//        case 'object':
//          handleMultipleSelectors.apply(this, [arg])
//          handleMessages.apply(this, [])
//        break
//        case 'array':
//          handleMessages.apply(this, [arg])
//          handleSingleSelector.apply(this, [])
//        default: {
//          throw new Error(`Single argument passed into 'Component', is not a valid type (string, object).`)
//        }
//      }
//    }
//
//    // Handle: args.length == 1 && args[0] is a 'string'
//    function handleSingleSelector(selector){
//      this.options.selector = Types.isEmpty(selector)
//        ? this.defaults.selector
//        : selector
//    }
//
//    // Handle: args.length == 1 && args[0] is an 'object'
//    function handleMultipleSelectors(selectors){
//      Types.isEmpty(selectors)
//        ? this.options.selector = this.defaults.selector
//        : this.options.selectors = selectors
//    }
//
//    function handleMessages(messages){
//      this.options.messages = Types.isEmpty(messages) ? messages : []
//    }
//
//    // Argument Reducer
//    switch (args.length) {
//      case 1: {
//        handleSingleArg.apply(this, [args[0]])
//      } break
//      default: {
//        handleMessages.apply(this, [])
//        handleSingleSelector.apply(this, [])
//      }
//    }
//
//    Types.isEmpty(this.messages)
//      ? console.warn(`A 'MessageComponent' was instantiated without any messages. Make sure to use the 'MessageComponent.add' method to add some.`)
//      : undefined
//
//  }
//
//  _initData(data){
//    super._initData(data)
//    this.messages = data.messages
//    this.remaining = this.messages.length
//    this.resets = 0
//    this.generator = MessengerComponent.getIndexGenerator(this)
//    this.hasMore = true
//  }
//}
//
//window.Component = Component
//window.MessengerComponent = MessengerComponent
//
//export default Component
