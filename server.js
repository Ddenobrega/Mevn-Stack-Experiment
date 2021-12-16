const express = require("express")
const app = express();
const http = require('http')
const server = http.createServer(app)
const port = process.env.PORT || 3000
const path = require("path")
const root = path.join(__dirname, "./frontend/dist/")
const cors = require("cors")
const db = require("./db/db")
const {Server} = require("socket.io")
const io = new Server(server)




//root dir
app.use(express.static(root))

//cross origin resource sharing
app.use(cors())

//router imports
const invite = require("./routes/invite")
const register = require("./routes/register")
const login = require("./routes/login")
//router
app.use('/invite', invite);
app.use("/register", register);
app.use("/login", login);

//main get request
app.get("*", (req, res) => res.sendFile(root))

//listener
server.listen(port, () => console.log(`Server Running on port ${port}`))

//Message Schema import
const dbm = require("./db/models/chatMessages")

//socket io 
io.on("connection", (socket) => {
  console.log("Someone Connected")
  socket.on("load chat", (id) => {
    console.log(id)
  dbm.find({}, (err, results) => {
    var index = 0;
    results.forEach(dom => {
      io.emit("load message", results[index].user,  results[index].message, id)
      index++
    })
  })

  })
  socket.on("chat message", async (username, msg) => {
    console.log(`${username}: ${msg}`)
    var date = Date.now()
    await io.emit("chat message", username, msg , date)
    const result = new dbm({
      user: username,
      message: msg,
      date: date
    })
    result.save()
  })
})
