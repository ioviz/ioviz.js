through = require("through2")
gutil = require("gulp-util")
File = gutil.File
path = require("path")

requireAll = (filename, options)->
  cwd = process.cwd()
  pathlist = []

  toModulePath = (file)->
    modulepath = path.relative(cwd, file.path)
    if /\./.test(path.basename(modulepath))
      extname = path.extname(module_path)
      modulepath = modulepath.slice 0, -1 * extname.length
    modulepath

  stream = through.obj(
    # on data
    (file, enc, cb)->
      pathlist.push {
        name: path.basename(toModulePath(file))
        path: toModulePath(file)
      }
      cb()

    # on end
    (cb)->
      result_contents = ""
      result_contents += "requirejs.config({paths:{"
      result_contents += pathlist
        .map (module)->
          "'#{module.name}': '#{module.path}'"
        .join(",")
      result_contents += "}});"

      @push new File(
        contents: new Buffer(result_contents)
        stat:
          mode: "0644"
        path: filename
      )

      cb()
  )

module.exports = requireAll
