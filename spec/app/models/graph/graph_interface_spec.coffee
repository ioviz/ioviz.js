describe "GraphInterface", ->

  load_modules(
    "app/models/graph/*"
    "app/utils/*"
  )

  context "create instance", ->

    before ->
      @instance = new Graph::GraphInterface

    it "is not implemented #add_edge()", ->
      expect(
        =>
          @instance.add_edge(
            from: 1
            to: 2
          )
      ).to.throw Utils::Errors::NOT_IMPLEMENT

