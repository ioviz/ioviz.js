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
      DEFAULT =
        WIDTH:  640
        HEIGHT: 480
      Object.freeze(DEFAULT)

      tagName: "div"

      initialize: (options)->
        @width   = options.width  || DEFAULT.WIDTH
        @height  = options.height || DEFAULT.HEIGHT

        @initFrame()
        @initSvg()
        @initSourceNodes()
        @initSourceEdges()
        @initLayout()
        @initEdges()
        @initNodes()

      initFrame: ->
        @$el
          .css "position", "relative"
          .css "width", "#{@width}px"
          .css "height", "#{@height}px"

      initNodes: ->
        @nodes = @svg
          .selectAll '.node'
          .data @srcNodes

        drag = @layout
          .drag()
          .on "dragstart", (d)->
            d3.select(@).classed("fixed", d.fixed = true)

        @nodes
          .enter()
          .append "circle"
          .attr "class", "node"
          .attr "id", (d)-> "node-#{d.name}"
          .attr "cx", (d)-> d.x
          .attr "cy", (d)-> d.y
          .attr "r", 12
          .on "dblclick", (d)-> d3.select(@).classed("fixed", d.fixed = false)
          .call drag

        @nodes
          .exit()
          .remove()

      initEdges: ->
        @edges = @svg
          .selectAll '.edge'
          .data @srcEdges, (d)-> "#{Math.min(d.source.name, d.target.name)}-#{Math.max(d.source.name, d.target.name)}"

        @edges
          .enter()
          .insert "line"
          .attr "id", (d)-> "edge-#{Math.min(d.source.name, d.target.name)}-#{Math.max(d.source.name, d.target.name)}"
          .attr "class", "edge"
          .attr "x1", (d)-> d.source.x
          .attr "y1", (d)-> d.source.y
          .attr "x2", (d)-> d.target.x
          .attr "y2", (d)-> d.target.y

      initLayout: ->
        @layout = d3.layout
          .force()
          .nodes @srcNodes
          .links @srcEdges
          .size [@width, @height]
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
              .attr "cx", (d)-> d.x
              .attr "cy", (d)-> d.y

      initSourceEdges: ->
        modelEdges = @model.getEdges()
        @srcEdges = []
        @model.repeatNumVertices (i)=>
          _(modelEdges[i]).each (edge)=>
            if @model.isZeroIndexed()
              sourceNodeId = edge.from
            else
              sourceNodeId = edge.from - 1

            if @model.isZeroIndexed()
              targetNodeId = edge.to
            else
              targetNodeId = edge.to - 1
            @srcEdges.push(
              source: sourceNodeId
              target: targetNodeId
            )

      initSourceNodes: ->
        @srcNodes = []
        @model.repeatNumVertices (i)=>
          @srcNodes.push(
            name: "#{i}"
            x: 300
            y: 300
          )

      initSvg: ->
        @svg = d3
          .select(@el)
          .append("svg")
          .attr "width", "100%"
          .attr "height", "100%"
          .style "position", "absolute"

      render: ->
        @layout.start()
        return @
)
