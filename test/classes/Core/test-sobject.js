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
		
		// LifeCycle Tests
		it("Should contain 'onCreate' method", (done)=>{
			console.log(instance)
			assert.ok(instance.hasOwnProperty('onCreate'))
			done()
		})
		it("Should contain 'onCreate' method", (done)=>{
			console.log(instance)
			assert.ok(instance.hasOwnProperty('onCreate'))
			done()
		})
		
		it("Should contain 'onInit' method", (done)=>{
			assert.ok(instance.hasOwnProperty('onInit'))
			done()
		})
		it("Should contain 'beforeData' method", (done)=>{
			assert.ok(instance.hasOwnProperty('beforeData'))
			done()
		})
		it("Should contain 'afterData' method", (done)=>{
			assert.ok(instance.hasOwnProperty('afterData'))
			done()
		})
		it("Should contain 'onRender' method", (done)=>{
			assert.ok(instance.hasOwnProperty('onRender'))
			done()
		})
		it("Should contain 'onAttach' method", (done)=>{
			assert.ok(instance.hasOwnProperty('onAttach'))
			done()
		})
		it("Should contain 'onDestroy' method", (done)=>{
			assert.ok(instance.hasOwnProperty('onDestroy'))
			done()
		})
	})
})