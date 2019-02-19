const cheerio = require("cheerio");
const axios = require("axios");

// Holds data that is being scraped
let results = [];

// Make a request via axios to grab the HTML elements
axios.get("http://feministing.com/").then(function(response) {

  // Load the HTML into cheerio and save it to a variable ($ for cheerio)
  let $ = cheerio.load(response.data);


  // Select each element in the HTML body
  $("div.twoCols").children("article").each(function(i, element) {

    let title = $(element).children("header").find("a").text();
    let link = $(element).find("a").attr("href");
    let content = $(element).children().find("div.show-for-small-only").text()

    // Save these results in an object by pushing to results array
    results.push({
      title: title,
      link: link,
      content: content
    });
  });

  //Convert data to JSON object
  let resultsJSON = JSON.stringify(results, null, 2)

  console.log(resultsJSON);
});
