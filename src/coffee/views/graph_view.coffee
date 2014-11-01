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

      initialize: (options)->
        width   = options.width || 640
        height  = options.height || 480

        @svg = d3
          .select(@el)
          .append("svg")

        @svg
          .attr "width", "#{width}px"
          .attr "height", "#{height}px"

        nodes = []
        @model.repeatNumVertices (i)=>
          nodes.push(
            name: "#{i}"
            x: 300
            y: 300
          )

        modelEdges = @model.getEdges()
        edges = []
        @model.repeatNumVertices (i)=>
          _(modelEdges[i]).each (edge)=>
            edges.push(
              source: edge.from - 1
              target: edge.to - 1
            )

        @layout = d3.layout
          .force()
          .nodes nodes
          .links edges
          .size [width, height]
          .linkDistance 40
          .chargeDistance -400
          .start()
        
        @layout
          .on "tick", =>
            @edges
              .attr "x1", (d)-> d.source.x
              .attr "y1", (d)-> d.source.y
              .attr "x2", (d)-> d.target.x
              .attr "y2", (d)-> d.target.y

            @nodes
              .attr "x", (d)-> d.x
              .attr "y", (d)-> d.y
              .attr "transform", (d)-> "translate(#{d.x},#{d.y})"

        @edges = @svg
          .selectAll '.edge'
          .data edges, (d)-> "#{d.source.name}-#{d.target.name}"

        @edges
          .enter()
          .insert "line"
          .attr "id", (d)-> "edge-#{d.source.name}-#{d.target.name}"
          .attr "class", "edge"
          .attr "x1", (d)-> d.source.x
          .attr "y1", (d)-> d.source.y
          .attr "x2", (d)-> d.target.x
          .attr "y2", (d)-> d.target.y

        @nodes = @svg
          .selectAll '.node'
          .data nodes

        drag = @layout
          .drag()
          .on "dragstart", (d)->
            d3.select(@).classed("fixed", d.fixed = true)

        @nodes
          .enter()
          .append "circle"
          .attr "class", "node"
          .attr "id", (d)-> "node-#{d.name}"
          .attr "x", (d)-> d.x
          .attr "y", (d)-> d.y
          .attr "r", 12
          .attr "transform", (d)-> "translate(#{d.x},#{d.y})"
          .on "dblclick", (d)-> d3.select(@).classed("fixed", d.fixed = false)
          .call drag

        @nodes
          .exit()
          .remove()

      Render: ->
        return @
)
