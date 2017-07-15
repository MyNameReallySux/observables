const assert = require('assert')
const Types = require('type-utils').default
const SObject = require('../../../app/js/classes/Core/SObject')

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