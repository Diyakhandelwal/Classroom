require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "public")));

app.use(
  session({
    secret: 'topsecret',
    resave: false,
    saveUninitialized: false,
  })
);


app.set("view engine", "ejs");
const port = 4000;


app.get("/", (req, res) => {
  res.render("dashboardStudent");
  res.end();
});

app.get("/login", (req, res) => {
  res.render("login");
  res.end();
})

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

app.get("/account", (req, res) => {
  res.render("myAccount");
  res.end();
});

app.get("/classes", (req, res) => {
  res.render("classStudent");
  res.end();
});

app.get("/result", (req,res) => {
  res.render("studentResult");
  res.end();
})

app.get("/classes/students", (req, res) => {
  res.render("students");
  res.end();
})

app.get("/assignments", (req, res) => {
  res.render("assignments");
  res.end();
})

app.get("/messages", (req, res) => {
  res.render("messages");
  res.end();
})

app.get("/schedule", (req, res) => {
  res.render("schedule");
  res.end();
})

app.listen(4000,(req,res) => {
    console.log('success')
})