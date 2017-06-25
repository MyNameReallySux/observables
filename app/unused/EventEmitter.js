class EventEmitter {
  constructor(context){
    this.listeners = new Map()
    this.context = context || this
  }
  static _initStatic(){
    EventEmitter.listeners = new Map()
  }
  static addListener(label, target, callback){
    EventEmitter.listeners.has(label) || EventEmitter.listeners.set(label, [])
    EventEmitter.listeners.get(label).push({target, callback})
  }
  static removeListener(label, element, callback){
    let listeners = EventEmitter.listeners.get(label), index = 0

    if(listeners && listeners.length){
      index = listeners.reduce((i, data, index) => {
        let [target, callback] = data
        return Types.isFunction(listener) && listener === callback
          && target === element ? i = index : i
      }, -1)

      if(index > -1){
        listeners.splice(index, 1)
        EventEmitter.listeners.set(label, listeners)
        return true
      }
    }
    return false
  }
  static emit(label, element, ...args){
    let listeners = EventEmitter.listeners.get(label)
    if(listeners && listeners.length){
      listeners.forEach((data) => {
        let [target, listener] = data
        console.log(`${target}`)
        listener.apply(target, ...args)
      })
      return true
    }
    return false
  }
  addListener(label, callback){
    this.listeners.has(label) || this.listeners.set(label, [])
    this.listeners.get(label).push(callback)
  }
  removeListener(label, callback){
    let listeners = this.listeners.get(label), index = 0

    if(listeners && listeners.length){
      index = listeners.reduce((i, listener, index) => {
        return Types.isFunction(listener) && listener === callback ? i = index : i
      }, -1)

      if(index > -1){
        listeners.splice(index, 1)
        this.listeners.set(label, listeners)
        return true
      }
    }
    return false
  }
  emit(label, ...args){
    let listeners = this.listeners.get(label)
    if(listeners && listeners.length){
      listeners.forEach((listener) => {
        listener.apply(this.context, ...args)
      })
      return true
    }
    return false
  }
}

export default EventEmitter