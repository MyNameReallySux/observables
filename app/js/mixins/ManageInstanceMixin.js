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
      Class.addInstance(this.instance)
    },
    onDestroy(){
      Class.removeInstance(this.instance)
    }
  }
}

export default ManageInstanceMixin