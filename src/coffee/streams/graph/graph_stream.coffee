define(
  [
    "app/streams/base/stream_base"
  ]
  (
    StreamBase
  )->
    class GraphStream extends StreamBase

      @getNumVertices: (options)->
        new class GetNumVertices extends GraphStream
          onData: (tokenizer, graph)->
            graph.setNumVertices tokenizer.nextInt()
            @flow "data", tokenizer, graph

      @getNumEdges: (options)->
        new class GetNumEdges extends GraphStream
          onData: (tokenizer, graph)->
            graph.setNumEdges tokenizer.nextInt()
            @flow "data", tokenizer, graph

      @getEdges: (options)->
        new class GetEdges extends GraphStream
          onData: (tokenizer, graph)->
            graph.forNumEdges ->
              edge = {}
              edge.from = tokenizer.nextInt()
              edge.to = tokenizer.nextInt()
              graph.addEdge edge
            @flow "data", tokenizer, graph

)
