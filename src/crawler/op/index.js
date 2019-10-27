
var request = require("request");
var cheerio = require('cheerio');

const url = "https://manhua.fzdm.com/02/953/";

export default function getOp() {
    // fetch(url)
    request(url, (error, resp, body) => {
        if (!error && resp.statusCode === 200) {
            getBody(body)
        }
    })
    console.log('1')
}


function getBody(body) {
    console.log(body)
}

//
//https://manhua.fzdm.com/02/953/index_1.html