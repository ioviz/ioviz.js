define(
  [
    "underscore"
    "backbone"
    "app/utils/errors"
  ]
  (
    _
    Backbone
    Errors
  )->
    class StreamBase

      constructor: ->
        @events = {}
        _(@events).extend Backbone.Events
        @destStream = undefined
        @initialize()

      initialize: ->
        @on "data", =>
          @onData.apply @, arguments

      flow: ->
        if @destStream
          @destStream.trigger.apply @destStream, arguments

      on: ->
        @events.on.apply @, arguments

      trigger: (name)->
        @events.trigger.apply @, arguments

      pipe: (destStream)->
        @destStream = destStream

      @src: ->
        throw Errors::NOT_IMPLEMENT

      @eof: ->
        new class Eof extends StreamBase
          initialize: ->
            @on "data", (a, b)=>
              @trigger "end"
)
