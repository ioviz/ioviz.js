define(
  [
    "underscore"
    "app/models/graph/graph_interface"
  ]
  (
    _
    GraphInterface
  )->
    class AdjacentList extends GraphInterface

      initialize: ->
        @setEdges {}
        @direction = true

      addEdge: (edge)->
        edges = @getEdges()
        @_addEdge edges, edge
        unless @getDirectedFlag()
          @_addRevEdge edges, edge
        @setEdges edges

      hasEdge: (from, to)->
        _(@getEdges()[from]).some (edge)-> edge.to == to

      # private methods

      _addEdge: (edges, edge)->
        edges[edge.from] ||= []
        edges[edge.from].push edge

      _addRevEdge: (edges, edge)->
        revEdge = _.clone(edge)
        revEdge.to = edge.from
        revEdge.from = edge.to
        edges[revEdge.from] ||= []
        edges[revEdge.from].push revEdge
)
