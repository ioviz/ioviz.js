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
        @edges = {}
        @direction = true

      addEdge: (edge)->
        @edges[edge.from] ||= []
        @edges[edge.from].push edge
        unless @direction
          revEdge = _.clone(edge)
          revEdge.to = edge.from
          revEdge.from = edge.to
          @edges[revEdge.from] ||= []
          @edges[revEdge.from].push revEdge

      hasEdge: (from, to)->
        _(@edges[from]).some (edge)-> edge.to == to

      disableDirection: ->
        @direction = false
)
