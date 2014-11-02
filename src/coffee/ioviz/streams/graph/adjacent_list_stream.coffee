define(
  [
    "ioviz/streams/base/stream_base"
    "ioviz/models/graph/adjacent_list"
    "ioviz/utils/tokenizer"
    "ioviz/utils/next_tick"
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
