requirejs(
  [
    "jquery"
    "app/views/graph_view"
    "app/models/graph/adjacent_list"
  ]
  (
    jQuery
    GraphView
    AdjacentList
  )->
    jQuery ->
      graph = new AdjacentList
      graph.setNumVertices 3
      graph.setNumEdges 2
      graph.addEdge(from: 1, to: 2)
      graph.addEdge(from: 2, to: 3)

      graphView = new GraphView
        model: graph
      $("body").append graphView.render().el
)
