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
    const dates = $(this).text();
    //console.log(dates)
  });
  // GET EVENT NAMES
  $(".calendar_name", html).each(function () {
    const eventNames = $(this).text();
    //console.log(eventNames)
  });
  // GET ARTIST LINEUP
  $(".calendar_artists", html).each(function () {
    const artistLineup = $(this).text();
    //console.log(artistLineup)
  });
  // GET EVENT TIME AND LOCATION
  $(".grey", html).each(function () {
    const timeLocation = $(this).text();
    //console.log(timeLocation);
  });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
