describe "GraphView", ->
  load_modules(
    "app/views/graph_view"
  )

  context "create graph", ->

  context "create instance", ->
    before ->
      @instance = new GraphView

    it "", ->
      console.log @instance.render()

