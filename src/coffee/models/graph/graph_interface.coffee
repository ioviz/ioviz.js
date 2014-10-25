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
        directedFlag: false

      getNumVertices: ->
        @get "numVertices"

      getNumEdges: ->
        @get "numEdges"

      getDirectedFlag: ->
        @get "directedFlag"

      setNumVertices: (numVertices)->
        @set "numVertices", numVertices

      setNumEdges: (numEdges)->
        @set "numEdges", numEdges

      setDirectedFlag: (flag)->
        @set "directedFlag", flag

      forNumEdges: (func)->
        for i in [1..@getNumEdges()]
          func(i)

      addEdge: (new_edge)->
        throw Errors::NOT_IMPLEMENT

      hasEdge: (from, to)->
        throw Errors::NOT_IMPLEMENT
)
