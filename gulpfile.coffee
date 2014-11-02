gulp    = require "gulp"
gutil   = require "gulp-util"
bower   = require "bower"
coffee  = require "gulp-coffee"
concat  = require "gulp-concat"
uglify  = require "gulp-uglify"
path    = require "path"
glob    = require "glob"
bump    = require "gulp-bump"
git     = require "gulp-git"
sass    = require "gulp-ruby-sass"
phantomochajs   = require "phantomochajs"
amdOptimize     = require "amd-optimize"
mainBowerFiles  = require "main-bower-files"
minifyCss       = require "gulp-minify-css"

gulp.task "bower", (done)->
  bower.commands.install().on "end", ->
    gulp.src mainBowerFiles()
      .pipe gulp.dest("tmp/js/bower/")
      .on "end", -> done()
  return undefined

gulp.task "test", ["bower", "requirejs-config.js"], ->
  gulp.src ["spec/spec_helper.coffee", "spec/**/*_spec.coffee"]
    .pipe phantomochajs(
      dependencies: [
        "/bower_components/requirejs/require.js"
        "/tmp/js/config/requirejs-config.js"
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
  gulp.watch(
    [
      "src/coffee/**/*.coffee"
    ]
    [
      "ioviz.js"
      "ioviz.test.js"
    ]
  )
  gulp.watch(
    [
      "src/sass/**/*.sass"
    ]
    [
      "ioviz.css"
    ]
  )

gulp.task "coffee", ->
  gulp.src ["src/coffee/**/*.coffee"]
    .pipe coffee()
    .pipe gulp.dest("tmp/js/")

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
      }
    )
    .pipe gulp.dest("tmp/js/config/")

gulp.task "config", [
  "requirejs-config.js"
  "require-all.js"
]

gulp.task "server", ["ioviz.test.js"], ->
  http = require("http")
  webServer = require("./lib/web_server")
  http.createServer(webServer).listen(19292)

gulp.task "ioviz.test.js", ["coffee", "bower", "config"], ->
  gulp.src(["tmp/js/**/*.js"])
    .pipe amdOptimize(
      "config/require-all"
      {
        configFile: "tmp/js/config/requirejs-config.js"
      }
    )
    .pipe concat("ioviz.test.js")
    .pipe gulp.dest("tmp/js/test/")

gulp.task "ioviz.js", ["coffee", "bower", "config"], ->
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
    .pipe gulp.dest("dist/")

gulp.task "ioviz.min.js", ["ioviz.js"], ->
  gulp.src(["dist/ioviz.js"])
    .pipe uglify()
    .pipe concat("ioviz.min.js")
    .pipe gulp.dest("dist/")

gulp.task "main.css", ->
  gulp.src(["src/sass/main.sass"])
    .pipe sass()
    .pipe gulp.dest("tmp/css/")

gulp.task "ioviz.css", ["main.css"], ->
  gulp.src(["tmp/css/main.css"])
    .pipe concat "ioviz.css"
    .pipe gulp.dest("dist/")

gulp.task "ioviz.min.css", ["ioviz.css"], ->
  gulp.src(["dist/ioviz.css"])
    .pipe minifyCss()
    .pipe concat("ioviz.min.css")
    .pipe gulp.dest("dist/")

gulp.task "bump", ->
  gulp.src(["package.json", "bower.json"])
    .pipe bump(type: "patch")
    .pipe gulp.dest("./")

# 1.2.3 => 1.2.4
gulp.task "release/patch", ["build", "bump"], ->
  version = require("./package.json")["version"]
  gulp.src(["dist/*", "package.json", "bower.json"])
    .pipe git.add(args: '-f')
    .pipe git.commit("bump version into #{version}")
    .on "end", ->
      git.tag(version, version, ->)

gulp.task "build", [
  "ioviz.js"
  "ioviz.min.js"
  "ioviz.css"
  "ioviz.min.css"
]
