const express = require("express"),
  http = require("http"),
  cors = require("cors");

const { Server } = require("socket.io");
//   npm i socket.io cors

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }, // react server
});

io.on("connection", (socket) => {
  console.log("## 유저 접속함: ", socket.id);
  // 유저가 보내오는 메시지 수신후 보내온 메시지를 public 방식으로 전송
  socket.on("sendMessage", (data) => {
    console.log(`## ${data.sender} : ${data.message}`);
    // public 방식으로 접속한 모두에게 전송 io.sockets.emit() 또는 io.emit()
    io.sockets.emit("receiveMessage", data);
  });
});

server.listen(5555, () => {
  console.log("socket.io 챗서버 실행중 포트: 5555");
});
