import SObject from 'Classes/Core/SObject'

function LifeCycleMixin(instance){
  if(!instance.hasOwnProperty('onCreate')) instance.onCreate = function(){ console.log('creating') }

  return {
    name: 'LifeCycleMixin',
    onCreate(){
      instance._lifeCycleEvents = {
        create:   'onCreate',
        init:     'onInit',
        recieve:  ['willReceiveData', 'onReceiveData'],
        update:   ['willUpdate', 'onUpdate'],
        attach:   'onAttach',
        render:   ['willRender', 'onRender'],
        destroy:  'onDestroy'
      }

      if(!instance.hasOwnProperty('events')) instance.events = {}

      const iterator = SObject.GetObjectIterator();
      for(let [event, methods] of iterator(instance._lifeCycleEvents)){
        if(!Types.isArray(methods)) methods = [methods];
        for(let method of methods){
          instance[method] = function(){};
        }
      }
    }
  } 
}

export default LifeCycleMixin