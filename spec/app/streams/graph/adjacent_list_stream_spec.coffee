describe "AdjacentListStream", ->

  load_modules(
    "app/streams/graph/graph_stream"
    "app/streams/graph/adjacent_list_stream"
    "app/streams/base/stream_base"
  )

  context "input indirected graph", ->
    
    before ->
      @input = [
        "3 2"
        "1 2"
        "2 3"
      ].join("\n")

    it "test", (done)->
      AdjacentListStream.src(@input)
        .pipe AdjacentListStream.directed(false)
        .pipe GraphStream.numVertices()
        .pipe GraphStream.numEdges()
        .pipe GraphStream.edges()
        .pipe new class Dummy extends StreamBase
          initialize: =>
            @on "data", (tokenizer, graph)=>
              expect(graph.getNumVertices()).to.eq 3
              expect(graph.getNumEdges()).to.eq 2
              expect(graph.hasEdge(1, 2)).to.be.ok
              expect(graph.hasEdge(2, 3)).to.be.ok
              expect(graph.hasEdge(2, 1)).to.be.ok
              expect(graph.hasEdge(3, 2)).to.be.ok
              @trigger "end"
              done()

