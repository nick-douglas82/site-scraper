const axios = require('axios');
const cheerio = require('cheerio');
const { truncateDatabase } = require('./database');
const { fetchPageData } = require('./fetchPageData');

truncateDatabase();
axios('https://doctorcareanywhere.bamboohr.com/jobs/embed.php')
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html);

  const urls = [];
  const resultsLI = $('.BambooHR-ATS-Jobs-List li');
  resultsLI.each(function() {
    urls.push($(this).find('a').attr('href'))
  });

  return urls;
})
.then(urls => {
  urls.forEach(function(url) {
    fetchPageData(url)
  })
})
