(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["underscore", "backbone", "d3"], function(_, Backbone, d3) {
    var GraphView;
    return GraphView = (function(_super) {
      var DEFAULT;

      __extends(GraphView, _super);

      function GraphView() {
        return GraphView.__super__.constructor.apply(this, arguments);
      }

      DEFAULT = {
        WIDTH: 640,
        HEIGHT: 480
      };

      Object.freeze(DEFAULT);

      GraphView.prototype.tagName = "div";

      GraphView.prototype.initialize = function(options) {
        this.width = options.width || DEFAULT.WIDTH;
        this.height = options.height || DEFAULT.HEIGHT;
        this.initFrame();
        this.initSvg();
        this.initSourceNodes();
        this.initSourceEdges();
        this.initLayout();
        this.initEdges();
        return this.initNodes();
      };

      GraphView.prototype.initFrame = function() {
        return this.$el.css("position", "relative").css("width", "" + this.width + "px").css("height", "" + this.height + "px");
      };

      GraphView.prototype.initNodes = function() {
        var drag;
        this.nodes = this.svg.selectAll('.node').data(this.srcNodes);
        drag = this.layout.drag().on("dragstart", function(d) {
          return d3.select(this).classed("fixed", d.fixed = true);
        });
        this.nodes.enter().append("circle").attr("class", "node").attr("id", function(d) {
          return "node-" + d.name;
        }).attr("cx", function(d) {
          return d.x;
        }).attr("cy", function(d) {
          return d.y;
        }).attr("r", 12).on("dblclick", function(d) {
          return d3.select(this).classed("fixed", d.fixed = false);
        }).call(drag);
        return this.nodes.exit().remove();
      };

      GraphView.prototype.initEdges = function() {
        this.edges = this.svg.selectAll('.edge').data(this.srcEdges, function(d) {
          return "" + (Math.min(d.source.name, d.target.name)) + "-" + (Math.max(d.source.name, d.target.name));
        });
        return this.edges.enter().insert("line").attr("id", function(d) {
          return "edge-" + (Math.min(d.source.name, d.target.name)) + "-" + (Math.max(d.source.name, d.target.name));
        }).attr("class", "edge").attr("x1", function(d) {
          return d.source.x;
        }).attr("y1", function(d) {
          return d.source.y;
        }).attr("x2", function(d) {
          return d.target.x;
        }).attr("y2", function(d) {
          return d.target.y;
        });
      };

      GraphView.prototype.initLayout = function() {
        this.layout = d3.layout.force().nodes(this.srcNodes).links(this.srcEdges).size([this.width, this.height]).linkDistance(40).chargeDistance(-400).start();
        return this.layout.on("tick", (function(_this) {
          return function() {
            _this.edges.attr("x1", function(d) {
              return d.source.x;
            }).attr("y1", function(d) {
              return d.source.y;
            }).attr("x2", function(d) {
              return d.target.x;
            }).attr("y2", function(d) {
              return d.target.y;
            });
            return _this.nodes.attr("cx", function(d) {
              return d.x;
            }).attr("cy", function(d) {
              return d.y;
            });
          };
        })(this));
      };

      GraphView.prototype.initSourceEdges = function() {
        var modelEdges;
        modelEdges = this.model.getEdges();
        this.srcEdges = [];
        return this.model.repeatNumVertices((function(_this) {
          return function(i) {
            return _(modelEdges[i]).each(function(edge) {
              var sourceNodeId, targetNodeId;
              if (_this.model.isZeroIndexed()) {
                sourceNodeId = edge.from;
              } else {
                sourceNodeId = edge.from - 1;
              }
              if (_this.model.isZeroIndexed()) {
                targetNodeId = edge.to;
              } else {
                targetNodeId = edge.to - 1;
              }
              return _this.srcEdges.push({
                source: sourceNodeId,
                target: targetNodeId
              });
            });
          };
        })(this));
      };

      GraphView.prototype.initSourceNodes = function() {
        this.srcNodes = [];
        return this.model.repeatNumVertices((function(_this) {
          return function(i) {
            return _this.srcNodes.push({
              name: "" + i,
              x: 300,
              y: 300
            });
          };
        })(this));
      };

      GraphView.prototype.initSvg = function() {
        return this.svg = d3.select(this.el).append("svg").attr("width", "100%").attr("height", "100%").style("position", "absolute");
      };

      GraphView.prototype.render = function() {
        this.layout.start();
        return this;
      };

      return GraphView;

    })(Backbone.View);
  });

}).call(this);
