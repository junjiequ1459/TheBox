const express = require("express");
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

const app = express();

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

app.get("/CSRF-TOKEN", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("CSRF-TOKEN", csrfToken);
  res.json({ "CSRF-Token": csrfToken });
});

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


module.exports = app;
