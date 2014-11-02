describe "GraphView", ->

  load_modules(
    "ioviz/views/graph_view"
    "ioviz/models/graph/adjacent_list"
  )

  context "create graph", ->

    before ->
      @graph = new AdjacentList
      @graph.setNumVertices 3
      @graph.setZeroIndexedFlag true
      @graph.setNumEdges 2
      @graph.addEdge {from: 0, to: 1}
      @graph.addEdge {from: 1, to: 2}

    context "create instance", ->

      before ->
        @instance = new GraphView(
          model: @graph
        )

      context "call render", ->

        before ->
          @instance.render()

        context "find svg", ->

          before ->
            @svg = @instance.$el.find("svg")

          it "has one svg element", ->
            expect(@svg.size()).to.eq 1

          context "find lines", ->

            before ->
              @lines = @svg.find("line")

            it "has two line", ->
              expect(@lines.length).to.eq 2

