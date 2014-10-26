gulp    = require "gulp"
bower   = require "bower"
coffee  = require "gulp-coffee"
concat  = require "gulp-concat"
phantomochajs   = require "phantomochajs"
amdOptimize    = require "amd-optimize"
mainBowerFiles  = require "main-bower-files"

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
      }
    )
    .pipe concat("ioviz.js")
    .pipe gulp.dest("dist/")

