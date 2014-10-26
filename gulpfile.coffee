gulp    = require "gulp"
gutil   = require "gulp-util"
bower   = require "bower"
coffee  = require "gulp-coffee"
concat  = require "gulp-concat"
uglify  = require "gulp-uglify"
cond    = require "gulp-if"
path    = require "path"
glob    = require "glob"
phantomochajs  = require "phantomochajs"
amdOptimize    = require "amd-optimize"
mainBowerFiles = require "main-bower-files"

isRelease = gutil.env.release?

gulp.task "bower", (done)->
  bower.commands.install().on "end", ->
    gulp.src mainBowerFiles()
      .pipe gulp.dest("tmp/js/bower/")
      .on "end", -> done()
  return undefined

gulp.task "test", ["bower"], ->
  gulp.src ["spec/spec_helper.coffee", "spec/**/*_spec.coffee"]
    .pipe phantomochajs(
      dependencies: [
        "/bower_components/requirejs/require.js"
      ]
      test_dependencies: [
        "/bower_components/mocha/mocha.js"
        "/bower_components/chai/chai.js"
      ]
      mocha_css_url: "/bower_components/mocha/mocha.css"
    )

gulp.task "watch", ->
  gulp.watch(
    [
      "src/coffee/**/*.coffee"
      "spec/**/*.coffee"
    ]
    [
      "test"
    ]
  )

gulp.task "app", ->
  gulp.src ["src/coffee/**/*.coffee"]
    .pipe coffee()
    .pipe gulp.dest("tmp/js/app/")

gulp.task "requirejs-config.js", ["bower"], ->
  requirejsConfig = require("./lib/requirejs-config")
  gulp.src ["tmp/js/bower/*.js"]
    .pipe requirejsConfig(
      "requirejs-config.js"
      {
        baseUrl: "tmp/js"
      }
    )
    .pipe gulp.dest("tmp/js/config/")

gulp.task "require-all.js", ->
  requireAll = require("./lib/require-all")
  gulp.src ["src/coffee/**/*.coffee"]
    .pipe requireAll(
      "require-all.js"
      {
        baseUrl: "src/coffee"
        prefix: "app"
      }
    )
    .pipe gulp.dest("tmp/js/config/")

gulp.task "config", [
  "requirejs-config.js"
  "require-all.js"
]

gulp.task "ioviz.js", ["app", "bower", "config"], ->
  gulp.src(["tmp/js/**/*.js"])
    .pipe amdOptimize(
      "config/require-all"
      {
        configFile: "tmp/js/config/requirejs-config.js"
        exclude: glob.sync("tmp/js/bower/*.js").map (module)->
          path.basename(module).slice 0, -1 * ".js".length
      }
    )
    .pipe concat("ioviz.js")
    .pipe cond isRelease, uglify() # gulp ioviz.js --release
    .pipe gulp.dest("dist/")

