gulp = require 'gulp'
gulp_util = require 'gulp-util'
main_bower_files = require 'main-bower-files'
bower = require 'bower'
uglify = require 'gulp-uglify'
cond = require 'gulp-if'
coffee = require 'gulp-coffee'
concat = require 'gulp-concat'
del = require 'del'
mocha_phantomjs = require 'gulp-mocha-phantomjs'

isRelease = ! gulp_util.env.release?

# gulp bower
gulp.task 'bower', ['clean'], -
  bower.commands.install().on 'end', ->
    gulp.src main_bower_files()
      .pipe cond isRelease, uglify({preserveComments: 'some'})
      .pipe gulp.dest "tmp/js/lib"

# gulp coffee
gulp.task 'coffee', ['clean'], ->
  gulp.src(['src/coffee/**/*.coffee'])
    .pipe coffee()
    .pipe cond isRelease, uglify({preserveComments: 'some'})
    .pipe gulp.dest "tmp/js/ioviz"

# gulp min
gulp.task 'minify', ['bower', 'coffee'], ->
  gulp.src(['tmp/js/**/*.js'])
    .pipe concat('ioviz.js')
    .pipe gulp.dest "dist/"

# gulp clean
gulp.task 'clean', del.bind null, [
  'tmp/'
]

# gulp test
gulp.task 'test', ->
  stream = mocha_phantomjs()
  stream.write({
    path: "http://localhost:18080/test_runner.html"
  })
  stream.end()
  return stream

# gulp build
gulp.task 'build', [
  'clean'
  'bower'
  'coffee'
  'minify'
]

# gulp
gulp.task 'default', [
  'build'
]

