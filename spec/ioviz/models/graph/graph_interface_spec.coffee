describe "GraphInterface", ->

  load_modules(
    "ioviz/models/graph/graph_interface"
    "ioviz/utils/errors"
  )

  context "create instance", ->

    before ->
      @instance = new GraphInterface

    it "is not implemented #addEdge()", ->
      expect(
        =>
          @instance.addEdge(
            from: 1
            to: 2
          )
      ).to.throw Errors::NOT_IMPLEMENT

