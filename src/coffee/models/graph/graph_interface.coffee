define(
  [
    "backbone"
    "app/utils/*"
  ]
  (
    Backbone
    Utils
  )->
    class GraphInterface extends Backbone.Model
      add_edge: (new_edge)->
        throw Utils::Errors::NOT_IMPLEMENT
)
