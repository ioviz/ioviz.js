gulp  = require "gulp"
bower = require "bower"
concat = require "gulp-concat"
phantomochajs = require "phantomochajs"
amdOptimizer = require "amd-optimizer"

# gulp bower
gulp.task "bower", (done)->
  bower.commands.install().on "end", ->
    done()
  return undefined

# gulp test
gulp.task "test", ["bower"], ->
  gulp.src ["spec/spec_helper.coffee", "spec/**/*_spec.coffee"]
    .pipe phantomochajs(
      # server: true
      amd_glob: true
      dependencies: [
        "/bower_components/requirejs/require.js"
      ]
      test_dependencies: [
        "/bower_components/mocha/mocha.js"
        "/bower_components/chai/chai.js"
      ]
      mocha_css_url: "/bower_components/mocha/mocha.css"
    )

# gulp watch
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

gulp.task "requirejs-config.js", ->
  requirejsConfig = require("./lib/requirejs-config")
  gulp.src ["bower_components/*"]
    .pipe requirejsConfig("requirejs-config.js")
    .pipe gulp.dest("tmp/")

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
    .pipe gulp.dest("tmp/")

# gulp ioviz.js
gulp.task "ioviz.js", ["bower", "requirejs-config.js", "require-all.js"], ->
  gulp.src ["tmp/requirejs-config.js", "tmp/require-all.js"]
    .pipe amdOptimizer(
      "backbone/backbone"
      {
        configFile: gulp.src("tmp/requirejs-config.js")
      }
    )
    .pipe concat("ioviz.js")
    .pipe gulp.dest("dist/")

