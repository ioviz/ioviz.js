gulp  = require "gulp"
bower = require "bower"
phantomochajs = require "phantomochajs"

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

