requirejs.config(
  baseUrl: "/"
  paths:
    "ioviz": "/src/coffee/ioviz"
)

@expect = chai.expect

# Load Modules
@load_modules = =>
  module_names = Array::splice.call(arguments, 0)
  module_classes = []

  before (done)=>
    requirejs module_names, =>
      module_classes = Array::splice.call(arguments, 0)
      module_classes.forEach (module_class)=>
        @[module_class.name] = module_class
      done()

  after =>
    module_classes.forEach (module_class)=>
      delete @[module_class.name]
