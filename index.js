const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const WhpUrl = "https://www.thewarehouseproject.com/calendar_2022";
axios(WhpUrl).then((res) => {
  const html = res.data;
  const $ = cheerio.load(html);
  $(".calendar_artists", html).each(function() {
    console.log($(this).text());
  });

  // class="calendar_artists "
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
