(function() {
  define([], function() {
    return function(func) {
      return setTimeout(func, 0);
    };
  });

}).call(this);
