const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const dbcon = process.env.local_mongodb_con;
mongoose.connect(dbcon, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const con = mongoose.connection;
if (!con) console.log("Mongo DB connection failed");
else console.log("Mongo DB connection succesfully");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const ChatRoomFunction = require("./functions/chatRoomFunction");
const ChatRoomMessageFunction = require("./functions/chatRoomMessajeFunction");
const ChatRoomEntity = require("./entities/chatRoom");
const { default: axios } = require("axios");
const convert = require("xml-js");
const CarMobilityFunction = require("./functions/saveCarMobilitiesFunction");
io.on("connection", (socket) => {
  console.log("User Connected ", socket.id);

  setInterval(async function () {
    const data = await getCarData();
    await CarMobilityFunction.saveCarMobilities(data);
  }, 30000);

  socket.on("callApi_map_car", async () => {
    const data = await getCarData();
    socket.emit("listen_car_map", data);
  });

  async function getCarData(){
    var xmls =
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://webservice.com/">\n   <soapenv:Header/>\n   <soapenv:Body>\n      <web:PLITR1>\n                <a1>sercair</a1>\n                <a2>blink2014</a2>\n                <a3>213444</a3>\n                <o1>json</o1>\n      </web:PLITR1>\n   </soapenv:Body>\n</soapenv:Envelope>';
    var config = {
      method: "post",
      url: "http://37.75.11.73:80/Service724/track724WS",
      headers: {
        "Access-Control-Allow-Origin": "",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, PATCH, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
        "Content-Type": "text/xml; charset=utf-8",
        Cookie:
          "FGTServer=94295B2F3C8A09563B8E86D4B0F2A2FC9F6C8C76D04B4426FBAE6A81F015BFB287C7",
      },
      data: xmls,
    };
    return await axios(config)
      .then(async function (response) {
        const res = await JSON.parse(
          convert.xml2json(response.data, { compact: true, spaces: 2 })
        );
        const data = await res["soap:Envelope"]["soap:Body"][
          "ns2:PLITR1Response"
        ].return._text;
        return await JSON.parse(data);
      })
      .catch(function (err) {
        console.log("verihata", err);
      });
  }

  socket.on("create_room", async (data) => {
    const model = new ChatRoomEntity({
      name: "DM",
      participants: [data.me, data.you],
    });
    await socket.join(model._id);
    socket.emit("create_room_response", model);
    await ChatRoomFunction.createRoom(model);
  });

  socket.on("start_chat", (roomId) => {
    socket.join(roomId);
    console.log("chat started, code : " + roomId);
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.roomId).emit("receive_message", data);
    ChatRoomMessageFunction.createMessage(data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected ", socket.id);
  });
});

server.listen(3002, () => {
  console.log("Server running on port : ", 3002);
});
