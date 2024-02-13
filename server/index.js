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

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

io.on("connection", (socket) => {
  console.log(`a user connected ${socket.id}`);
  
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});