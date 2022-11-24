const PORT = 8000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const admin = require("firebase-admin");
const lineupArr = require("./lineupArrays");
const serviceAccount = require("./serviceAccountKeys.json");

const app = express();

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

const WhpUrl = "https://www.thewarehouseproject.com/calendar_2022";
axios(WhpUrl).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);

  // ---------------
  // GET DATES
  let dateArr = [];
  $(".calendar_block_date", html).each(function () {
    const dates = $(this).text();
    dateArr.push(dates);
  });
  dateArr = dateArr.slice(0, 39);

  // SET DATES IN DATABASE
  const datesRef = db.collection("dates").doc("mBeK155o3DJeKf4DkWPB");
  // datesRef.set({ dates2022: dateArr });
  // ---------------

  // ---------------
  // GET EVENT NAMES
  const beforeEventNamesArr = [];
  $(".calendar_name", html).each(function () {
    const eventNames = $(this).text();
    beforeEventNamesArr.push({ eventNames });
  });
  const eventNamesArr = beforeEventNamesArr.map((eventName) =>
    eventName.eventNames.replace(/\s\s+/g, "")
  );
  const eventArr = eventNamesArr.slice(0, 39);

  // SET EVENTS IN DATABASE
  const eventsRef = db.collection("events").doc("oDpZA7vIHtUkO4hXe0je");
  // eventsRef.set({ events2022: eventArr });
  // ---------------

  // ---------------
  // GET ARTIST LINEUP
  $(".calendar_artists", html).each(function () {
    const rawText = $(this).text();
  });

  // SET ARTIST LINEUP IN DATABASE
  const lineupsRef = db.collection("lineups").doc("CrqHeYQEdeQyWtoEZi98");
  // lineupsRef.set({ lineups2022: lineupArr });
  // ---------------

  // ---------------
  // GET EVENT TIME AND LOCATION
  const timeLocationArr = [];
  $(".grey", html).each(function () {
    const timeLocation = $(this).text();
    timeLocationArr.push(timeLocation);
  });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
