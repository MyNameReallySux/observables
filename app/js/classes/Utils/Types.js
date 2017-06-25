String.prototype.contains = function(test){
  return this.indexOf(test) > 0
}

class Types {
  constructor(){
    this.BOOLEAN = "boolean"
    this.NUMBER = "number"
    this.STRING = "string"
    this.SYMBOL = "symbol"
    this.UNDEFINED = "undefined"
    this.FUNCTION = "function"
  }
  /* ##########################
    Get Type
  ########################## */
  
  /* eslint complexity: ["error", 11] */
  static asString(test){
    if(Types.isUndefined(test)) return 'undefined'
    else if(Types.isNull(test)) return 'null'
    else if(Types.isBoolean(test)) return 'boolean'
    else if(Types.isNumber(test)) return 'number'
    else if(Types.isString(test)) return 'string'
    else if(Types.isSymbol(test)) return 'symbol'
    else if(Types.isArray(test)) return 'array'
    else if(Types.isObject(test)) return 'object'
    else if(Types.isFunction(test)) return 'function'
    else if(Types.isJQuery(test)) return 'jquery'
    else return 'undefined'
  }

  /* ##########################
    Is Type
  ########################## */
  static isBoolean(test) { return typeof test === "boolean" }
  static isNumber(test)  {
    return typeof test === "number" && test !== NaN
  }
  static isString(test)  { return typeof test === "string"  }
  static isSymbol(test)  { return typeof test === "symbol"  }

  static isArray(test) { return Array.isArray(test) }
  static isFunction(test) { return typeof test === 'function' }
  static isObject(test) {
    return test === null ? false : test.constructor.toString().contains("Object")
  }

  static isUndefined(test) { return typeof test === "undefined" }
  static isNull(test) { return test === null }

  static isJQuery(test) {
    let jq = ""
    try {
      jq = jQuery
    } catch (err){
      if(err.name === "ReferenceError") {}
    }
    try {
      jq = $
    } catch (err){
      if(err.name === "ReferenceError") {}
    }

    return test instanceof jq
  }

  /* ##########################
    Is Empty
  ########################## */
  static hasLength(test){
    return test.hasOwnProperty("length")
  }

  static isEmptyString(test, strict = false){
    if(test.length > 0 && strict){
      const replaced = test.replace(/\s+/g,'')
      return replaced.length <= 0
    }
    return true
  }

  static isEmptyArray(test, strict = false, depth = -1){
    if(depth === 0) return test.length <= 0
    else if(depth === -1) depth = Types.MAX_DEPTH
    depth = depth - 1

    if(test.length > 0 && strict){
      for(let element of test){
        if(!Types.isEmpty(element, strict, depth)) return false
      }
    }
    return true
  }

  /* eslint complexity: ["error", 8] */
  static isEmptyObject(test, strict = false, depth = -1){
    if(depth === 0) 
      return !strict
    else if(depth === -1) {
      depth = Types.MAX_DEPTH
      if(depth === 0)
        depth = depth - 1

      for(let key in test) {
        if(test.hasOwnProperty(key) && strict){
          return Types.isEmpty(test[key])
        } else if(test.hasOwnProperty(key)){
          return false
        }
      }
      return true
    }
  }

  static isEmptyJQuery(test){
    return Types.isNumber(test.length) && test.length === 0
  }

  static isEmpty(test, strict = true, depth = -1){
    switch (Types.asString(test)) {
      case 'undefined':
      case 'null':
        return true
      break
      case 'boolean':
      case 'number':
      case 'symbol':
        return false
      break
      case 'string': return Types.isEmptyString(test, strict)
      break
      case 'array': return Types.isEmptyArray(test, strict, depth)
      break
      case 'object': return Types.isEmptyObject(test, strict, depth)
      break
      case 'jquery': return Types.isEmptyJQuery(test)
      break
      default: return Types.isEmptyByProperty(test)
    }
  }
  static isEmptyByProperty(test){
    if(!test.hasOwnProperty("isEmpty")) {
      return false
    }
    return Types.isBoolean(test.isEmpty) && test.isEmpty
  }
}

Types.MAX_DEPTH = 21

window.obj1 = {
  first: null,
  second: "",
  third: []
}

export default Types
