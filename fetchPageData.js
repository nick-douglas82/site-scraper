const axios = require('axios');
const cheerio = require('cheerio');
const { storeData } = require('./storeData');

function fetchPageData(parsedURL) {
  let url = `https:${parsedURL}`
  axios(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const meta = {};

    const title = $('.ResAts__card h2').text().trim();
    meta.title = title;

    const posInfo = $('.posInfoList li');
    posInfo.each(function() {
      const key = $(this).find('.posInfo__Title').text().trim().toLowerCase().replace(' ', '_');
      const value = $(this).find('.posInfo__Value').text();
      meta[key] = value;
    });

    meta.type = meta.department.toLowerCase().includes('clinical') ? 'Clinical' : 'Support';

    $('.BambooRichText p span[style*="font-weight: bold"]').each(function(index) {
      if ($(this).text().toLowerCase() === 'your new role') {
        meta.description = $(this).parent().next().text();
      }
    })

    return meta;
  })
  .then(data => {
    // store it
    storeData(data);
  })
}

module.exports = {
  fetchPageData
}
