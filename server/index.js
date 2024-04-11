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

let imageId = 1;
let speedId = 2;
let brightnessId = 2;
let fadingTimerId = 1;
let show3d = true;
let pointLight = true;
let showStarfield = true;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (_, res) => {
    let data = { 
      message: "Hello from server!", 
      imageId: imageId, 
      speedId: speedId, 
      brightnessId: brightnessId, 
      fadingTimerId: fadingTimerId,
      show3d: show3d,
      pointLight: pointLight,
      showStarfield: showStarfield,
    };
    res.json(data);
});

app.get("/api/image", (_, res) => {
  res.json({imageId: imageId});
});

app.post("/api/image", (req, res) => {
  imageId = req.body.imageId;
  res.json({imageId: imageId});
});

function send_message(data) {
  io.emit("receive_message", data);
}

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  
  socket.on("send_message", (data) => {
    if (data.imageId) imageId = data.imageId;
    if (data.Id) speedId = data.speedId;
    if (data.brightnessId) brightnessId = data.brightnessId;
    if (data.fadingTimerId) fadingTimerId= data.fadingTimerId;
    if (data.show3d !== undefined) show3d = data.show3d;
    if (data.pointLight !== undefined) pointLight = data.pointLight;
    if (data.showStarfield !== undefined) showStarfield = data.showStarfield;
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