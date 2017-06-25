import SObject from 'Classes/Core/SObject'
import Utils from 'Classes/Utils/Types'

class MixableObject extends SObject {
  constructor(...args){
    super(...args)
    this.initMixins()
    this.createMixins()
  }
  addMixin(mixin){
    /* Add new mixin to mixins*/
    this.mixins[mixin.name] = mixin
  }
  addAllMixins(mixins){
    /* Append new mixins to defaults */
    this.mixins = Object.assign({}, mixins, this.mixins)
  }
  initMixins(){
    /* This is where you would initialize new mixins */
    this.mixins = {}
  }
  createMixins(){
    const iterator = SObject.GetObjectIterator()
    for(let [key, mixin] of iterator(this.mixins)){
        let instance = mixin(this)
        instance.onCreate(this)
        console.log(key)
        this.mixins[instance.name] = instance
    }
  }
}

export default MixableObject