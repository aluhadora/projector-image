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

let state = {imageId: 1, speedId: 2, brightnessId: 2, fadingTimerId: 1, show3d: true, pointLight: true, showStarfield: true};

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (_, res) => {
    let data = {...{message: "Hello from server!", }, ...state };
    res.json(data);
});

app.get("/api/image", (_, res) => {
  res.json({imageId: imageId});
});

app.post("/api/image", (req, res) => {
  var imageId = req.body.imageId;
  state.imageId = imageId;
  res.json({imageId: imageId});
});

function send_message(data) {
  io.emit("receive_message", data);
}

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  
  socket.on("send_message", (data) => {
    state = {...state, ...data};
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