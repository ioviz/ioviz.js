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
      defaults: ->
        numVertices: 0
        numEdges: 0

      getNumVertices: ->
        @get "numVertices"

      getNumEdges: ->
        @get "numEdges"

      setNumVertices: (numVertices)->
        @set "numVertices", numVertices

      setNumEdges: (numEdges)->
        @set "numEdges", numEdges

      forNumEdges: (func)->
        for i in [1..@getNumEdges()]
          func(i)

      addEdge: (new_edge)->
        throw Errors::NOT_IMPLEMENT

      hasEdge: (from, to)->
        throw Errors::NOT_IMPLEMENT
)
