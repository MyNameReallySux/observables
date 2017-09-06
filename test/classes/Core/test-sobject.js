const assert = require('assert')
const TypeUtils = require('@beautiful-code/type-utils').TypeUtils
const SObject = require('../../../app/js/classes/Core/SObject')

const polyfill = require('babel-polyfill')

const methodExists = function(instance, method){
	return Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).indexOf(method) > -1
}

describe("SObject", ()=>{
	describe("#Constructor (no args)", function(){
		let instance
		
		before(function(){
			instance = new SObject()
			
			methodExists(instance, '_handleArgs')
		})
		
		it("Should be instance of 'SObject'", (done)=>{
			assert.ok(instance instanceof SObject)
			done()
		})
	})
})