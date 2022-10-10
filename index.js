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
  const beforeEventNamesArr = [];
  $(".calendar_name", html).each(function () {
    const eventNames = $(this).text();
    beforeEventNamesArr.push({ eventNames });
  });
  const eventNamesArr = beforeEventNamesArr.map((eventName) =>
    eventName.eventNames.replace(/\s\s+/g, "")
  );
  //console.log(eventNamesArr);

  // GET ARTIST LINEUP
  const artistLineupArr1 = [];
  $(".calendar_artists", html).each(function () {
    const artistLineup = $(this).text();
    artistLineupArr1.push(artistLineup);
  });
  const artistLineupArr2 = artistLineupArr1.map((lineup) =>
    lineup
      .replace(/\s\s+/g, "")
      .replace(/B2B/g, "")
      .replace(/b2b/g, "")
      .replace(/\|/g, "")
      .replace(/\//g, "")
      .replace(/\[LIVE\]/g, "")
      .replace(/Concourse:/g, "")
      .replace(/Depot:/g, "")
  );
  artistLineupArr2.shift();
  const artistLineupArr3 = artistLineupArr2.filter((lineup) => {
    return lineup !== "";
  });
  // console.log(artistLineupArr3);

  // const newArr = artistLineupArr2.map((lineup) =>
  //   lineup.replace(/([A-Z])/g, " $1").trim()
  // );

  // GET EVENT TIME AND LOCATION
  const timeLocationArr = [];
  $(".grey", html).each(function () {
    const timeLocation = $(this).text();
    timeLocationArr.push(timeLocation);
  });
  //console.log(timeLocationArr);
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
