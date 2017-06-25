function EventEmitterMixin(instance){
  return {
    name: "EventEmitterMixin",
    instance: instance,
    onCreate(){
      this.instance.listeners = new Map()

      this.instance.addListener = (label, callback) => {
        this.instance.listeners.has(label) || this.instance.listeners.set(label, [])
        this.instance.listeners.get(label).push(callback)
      }

      this.instance.removeListener = (label, callback) => {
        let listeners = this.instance.listeners.get(label), index = 0

        if(listeners && listeners.length){
          index = listeners.reduce((i, listener, index) => {
            return Types.isFunction(listener) && listener === callback ? i = index : i
          }, -1)

          if(index > -1){
            listeners.splice(index, 1)
            this.instance.listeners.set(label, listeners)
            return true
          }
        }
        return false
      }
      this.instance.emit = (label, ...args) => {
        let listeners = this.instance.listeners.get(label)
        if(listeners && listeners.length){
          listeners.forEach((listener) => {
            listener.apply(this.instance, [args])
          })
          return true
        }
        return false
      }

    }
  }
}

export default EventEmitterMixin
