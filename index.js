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

  // GET EVERYTHING
  const allEventDataArr = [];
  $(".calendar_block", html).each(function () {
    const allEventData = $(this).text();
    allEventDataArr.push(allEventData);
  });

  // GET DATES
  const dateArr = [];
  $(".calendar_block_date", html).each(function () {
    const dates = $(this).text();
    dateArr.push(dates);
  });
  //console.log(dateArr)

  // GET EVENT NAMES
  const eventNamesArr = [];
  $(".calendar_name", html).each(function () {
    const eventNames = $(this).text();
    eventNamesArr.push({ eventNames });
  });
  const newArr = eventNamesArr.map((eventName) =>
    eventName.eventNames.replace(/\s\s+/g, "")
  );
  console.log(newArr);

  // GET ARTIST LINEUP
  const artistLineupArr = [];
  $(".calendar_artists", html).each(function () {
    const artistLineup = $(this).text();
    artistLineupArr.push(artistLineup);
  });
  //console.log(artistLineupArr);

  // GET EVENT TIME AND LOCATION
  const timeLocationArr = [];
  $(".grey", html).each(function () {
    const timeLocation = $(this).text();
    timeLocationArr.push(timeLocation);
  });
  //console.log(timeLocationArr);
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
