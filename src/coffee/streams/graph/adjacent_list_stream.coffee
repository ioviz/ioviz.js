define(
  [
    "app/streams/base/stream_base"
    "app/models/graph/adjacent_list"
    "app/utils/tokenizer"
    "app/utils/next_tick"
  ]
  (
    StreamBase
    AdjacentList
    Tokenizer
    nextTick
  )->
    class AdjacentListStream extends StreamBase

      @src: (input)->
        stream = new AdjacentListStream
        nextTick ->
          stream.flow "data", new Tokenizer(input), new AdjacentList
        stream
)
