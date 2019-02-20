const cheerio = require("cheerio");
const axios = require("axios");

// Holds data that is being scraped
let results = []
let products = []

// Make a request via axios to grab the HTML elements
//Main page scrape
axios.get("http://feministing.com/").then((response) => {
  let finalObj = {}
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


  //Secondary page scrape
  axios.get("https://www.cafepress.com/feministingstore/8351380").then((response)=>{
    let $ = cheerio.load(response.data)

    $("td").children("div.shopResultImage").each((i, element)=>{
      let productLink = $(element).find("a").attr("href")
      let productImage = $(element).find("img").attr("src")

      products.push({
        productLink: productLink,
        productImage: productImage
      })
    })

    let productsJSON = JSON.stringify(products, null, 2)
    console.log(productsJSON)

  })
});
