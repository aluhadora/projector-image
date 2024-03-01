const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"http://localhost:3000", methods: ["GET", "POST"]},
});

let image = 1;
let speed = 2;
let brightness = 1;
let fadingTimer = 1;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (_, res) => {
    let data = { 
      message: "Hello from server!", 
      image: image, 
      speed: speed, 
      brightness: brightness, 
      fadingTimer: fadingTimer
    };
    res.json(data);
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  
  socket.on("send_message", (data) => {
    if (data.image) image = data.image;
    if (data.speed) speed = data.speed;
    if (data.brightness) brightness = data.brightness;
    if (data.fadingTimer) fadingTimer = data.fadingTimer;
    socket.broadcast.emit("receive_message", data);
  });
});

// All other GET requests not handled before will return our React app
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});