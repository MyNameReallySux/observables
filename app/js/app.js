/* ##########################
  Imports
########################## */

import 'babel-polyfill'
import $ from 'jquery'

import EventEmitter from 'Classes/EventEmitter'
import SObject from 'Classes/Core/SObject'
import Component from 'Classes/Components/Component'

/* ##########################
  Global Variables
########################## */

let messenger, $sendButton, $addButton, $queue, $resets
window.demos = {}

/* ##########################
  Global Functions
########################## */

const nextMessage = function*(messenger, start = 0){
    let i = start
    do {
      yield messenger.messages[i++]
    } while (i < messenger.messages.length)
}

/* ##########################
  Class Definitions
########################## */

class Messenger {
  constructor(messages){
    if(!Array.isArray(messages)) {
      messages = [messages]
    }
    this.messages = messages
    this.remaining = this.messages.length
    this.resets = 0
    this.generator = nextMessage(this, 0)

    this.hasMore = true
  }
  send(){
    if(this.hasMore){
      const result = this.generator.next()
      const message = result.value
      this.hasMore = !result.done

      if(message != undefined){
        const $button = $('*[data-messenger]')
        const $target = $($button.attr('data-target'))
        $target.text($target.text() + " " + message)
        this.remaining--
      } else {
        alert("No more messages!")
      }
    } else {
      alert("No more messages!")
    }
  }
  add(message){
    this.messages.push(message)
    if(this.hasMore == false){
      this.generator = nextMessage(this, this.messages.length - 1)
      this.resets++
      this.hasMore = true
    }
  }
}

/* ##########################
  Procedure
########################## */

$(document).ready(function(){
  // initMessengerDemo()

  // window.demos.messenger = new Component('#MessagingComponent', '#MessagingTemplate')

  // EventEmitter._initStatic()

//  $('a[data-event]').each(function(){
//    const data = $(this).attr('data-event')
//    const [selector, label] = [data.split('/')]
//    const target = $(selector)
//    if(!Types.isEmptyJQuery(target)) {
//
//    }
//
//  })
  
  let test = new SObject();
  window.test = test

})

/* ##########################
  initMessengerDemo
########################## */

function initMessengerDemo(){
  messenger = new Messenger([
    "This is a demo of using an ES6 generator.",
    "The generator is run by an object called 'Messenger' that invokes the generators 'next' function to yield the next sentance.",
    "After yielding, the Messenger class handles the UI updates",
    "The generator is only responsible for incrementing the array index.",
    "The generator function is also resettable.",
    "This occurs when the generator yields an index that is equal to the amount of messages.",
    "Generator instances cannot be reused at this point, so we must re-run the generator function.",
    "The generator is rerun, with an additional parameter, stating what index it should start."
  ])

  $sendButton = $('*[data-messenger]')
  $addButton = $('*[data-add-message]')
  $queue = $('#MessageQueue')
  $resets = $('#MessageResets')

  $queue.text(`There are ${messenger.remaining} messages left!`)
  $resets.text(`Generator has been reset ${messenger.resets} times!`)

  $sendButton.click(function(){
    messenger.send()
    $queue.text(`There are ${messenger.remaining} messages left!`)
  })

  $addButton.click(function(){
    const $input = $($(this).attr('data-source'))
    const value = $input.val().trim()
    if(value != undefined && value != "" && value.length > 0){
      messenger.add(value)
      $input.val("")
      $queue.text(`There are ${++messenger.remaining} messages left!`)
      $resets.text(`Generator has been reset ${messenger.resets} times!`)
    }
  })

  window.demos.messenger = {
    messenger: messenger,
    ui: {
      sendButton: $sendButton,
      addButton: $addButton,
      queue: $queue,
      resets: $resets
    }
  }
}
