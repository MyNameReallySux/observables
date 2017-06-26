//import Types from 'Classes/Utils/Types'
//
//function Mixin(...bases){
//  return extendClasses(bases);
//}
//
//function extendObjects(bases){
//  let result = {}
//  console.log(bases[0])
//  if(bases.length == 1) return bases[0]
//  for(let i = 1; i < bases.length; i++){
//    for(prop in bases[i]){
//      if(bases[0][prop] === bases[i][prop]){
//        throw new Error(`Ambiguous property: ${prop}`)
//      }
//    }
//    result = Object.assign(bases[0], bases[i])
//  }
//  return result
//}
//
//function extendClasses(bases){
//  class Mixed {}
//
//  Mixed.prototype = extendObjects(bases.map(base => base.prototype))
//
//  return Mixed
//}
//
//export default Mixin
