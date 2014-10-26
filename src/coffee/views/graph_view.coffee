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
        @nodes = []
        @model.repeatNumVertices (i)=>
          @nodes.push(
            name: "##{i}"
          )
        @links = []
        @model.repeatNumVertices (i)=>
          _(edges[i]).each (edge)=>
            @links.push(
              source:
                name: edge.from
              target:
                name: edge.to
            )

        @layout = d3.layout
          .force()
          .nodes @nodes
          .links @links
          .size [@width, @height]
          .linkDistance 100
          .chargeDistance 100
          .on "tick", =>
            @svg
              .selectAll 'line'
              .attr "x1", (d)-> d.source.x
              .attr "y1", (d)-> d.source.y
              .attr "x2", (d)-> d.target.x
              .attr "y2", (d)-> d.target.y

        @svg
          .selectAll 'line'
          .data @links, (d)-> "#{d.source.name}-#{d.target.name}"
          .enter()
          .insert 'line', 'circle'

        @svg
          .selectAll 'node'
          .data @nodes
          .enter()
          .append 'node'
          .append 'circle'

        console.log @$el.html()

      render: ->
        @layout.start()
        return @
)
