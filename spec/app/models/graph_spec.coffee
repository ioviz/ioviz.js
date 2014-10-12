describe "Graph", ->
  load_modules(
    "app/models/graph"
  )

  context "create instance", ->
    before ->
      @instance = new Graph

    it "have #add_edge()", ->
      lambda = ->
        @instance.add_edge(
          from: 1
          to: 2
        )
      expect(lambda).to.throw "not implement"


