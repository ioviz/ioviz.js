(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["underscore", "backbone", "ioviz/utils/errors"], function(_, Backbone, Errors) {
    var StreamBase;
    return StreamBase = (function() {
      function StreamBase() {
        this.events = {};
        _(this.events).extend(Backbone.Events);
        this.destStream = void 0;
        this.initialize();
      }

      StreamBase.prototype.initialize = function() {
        return this.on("data", (function(_this) {
          return function() {
            return _this.onData.apply(_this, arguments);
          };
        })(this));
      };

      StreamBase.prototype.flow = function() {
        if (this.destStream) {
          return this.destStream.trigger.apply(this.destStream, arguments);
        }
      };

      StreamBase.prototype.on = function() {
        return this.events.on.apply(this, arguments);
      };

      StreamBase.prototype.trigger = function(name) {
        return this.events.trigger.apply(this, arguments);
      };

      StreamBase.prototype.pipe = function(destStream) {
        return this.destStream = destStream;
      };

      StreamBase.src = function() {
        throw Errors.prototype.NOT_IMPLEMENT;
      };

      StreamBase.eof = function() {
        var Eof;
        return new (Eof = (function(_super) {
          __extends(Eof, _super);

          function Eof() {
            return Eof.__super__.constructor.apply(this, arguments);
          }

          Eof.prototype.initialize = function() {
            return this.on("data", (function(_this) {
              return function(a, b) {
                return _this.trigger("end");
              };
            })(this));
          };

          return Eof;

        })(StreamBase));
      };

      return StreamBase;

    })();
  });

}).call(this);
