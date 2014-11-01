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
        zeroIndexedFlag: false

      getNumVertices: ->
        @get "numVertices"

      getNumEdges: ->
        @get "numEdges"

      getDirectedFlag: ->
        @get "directedFlag"

      getZeroIndexedFlag: ->
        @get "zeroIndexed"

      getEdges: ->
        JSON.parse @get("edges")

      setNumVertices: (numVertices)->
        @set "numVertices", numVertices

      setNumEdges: (numEdges)->
        @set "numEdges", numEdges

      setDirectedFlag: (flag)->
        @set "directedFlag", flag

      setZeroIndexedFlag: (flag)->
        @set "zeroIndexed", flag

      setEdges: (edges)->
        @set "edges", JSON.stringify(edges) # TODO: improve

      isZeroIndexed: ->
        @get "zeroIndexed"

      repeatNumEdges: (func)->
        func(i) for i in [0..@getNumEdges() - 1]

      repeatNumVertices: (func)->
        if @getZeroIndexedFlag()
          list = [0..@getNumVertices() - 1]
        else
          list = [1..@getNumVertices()]
        func(i) for i in list

      addEdge: (new_edge)->
        throw Errors::NOT_IMPLEMENT

      hasEdge: (from, to)->
        throw Errors::NOT_IMPLEMENT
)
