describe "GraphView", ->

  load_modules(
    "app/views/graph_view"
    "app/models/graph/adjacent_list"
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

          it "has one svg element", ->
            expect(@instance.$el.find("svg").size()).to.eq 1

