const PORT = 8000;

// TO RUN FILE:
// npm run start
// or
// node ./index
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKeys.json");

const app = express();

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

/*

GET REQUEST FROM DATABASE

let dates = db.collection("dates");
dates.get().then((querySnapshot) => {
  querySnapshot.forEach((document) => {
    console.log(document.data());
  });
});
*/

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

  // ---------------
  // GET DATES
  let dateArr = [];
  $(".calendar_block_date", html).each(function () {
    const dates = $(this).text();
    dateArr.push(dates);
  });
  dateArr = dateArr.slice(0, 34);

  // SET DATES IN DATABASE
  const datesRef = db.collection("dates").doc("mBeK155o3DJeKf4DkWPB");
  datesRef.set({ dates2022: dateArr });
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
  const eventArr = eventNamesArr.slice(0, 34);

  // SET EVENTS IN DATABASE
  const eventsRef = db.collection("events").doc("oDpZA7vIHtUkO4hXe0je");
  eventsRef.set({ events2022: eventArr });
  // ---------------

  // ---------------
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
  // ---------------

  // ---------------
  // GET EVENT TIME AND LOCATION
  const timeLocationArr = [];
  $(".grey", html).each(function () {
    const timeLocation = $(this).text();
    timeLocationArr.push(timeLocation);
  });
  //console.log(timeLocationArr);
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
