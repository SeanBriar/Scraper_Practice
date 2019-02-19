const cheerio = require("cheerio");
const axios = require("axios");

let results = [];
// Make a request via axios to grab the HTML body from the site of your choice
axios.get("http://feministing.com/").then(function(response) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  let $ = cheerio.load(response.data);

  // An empty array to save the data that we'll scrape

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works
  $("div.twoCols").children("article").each(function(i, element) {

    let title = $(element).children("header").find("a").text();
    let link = $(element).find("a").attr("href");
    let content = $(element).children().find("div.show-for-small-only").text()

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
      title: title,
      link: link,
      content: content
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  let resultsJSON = JSON.stringify(results, null, 2)
  // resultsJSON.pretty()
  console.log(resultsJSON);
});
