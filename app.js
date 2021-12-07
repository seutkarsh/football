const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const { response } = require("express");
const path = require("path");

const publicDirectory = path.join(__dirname, "./");
app.use(express.static(publicDirectory));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/country", (req, res) => {
  var options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/countries",
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "3307b2acfamsh2db3bf573c8d879p10288djsn51c20f026cdd",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      var data = response.data.response;

      res.render("country", { apidata: data });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/country/:country_name", (req, res) => {
  var country_name = req.params.country_name;
  var options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/teams",
    params: { country: country_name },
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "3307b2acfamsh2db3bf573c8d879p10288djsn51c20f026cdd",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      var data = response.data.response;
      res.render("team", { apidata: data });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/team/:team_id", (req, res) => {
  var team_id = req.params.team_id;
  var options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/players",
    params: { team: team_id, season: "2020" },
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "3307b2acfamsh2db3bf573c8d879p10288djsn51c20f026cdd",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      var data = response.data.response;
      console.log(data);
      res.render("player", { apidata: data });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.get("/player/:player_id", (req, res) => {
  var player_id = req.params.player_id;
  var options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/players",
    params: { id: player_id, season: "2020" },
    headers: {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "3307b2acfamsh2db3bf573c8d879p10288djsn51c20f026cdd",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      var data = response.data.response[0];
      var team_logo = response.data.response[0].statistics[0].team.logo;
      console.log(data.statistics);
      res.render("player-profile", { apidata: data, logo: team_logo });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(5000, () => {
  console.log("App is listening on Port 5000");
});
