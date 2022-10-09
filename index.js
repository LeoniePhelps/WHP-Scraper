const PORT = 8000;
// npm run start
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const WhpUrl = "https://www.thewarehouseproject.com/calendar_2022";
axios(WhpUrl).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  // GET DATES
  $(".calendar_block_date", html).each(function () {
    //console.log($(this).text());
  });
  // GET EVENT NAMES
  $(".calendar_name", html).each(function () {
    //console.log($(this).text());
  });
  // GET ARTIST LINEUP
  $(".calendar_artists", html).each(function () {
    //console.log($(this).text());
  });
  // GET EVENT TIME AND LOCATION
  $(".grey", html).each(function () {
    //console.log($(this).text());
  });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
