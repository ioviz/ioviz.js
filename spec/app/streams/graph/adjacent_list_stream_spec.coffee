describe "AdjacentListStream", ->

  load_modules(
    "app/streams/graph/graph_stream"
    "app/streams/graph/adjacent_list_stream"
    "app/streams/base/stream_base"
  )

  context "input indirected graph", ->
    
    before ->
      @input = [
        "3 2" # num-vertices num-edges
        "1 2" # from[0] to[0]
        "2 3" # from[1] to[1]
      ].join("\n")

    it "read as directed graph", (done)->
      AdjacentListStream.src(@input)
        # set config
        .pipe GraphStream.directed(true)

        # read data
        .pipe GraphStream.numVertices()
        .pipe GraphStream.numEdges()
        .pipe GraphStream.edges()

        # check result
        .pipe new class Dummy extends StreamBase
          initialize: =>
            @on "data", (tokenizer, graph)=>
              expect(graph.getNumVertices()).to.eq 3
              expect(graph.getNumEdges()).to.eq 2
              expect(graph.getDirectedFlag()).to.be.true
              expect(graph.hasEdge(1, 2)).to.be.true
              expect(graph.hasEdge(2, 3)).to.be.true
              expect(graph.hasEdge(2, 1)).to.be.false
              expect(graph.hasEdge(3, 2)).to.be.false
              @trigger "end"
              done()

    it "read as in-directed graph", (done)->
      AdjacentListStream.src(@input)
        # set config
        .pipe GraphStream.directed(false)

        # read data
        .pipe GraphStream.numVertices()
        .pipe GraphStream.numEdges()
        .pipe GraphStream.edges()

        # check result
        .pipe new class Dummy extends StreamBase
          initialize: =>
            @on "data", (tokenizer, graph)=>
              expect(graph.getNumVertices()).to.eq 3
              expect(graph.getNumEdges()).to.eq 2
              expect(graph.getDirectedFlag()).to.be.false
              expect(graph.hasEdge(1, 2)).to.be.true
              expect(graph.hasEdge(2, 3)).to.be.true
              expect(graph.hasEdge(2, 1)).to.be.true
              expect(graph.hasEdge(3, 2)).to.be.true
              @trigger "end"
              done()

