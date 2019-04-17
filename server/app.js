const express = require('express')

const app = express()
const http =require('http').Server(app)

const io = require('socket.io')(http)

app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.post('/',(req,res)=>{
    io.emit('changeSlide', req.params.slide)
})

io.on('connection', (socket)=>{
    console.log('New Connection Created')

    socket.on("change", data=>{
        io.emit("changeSlide", data)
    })
})

http.listen(3000, ()=>{
    console.log("RUNNING ON 3000"); 
})
