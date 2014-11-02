(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["ioviz/streams/base/stream_base"], function(StreamBase) {
    var GraphStream;
    return GraphStream = (function(_super) {
      __extends(GraphStream, _super);

      function GraphStream() {
        return GraphStream.__super__.constructor.apply(this, arguments);
      }

      GraphStream.numVertices = function(options) {
        var NumVertices;
        return new (NumVertices = (function(_super1) {
          __extends(NumVertices, _super1);

          function NumVertices() {
            return NumVertices.__super__.constructor.apply(this, arguments);
          }

          NumVertices.prototype.onData = function(tokenizer, graph) {
            graph.setNumVertices(tokenizer.nextInt());
            return this.flow("data", tokenizer, graph);
          };

          return NumVertices;

        })(GraphStream));
      };

      GraphStream.numEdges = function(options) {
        var NumEdges;
        return new (NumEdges = (function(_super1) {
          __extends(NumEdges, _super1);

          function NumEdges() {
            return NumEdges.__super__.constructor.apply(this, arguments);
          }

          NumEdges.prototype.onData = function(tokenizer, graph) {
            graph.setNumEdges(tokenizer.nextInt());
            return this.flow("data", tokenizer, graph);
          };

          return NumEdges;

        })(GraphStream));
      };

      GraphStream.edges = function(options) {
        var Edges;
        return new (Edges = (function(_super1) {
          __extends(Edges, _super1);

          function Edges() {
            return Edges.__super__.constructor.apply(this, arguments);
          }

          Edges.prototype.onData = function(tokenizer, graph) {
            graph.repeatNumEdges(function() {
              var edge;
              edge = {};
              edge.from = tokenizer.nextInt();
              edge.to = tokenizer.nextInt();
              return graph.addEdge(edge);
            });
            return this.flow("data", tokenizer, graph);
          };

          return Edges;

        })(GraphStream));
      };

      GraphStream.directed = function(flag) {
        var GetNumVertices;
        return new (GetNumVertices = (function(_super1) {
          __extends(GetNumVertices, _super1);

          function GetNumVertices() {
            return GetNumVertices.__super__.constructor.apply(this, arguments);
          }

          GetNumVertices.prototype.onData = function(tokenizer, graph) {
            graph.setDirectedFlag(flag);
            return this.flow("data", tokenizer, graph);
          };

          return GetNumVertices;

        })(GraphStream));
      };

      return GraphStream;

    })(StreamBase);
  });

}).call(this);
