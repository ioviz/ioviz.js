define(
  [
    "backbone"
  ]
  (
    Backbone
  )->
    class Graph extends Backbone.Model
      add_edge: (new_edge)->
        throw new Error "not implement"
)
