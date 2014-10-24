define(
  [
    "backbone"
    "app/utils/errors"
  ]
  (
    Backbone
    Errors
  )->
    class GraphInterface extends Backbone.Model
      constructor: ->
        @numVertices = 0
        @numEdges = 0
        @initialize()

      initialize: ->

      setNumVertices: (numVertices)->
        @numVertices = numVertices

      setNumEdges: (numEdges)->
        @numEdges = numEdges

      forNumEdges: (func)->
        for i in [1..@numEdges]
          func(i)

      addEdge: (new_edge)->
        throw Errors::NOT_IMPLEMENT

      hasEdge: (from, to)->
        throw Errors::NOT_IMPLEMENT
)
