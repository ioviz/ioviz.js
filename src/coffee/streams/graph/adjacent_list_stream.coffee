define(
  [
    "app/models/graph/adjacent_list"
    "app/streams/base/*"
  ]
  (
    AdjacentList
    Base
  )->
    class AdjacentListStream extends Base::ReadableStream
)
