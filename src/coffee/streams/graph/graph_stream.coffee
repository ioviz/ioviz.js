define(
  [
    "app/streams/base/stream_base"
  ]
  (
    StreamBase
  )->
    class GraphStream extends StreamBase

      @numVertices: (options)->
        new class NumVertices extends GraphStream
          onData: (tokenizer, graph)->
            graph.setNumVertices tokenizer.nextInt()
            @flow "data", tokenizer, graph

      @numEdges: (options)->
        new class NumEdges extends GraphStream
          onData: (tokenizer, graph)->
            graph.setNumEdges tokenizer.nextInt()
            @flow "data", tokenizer, graph

      @edges: (options)->
        new class Edges extends GraphStream
          onData: (tokenizer, graph)->
            graph.forNumEdges ->
              edge = {}
              edge.from = tokenizer.nextInt()
              edge.to = tokenizer.nextInt()
              graph.addEdge edge
            @flow "data", tokenizer, graph

      @directed: (flag)->
        new class GetNumVertices extends GraphStream
          onData: (tokenizer, graph)->
            graph.setDirectedFlag(flag)
            @flow "data", tokenizer, graph

)
