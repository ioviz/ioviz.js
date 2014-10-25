through = require("through2")
gutil = require("gulp-util")
File = gutil.File
path = require("path")

requireAll = (filename, options)->
  cwd = process.cwd()
  cwd = path.join(cwd, options.baseUrl) if options && options.baseUrl
  path_list = []
  result_contents = ""
  result_contents += "(function() {"
  result_contents += "define(["

  toModulePath = (file)->
    module_path = path.relative(cwd, file.path)
    module_path = path.join(options.prefix, module_path) if options && options.prefix
    ext_name = path.extname(module_path)
    module_path.slice 0, -1 * ext_name.length

  stream = through.obj(
    # on data
    (file, enc, cb)->
      path_list.push toModulePath(file)
      cb()

    # on end
    (cb)->
      result_contents += path_list
        .map (path_str)->
          "'#{path_str}'"
        .join(",\n")
      result_contents += '], function() {});'
      result_contents += '})();'

      @push new File(
        contents: new Buffer(result_contents)
        stat:
          mode: "0644"
        path: filename
      )
      cb()
  )

module.exports = requireAll
