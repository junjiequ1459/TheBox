const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);


const cookieParser = require("cookie-parser");
const logger = require("morgan");
const debug = require("debug");
require("./models/Game");
require("./models/User");
require("./models/Room");
require("./config/passport");
const passport = require("passport");

const cors = require("cors");
const csurf = require("csurf");
const { isProduction } = require("./config/keys");

const io = require('socket.io')(server, {
    cors: {
        origin: ["http://localhost:3000"],
        transports: ["websocket", "polling"]

    }
})

const roomsRouter = require("./routes/api/rooms");
const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const gameRouter = require("./routes/api/games");

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

if (isProduction) {
  const path = require('path');
  app.get('/', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });

  app.use(express.static(path.resolve("../frontend/build")));

  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

if (!isProduction) {
  app.use(cors());
}


app.use("/api/users", usersRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/csrf", csrfRouter);
app.use("/api/games", gameRouter);

app.use((req, res, next) => {
  const err = new Error("Not Found");

  err.statusCode = 404;
  next(err);
});

const serverErrorLogger = debug("backend:error");

app.use((err, req, res, next) => {
  serverErrorLogger(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    statusCode,
    errors: err.errors,
  });
});



io.on("connection", (socket) => {

  socket.on("join", (room, username) => {

    socket.join(room);
  });

  socket.on('start-game', room => {
    socket.to(room).emit('start-game',() => {
      console.log('game started')
    })
  })

  socket.on('end-game', room => {
    socket.to(room).emit('end-game',() => {
      console.log('game ended')
    })
  })

  socket.on('receive-winner', (room, username) => {
    socket.to(room).emit('receive-winner', username, () => {
      console.log('winner')
    })
  })

  socket.on("disconnect", (room) => {
    socket.leave(room);
    console.log(`user left room ${room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data)
  });

  
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});

module.exports = app;
