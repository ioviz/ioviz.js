(function () {
    define('ioviz/utils/errors', [], function () {
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
    define('ioviz/utils/next_tick', [], function () {
        return function (func) {
            return setTimeout(func, 0);
        };
    });
}.call(this));
(function () {
    define('ioviz/utils/tokenizer', [], function () {
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
    define('ioviz/views/graph_view', [
        'underscore',
        'backbone',
        'd3'
    ], function (_, Backbone, d3) {
        var GraphView;
        return GraphView = function (_super) {
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
            GraphView.prototype.tagName = 'div';
            GraphView.prototype.initialize = function (options) {
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
            GraphView.prototype.initFrame = function () {
                return this.$el.css('position', 'relative').css('width', '' + this.width + 'px').css('height', '' + this.height + 'px');
            };
            GraphView.prototype.initNodes = function () {
                var drag;
                this.nodes = this.svg.selectAll('.node').data(this.srcNodes);
                drag = this.layout.drag().on('dragstart', function (d) {
                    return d3.select(this).classed('fixed', d.fixed = true);
                });
                this.nodes.enter().append('circle').attr('class', 'node').attr('id', function (d) {
                    return 'node-' + d.name;
                }).attr('cx', function (d) {
                    return d.x;
                }).attr('cy', function (d) {
                    return d.y;
                }).attr('r', 12).on('dblclick', function (d) {
                    return d3.select(this).classed('fixed', d.fixed = false);
                }).call(drag);
                return this.nodes.exit().remove();
            };
            GraphView.prototype.initEdges = function () {
                this.edges = this.svg.selectAll('.edge').data(this.srcEdges, function (d) {
                    return '' + Math.min(d.source.name, d.target.name) + '-' + Math.max(d.source.name, d.target.name);
                });
                return this.edges.enter().insert('line').attr('id', function (d) {
                    return 'edge-' + Math.min(d.source.name, d.target.name) + '-' + Math.max(d.source.name, d.target.name);
                }).attr('class', 'edge').attr('x1', function (d) {
                    return d.source.x;
                }).attr('y1', function (d) {
                    return d.source.y;
                }).attr('x2', function (d) {
                    return d.target.x;
                }).attr('y2', function (d) {
                    return d.target.y;
                });
            };
            GraphView.prototype.initLayout = function () {
                this.layout = d3.layout.force().nodes(this.srcNodes).links(this.srcEdges).size([
                    this.width,
                    this.height
                ]).linkDistance(40).chargeDistance(-400).start();
                return this.layout.on('tick', function (_this) {
                    return function () {
                        _this.edges.attr('x1', function (d) {
                            return d.source.x;
                        }).attr('y1', function (d) {
                            return d.source.y;
                        }).attr('x2', function (d) {
                            return d.target.x;
                        }).attr('y2', function (d) {
                            return d.target.y;
                        });
                        return _this.nodes.attr('cx', function (d) {
                            return d.x;
                        }).attr('cy', function (d) {
                            return d.y;
                        });
                    };
                }(this));
            };
            GraphView.prototype.initSourceEdges = function () {
                var modelEdges;
                modelEdges = this.model.getEdges();
                this.srcEdges = [];
                return this.model.repeatNumVertices(function (_this) {
                    return function (i) {
                        return _(modelEdges[i]).each(function (edge) {
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
                }(this));
            };
            GraphView.prototype.initSourceNodes = function () {
                this.srcNodes = [];
                return this.model.repeatNumVertices(function (_this) {
                    return function (i) {
                        return _this.srcNodes.push({
                            name: '' + i,
                            x: 300,
                            y: 300
                        });
                    };
                }(this));
            };
            GraphView.prototype.initSvg = function () {
                return this.svg = d3.select(this.el).append('svg').attr('width', '100%').attr('height', '100%').style('position', 'absolute');
            };
            GraphView.prototype.render = function () {
                this.layout.start();
                return this;
            };
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
    define('ioviz/models/graph/graph_interface', [
        'backbone',
        'ioviz/utils/errors'
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
                    directedFlag: false,
                    zeroIndexedFlag: false
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
            GraphInterface.prototype.getZeroIndexedFlag = function () {
                return this.get('zeroIndexed');
            };
            GraphInterface.prototype.getEdges = function () {
                return JSON.parse(this.get('edges'));
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
            GraphInterface.prototype.setZeroIndexedFlag = function (flag) {
                return this.set('zeroIndexed', flag);
            };
            GraphInterface.prototype.setEdges = function (edges) {
                return this.set('edges', JSON.stringify(edges));
            };
            GraphInterface.prototype.isZeroIndexed = function () {
                return this.get('zeroIndexed');
            };
            GraphInterface.prototype.repeatNumEdges = function (func) {
                var i, _i, _ref, _results;
                _results = [];
                for (i = _i = 0, _ref = this.getNumEdges() - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
                    _results.push(func(i));
                }
                return _results;
            };
            GraphInterface.prototype.repeatNumVertices = function (func) {
                var i, list, _i, _j, _k, _len, _ref, _ref1, _results, _results1, _results2;
                if (this.getZeroIndexedFlag()) {
                    list = function () {
                        _results = [];
                        for (var _i = 0, _ref = this.getNumVertices() - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; 0 <= _ref ? _i++ : _i--) {
                            _results.push(_i);
                        }
                        return _results;
                    }.apply(this);
                } else {
                    list = function () {
                        _results1 = [];
                        for (var _j = 1, _ref1 = this.getNumVertices(); 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; 1 <= _ref1 ? _j++ : _j--) {
                            _results1.push(_j);
                        }
                        return _results1;
                    }.apply(this);
                }
                _results2 = [];
                for (_k = 0, _len = list.length; _k < _len; _k++) {
                    i = list[_k];
                    _results2.push(func(i));
                }
                return _results2;
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
    define('ioviz/models/graph/adjacent_list', [
        'underscore',
        'ioviz/models/graph/graph_interface'
    ], function (_, GraphInterface) {
        var AdjacentList;
        return AdjacentList = function (_super) {
            __extends(AdjacentList, _super);
            function AdjacentList() {
                return AdjacentList.__super__.constructor.apply(this, arguments);
            }
            AdjacentList.prototype.initialize = function () {
                this.setEdges({});
                return this.direction = true;
            };
            AdjacentList.prototype.addEdge = function (edge) {
                var edges;
                edges = this.getEdges();
                this._addEdge(edges, edge);
                if (!this.getDirectedFlag()) {
                    this._addRevEdge(edges, edge);
                }
                return this.setEdges(edges);
            };
            AdjacentList.prototype.hasEdge = function (from, to) {
                return _(this.getEdges()[from]).some(function (edge) {
                    return edge.to === to;
                });
            };
            AdjacentList.prototype._addEdge = function (edges, edge) {
                var _name;
                edges[_name = edge.from] || (edges[_name] = []);
                return edges[edge.from].push(edge);
            };
            AdjacentList.prototype._addRevEdge = function (edges, edge) {
                var revEdge, _name;
                revEdge = _.clone(edge);
                revEdge.to = edge.from;
                revEdge.from = edge.to;
                edges[_name = revEdge.from] || (edges[_name] = []);
                return edges[revEdge.from].push(revEdge);
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
    define('ioviz/streams/base/stream_base', [
        'underscore',
        'backbone',
        'ioviz/utils/errors'
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
    define('ioviz/streams/graph/adjacent_list_stream', [
        'ioviz/streams/base/stream_base',
        'ioviz/models/graph/adjacent_list',
        'ioviz/utils/tokenizer',
        'ioviz/utils/next_tick'
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
    define('ioviz/streams/graph/graph_stream', ['ioviz/streams/base/stream_base'], function (StreamBase) {
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
                        graph.repeatNumEdges(function () {
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
    define('ioviz/streams/text/text_stream', [
        'ioviz/streams/base/stream_base',
        'ioviz/utils/next_tick'
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
    define('config/ioviz-require-all', [
        'ioviz/utils/errors',
        'ioviz/utils/next_tick',
        'ioviz/utils/tokenizer',
        'ioviz/views/graph_view',
        'ioviz/models/graph/adjacent_list',
        'ioviz/models/graph/graph_interface',
        'ioviz/streams/base/stream_base',
        'ioviz/streams/graph/adjacent_list_stream',
        'ioviz/streams/graph/graph_stream',
        'ioviz/streams/text/text_stream'
    ], function () {
    });
}());