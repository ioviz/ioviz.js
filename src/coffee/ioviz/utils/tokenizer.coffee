define(
  [
  ]
  (
  )->
    class Tokenizer
      constructor: (text)->
        @tokens = text.split(/\b\s+/)

      nextInt: ->
        parseInt @tokens.shift(), 10
)
