const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

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
const roomsRouter = require("./routes/api/rooms");
const usersRouter = require("./routes/api/users");
const csrfRouter = require("./routes/api/csrf");
const gameRouter = require("./routes/api/games");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

if (!isProduction) {
  app.use(cors());
}

app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

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
  console.log("a user connected");

  socket.on("join", (room) => {
    socket.join(room);
    console.log(`user joined room ${room}`);
  });

  socket.on("leave", (room) => {
    socket.leave(room);
    console.log(`user left room ${room}`);
  });

  // socket.on("message", (data) => {
  //   io.to(data.room).emit("message", data.message);
  //   console.log(`user sent message to room ${data.room}`);
  // });

});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

module.exports = app;
