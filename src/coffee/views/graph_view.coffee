define(
  [
    "underscore"
    "backbone"
    "d3"
  ]
  (
    _
    Backbone
    d3
  )->
    class GraphView extends Backbone.View
      tagName: "div"

      initialize: ->
        @svg = d3.select(@el).append("svg")
        edges = @model.getEdges()
        @model.repeatNumEdges (i)->
          _(edges[i]).each (edge)->
            console.log edge

      render: ->
        return @
)
