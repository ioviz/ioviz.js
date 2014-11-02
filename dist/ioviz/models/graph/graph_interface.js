(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["backbone", "ioviz/utils/errors"], function(Backbone, Errors) {
    var GraphInterface;
    return GraphInterface = (function(_super) {
      __extends(GraphInterface, _super);

      function GraphInterface() {
        return GraphInterface.__super__.constructor.apply(this, arguments);
      }

      GraphInterface.prototype.defaults = function() {
        return {
          numVertices: 0,
          numEdges: 0,
          directedFlag: false,
          zeroIndexedFlag: false
        };
      };

      GraphInterface.prototype.getNumVertices = function() {
        return this.get("numVertices");
      };

      GraphInterface.prototype.getNumEdges = function() {
        return this.get("numEdges");
      };

      GraphInterface.prototype.getDirectedFlag = function() {
        return this.get("directedFlag");
      };

      GraphInterface.prototype.getZeroIndexedFlag = function() {
        return this.get("zeroIndexed");
      };

      GraphInterface.prototype.getEdges = function() {
        return JSON.parse(this.get("edges"));
      };

      GraphInterface.prototype.setNumVertices = function(numVertices) {
        return this.set("numVertices", numVertices);
      };

      GraphInterface.prototype.setNumEdges = function(numEdges) {
        return this.set("numEdges", numEdges);
      };

      GraphInterface.prototype.setDirectedFlag = function(flag) {
        return this.set("directedFlag", flag);
      };

      GraphInterface.prototype.setZeroIndexedFlag = function(flag) {
        return this.set("zeroIndexed", flag);
      };

      GraphInterface.prototype.setEdges = function(edges) {
        return this.set("edges", JSON.stringify(edges));
      };

      GraphInterface.prototype.isZeroIndexed = function() {
        return this.get("zeroIndexed");
      };

      GraphInterface.prototype.repeatNumEdges = function(func) {
        var i, _i, _ref, _results;
        _results = [];
        for (i = _i = 0, _ref = this.getNumEdges() - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          _results.push(func(i));
        }
        return _results;
      };

      GraphInterface.prototype.repeatNumVertices = function(func) {
        var i, list, _i, _j, _k, _len, _ref, _ref1, _results, _results1, _results2;
        if (this.getZeroIndexedFlag()) {
          list = (function() {
            _results = [];
            for (var _i = 0, _ref = this.getNumVertices() - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
            return _results;
          }).apply(this);
        } else {
          list = (function() {
            _results1 = [];
            for (var _j = 1, _ref1 = this.getNumVertices(); 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; 1 <= _ref1 ? _j++ : _j--){ _results1.push(_j); }
            return _results1;
          }).apply(this);
        }
        _results2 = [];
        for (_k = 0, _len = list.length; _k < _len; _k++) {
          i = list[_k];
          _results2.push(func(i));
        }
        return _results2;
      };

      GraphInterface.prototype.addEdge = function(new_edge) {
        throw Errors.prototype.NOT_IMPLEMENT;
      };

      GraphInterface.prototype.hasEdge = function(from, to) {
        throw Errors.prototype.NOT_IMPLEMENT;
      };

      return GraphInterface;

    })(Backbone.Model);
  });

}).call(this);
