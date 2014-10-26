express = require("express")
path = require("path")
ConnectMincer = require("connect-mincer")

app = express()

app.set "view engine", "jade"
app.set "views", path.join(__dirname, "views")

app.use express.static(path.join(__dirname, "../tmp/js/"))

connectMincer = new ConnectMincer(
  root: path.join(__dirname)
  mountPoint: "/assets"
  paths: [
    "assets/"
  ]
)
app.use '/assets', connectMincer.createServer()

app.get "/", (req, res)->
  res.render('index')

app.listen(3000)
