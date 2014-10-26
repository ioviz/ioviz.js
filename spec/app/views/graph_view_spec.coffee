describe "GraphView", ->

  load_modules(
    "app/views/graph_view"
    "app/models/graph/graph_interface"
  )

  context "create graph", ->

    before ->
      @graph = new GraphInterface

    context "create instance", ->

      before ->
        @instance = new GraphView(
          model: @graph
        )

      it "is instance of GraphView", ->
        expect(@instance).to.instanceof GraphView

