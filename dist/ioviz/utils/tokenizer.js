(function() {
  define([], function() {
    var Tokenizer;
    return Tokenizer = (function() {
      function Tokenizer(text) {
        this.tokens = text.split(/\b\s+/);
      }

      Tokenizer.prototype.nextInt = function() {
        return parseInt(this.tokens.shift(), 10);
      };

      return Tokenizer;

    })();
  });

}).call(this);
