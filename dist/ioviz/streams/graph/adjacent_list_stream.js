(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["ioviz/streams/base/stream_base", "ioviz/models/graph/adjacent_list", "ioviz/utils/tokenizer", "ioviz/utils/next_tick"], function(StreamBase, AdjacentList, Tokenizer, nextTick) {
    var AdjacentListStream;
    return AdjacentListStream = (function(_super) {
      __extends(AdjacentListStream, _super);

      function AdjacentListStream() {
        return AdjacentListStream.__super__.constructor.apply(this, arguments);
      }

      AdjacentListStream.src = function(input) {
        var stream;
        stream = new AdjacentListStream;
        nextTick(function() {
          return stream.flow("data", new Tokenizer(input), new AdjacentList);
        });
        return stream;
      };

      return AdjacentListStream;

    })(StreamBase);
  });

}).call(this);
