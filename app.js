const express = require("express")
const app = express()

const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(express.static(__dirname + "/public"))

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("disconnect", () => {
        console.log(socket.id)
    })

    socket.on("buttonPress", (data) => {
        console.log(data)
    })
})

http.listen(8080, () => console.log("Lættis"))
