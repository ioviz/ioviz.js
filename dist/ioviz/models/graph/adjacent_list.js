(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["underscore", "ioviz/models/graph/graph_interface"], function(_, GraphInterface) {
    var AdjacentList;
    return AdjacentList = (function(_super) {
      __extends(AdjacentList, _super);

      function AdjacentList() {
        return AdjacentList.__super__.constructor.apply(this, arguments);
      }

      AdjacentList.prototype.initialize = function() {
        this.setEdges({});
        return this.direction = true;
      };

      AdjacentList.prototype.addEdge = function(edge) {
        var edges;
        edges = this.getEdges();
        this._addEdge(edges, edge);
        if (!this.getDirectedFlag()) {
          this._addRevEdge(edges, edge);
        }
        return this.setEdges(edges);
      };

      AdjacentList.prototype.hasEdge = function(from, to) {
        return _(this.getEdges()[from]).some(function(edge) {
          return edge.to === to;
        });
      };

      AdjacentList.prototype._addEdge = function(edges, edge) {
        var _name;
        edges[_name = edge.from] || (edges[_name] = []);
        return edges[edge.from].push(edge);
      };

      AdjacentList.prototype._addRevEdge = function(edges, edge) {
        var revEdge, _name;
        revEdge = _.clone(edge);
        revEdge.to = edge.from;
        revEdge.from = edge.to;
        edges[_name = revEdge.from] || (edges[_name] = []);
        return edges[revEdge.from].push(revEdge);
      };

      return AdjacentList;

    })(GraphInterface);
  });

}).call(this);
