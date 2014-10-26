(function () {
    define('app/utils/errors', [], function () {
        var Errors;
        return Errors = function () {
            function Errors() {
            }
            Errors.prototype.NOT_IMPLEMENT = new Error('not implement');
            return Errors;
        }();
    });
}.call(this));
(function () {
    define('app/utils/next_tick', [], function () {
        return function (func) {
            return setTimeout(func, 0);
        };
    });
}.call(this));
(function () {
    define('app/utils/tokenizer', [], function () {
        var Tokenizer;
        return Tokenizer = function () {
            function Tokenizer(text) {
                this.tokens = text.split(/\b\s+/);
            }
            Tokenizer.prototype.nextInt = function () {
                return parseInt(this.tokens.shift(), 10);
            };
            return Tokenizer;
        }();
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    define('app/views/graph_view', ['backbone'], function (Backbone) {
        var GraphView;
        return GraphView = function (_super) {
            __extends(GraphView, _super);
            function GraphView() {
                return GraphView.__super__.constructor.apply(this, arguments);
            }
            return GraphView;
        }(Backbone.View);
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    define('app/models/graph/graph_interface', [
        'backbone',
        'app/utils/errors'
    ], function (Backbone, Errors) {
        var GraphInterface;
        return GraphInterface = function (_super) {
            __extends(GraphInterface, _super);
            function GraphInterface() {
                return GraphInterface.__super__.constructor.apply(this, arguments);
            }
            GraphInterface.prototype.defaults = function () {
                return {
                    numVertices: 0,
                    numEdges: 0,
                    directedFlag: false
                };
            };
            GraphInterface.prototype.getNumVertices = function () {
                return this.get('numVertices');
            };
            GraphInterface.prototype.getNumEdges = function () {
                return this.get('numEdges');
            };
            GraphInterface.prototype.getDirectedFlag = function () {
                return this.get('directedFlag');
            };
            GraphInterface.prototype.setNumVertices = function (numVertices) {
                return this.set('numVertices', numVertices);
            };
            GraphInterface.prototype.setNumEdges = function (numEdges) {
                return this.set('numEdges', numEdges);
            };
            GraphInterface.prototype.setDirectedFlag = function (flag) {
                return this.set('directedFlag', flag);
            };
            GraphInterface.prototype.forNumEdges = function (func) {
                var i, _i, _ref, _results;
                _results = [];
                for (i = _i = 1, _ref = this.getNumEdges(); 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
                    _results.push(func(i));
                }
                return _results;
            };
            GraphInterface.prototype.addEdge = function (new_edge) {
                throw Errors.prototype.NOT_IMPLEMENT;
            };
            GraphInterface.prototype.hasEdge = function (from, to) {
                throw Errors.prototype.NOT_IMPLEMENT;
            };
            return GraphInterface;
        }(Backbone.Model);
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    define('app/models/graph/adjacent_list', [
        'underscore',
        'app/models/graph/graph_interface'
    ], function (_, GraphInterface) {
        var AdjacentList;
        return AdjacentList = function (_super) {
            __extends(AdjacentList, _super);
            function AdjacentList() {
                return AdjacentList.__super__.constructor.apply(this, arguments);
            }
            AdjacentList.prototype.initialize = function () {
                this.edges = {};
                return this.direction = true;
            };
            AdjacentList.prototype.addEdge = function (edge) {
                this._addEdge(edge);
                if (!this.getDirectedFlag()) {
                    return this._addRevEdge(edge);
                }
            };
            AdjacentList.prototype.hasEdge = function (from, to) {
                return _(this.edges[from]).some(function (edge) {
                    return edge.to === to;
                });
            };
            AdjacentList.prototype._addEdge = function (edge) {
                var _base, _name;
                (_base = this.edges)[_name = edge.from] || (_base[_name] = []);
                return this.edges[edge.from].push(edge);
            };
            AdjacentList.prototype._addRevEdge = function (edge) {
                var revEdge, _base, _name;
                revEdge = _.clone(edge);
                revEdge.to = edge.from;
                revEdge.from = edge.to;
                (_base = this.edges)[_name = revEdge.from] || (_base[_name] = []);
                return this.edges[revEdge.from].push(revEdge);
            };
            return AdjacentList;
        }(GraphInterface);
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    define('app/streams/base/stream_base', [
        'underscore',
        'backbone',
        'app/utils/errors'
    ], function (_, Backbone, Errors) {
        var StreamBase;
        return StreamBase = function () {
            function StreamBase() {
                this.events = {};
                _(this.events).extend(Backbone.Events);
                this.destStream = void 0;
                this.initialize();
            }
            StreamBase.prototype.initialize = function () {
                return this.on('data', function (_this) {
                    return function () {
                        return _this.onData.apply(_this, arguments);
                    };
                }(this));
            };
            StreamBase.prototype.flow = function () {
                if (this.destStream) {
                    return this.destStream.trigger.apply(this.destStream, arguments);
                }
            };
            StreamBase.prototype.on = function () {
                return this.events.on.apply(this, arguments);
            };
            StreamBase.prototype.trigger = function (name) {
                return this.events.trigger.apply(this, arguments);
            };
            StreamBase.prototype.pipe = function (destStream) {
                return this.destStream = destStream;
            };
            StreamBase.src = function () {
                throw Errors.prototype.NOT_IMPLEMENT;
            };
            StreamBase.eof = function () {
                var Eof;
                return new (Eof = function (_super) {
                    __extends(Eof, _super);
                    function Eof() {
                        return Eof.__super__.constructor.apply(this, arguments);
                    }
                    Eof.prototype.initialize = function () {
                        return this.on('data', function (_this) {
                            return function (a, b) {
                                return _this.trigger('end');
                            };
                        }(this));
                    };
                    return Eof;
                }(StreamBase))();
            };
            return StreamBase;
        }();
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    define('app/streams/graph/adjacent_list_stream', [
        'app/streams/base/stream_base',
        'app/models/graph/adjacent_list',
        'app/utils/tokenizer',
        'app/utils/next_tick'
    ], function (StreamBase, AdjacentList, Tokenizer, nextTick) {
        var AdjacentListStream;
        return AdjacentListStream = function (_super) {
            __extends(AdjacentListStream, _super);
            function AdjacentListStream() {
                return AdjacentListStream.__super__.constructor.apply(this, arguments);
            }
            AdjacentListStream.src = function (input) {
                var stream;
                stream = new AdjacentListStream();
                nextTick(function () {
                    return stream.flow('data', new Tokenizer(input), new AdjacentList());
                });
                return stream;
            };
            return AdjacentListStream;
        }(StreamBase);
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    define('app/streams/graph/graph_stream', ['app/streams/base/stream_base'], function (StreamBase) {
        var GraphStream;
        return GraphStream = function (_super) {
            __extends(GraphStream, _super);
            function GraphStream() {
                return GraphStream.__super__.constructor.apply(this, arguments);
            }
            GraphStream.numVertices = function (options) {
                var NumVertices;
                return new (NumVertices = function (_super1) {
                    __extends(NumVertices, _super1);
                    function NumVertices() {
                        return NumVertices.__super__.constructor.apply(this, arguments);
                    }
                    NumVertices.prototype.onData = function (tokenizer, graph) {
                        graph.setNumVertices(tokenizer.nextInt());
                        return this.flow('data', tokenizer, graph);
                    };
                    return NumVertices;
                }(GraphStream))();
            };
            GraphStream.numEdges = function (options) {
                var NumEdges;
                return new (NumEdges = function (_super1) {
                    __extends(NumEdges, _super1);
                    function NumEdges() {
                        return NumEdges.__super__.constructor.apply(this, arguments);
                    }
                    NumEdges.prototype.onData = function (tokenizer, graph) {
                        graph.setNumEdges(tokenizer.nextInt());
                        return this.flow('data', tokenizer, graph);
                    };
                    return NumEdges;
                }(GraphStream))();
            };
            GraphStream.edges = function (options) {
                var Edges;
                return new (Edges = function (_super1) {
                    __extends(Edges, _super1);
                    function Edges() {
                        return Edges.__super__.constructor.apply(this, arguments);
                    }
                    Edges.prototype.onData = function (tokenizer, graph) {
                        graph.forNumEdges(function () {
                            var edge;
                            edge = {};
                            edge.from = tokenizer.nextInt();
                            edge.to = tokenizer.nextInt();
                            return graph.addEdge(edge);
                        });
                        return this.flow('data', tokenizer, graph);
                    };
                    return Edges;
                }(GraphStream))();
            };
            GraphStream.directed = function (flag) {
                var GetNumVertices;
                return new (GetNumVertices = function (_super1) {
                    __extends(GetNumVertices, _super1);
                    function GetNumVertices() {
                        return GetNumVertices.__super__.constructor.apply(this, arguments);
                    }
                    GetNumVertices.prototype.onData = function (tokenizer, graph) {
                        graph.setDirectedFlag(flag);
                        return this.flow('data', tokenizer, graph);
                    };
                    return GetNumVertices;
                }(GraphStream))();
            };
            return GraphStream;
        }(StreamBase);
    });
}.call(this));
(function () {
    var __hasProp = {}.hasOwnProperty, __extends = function (child, parent) {
            for (var key in parent) {
                if (__hasProp.call(parent, key))
                    child[key] = parent[key];
            }
            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        };
    define('app/streams/text/text_stream', [
        'app/streams/base/stream_base',
        'app/utils/next_tick'
    ], function (StreamBase, nextTick) {
        var TextStream;
        return TextStream = function (_super) {
            __extends(TextStream, _super);
            function TextStream() {
                return TextStream.__super__.constructor.apply(this, arguments);
            }
            return TextStream;
        }(StreamBase);
    });
}.call(this));
(function () {
    define('config/require-all', [
        'app/utils/errors',
        'app/utils/next_tick',
        'app/utils/tokenizer',
        'app/views/graph_view',
        'app/models/graph/adjacent_list',
        'app/models/graph/graph_interface',
        'app/streams/base/stream_base',
        'app/streams/graph/adjacent_list_stream',
        'app/streams/graph/graph_stream',
        'app/streams/text/text_stream'
    ], function () {
    });
}());