'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
// Link to views folder.
// Home route.
app.get('/', (req, res) => {
    let id = req.query.id;
    if(id){
        let url = 'https://cloud.nextagc.com/?id='+id+'&niche=cloud';
        let settings = { method: "Get" };
        fetch(url, settings)
        .then(res => res.text())
        .then((text) => {
            res.status(200).send(text);   
        });        
    }else{
        res.sendFile(path.join(__dirname+'/index.html'));
    }
});

// Other routes.
app.get('/main-sitemap.xsl', function(req, res){
  res.sendFile('main-sitemap.xsl');
});
app.get('/sitemap.xml', function(req, res){
    let hostName = req.headers['x-forwarded-proto'] + "://" + req.headers.host;
    res.header('Content-Type', 'application/xml');
    let url = "https://db.blitarkab.go.id/id/";
    let settings = { method: "Get" };
    fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        res.write('<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet type="text/xsl" href="'+ hostName + '/main-sitemap.xsl"?>\n  <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');
        json.forEach(function(json) {
            res.write(" <url>\n"), res.write("   <loc>" + hostName+'/?id=A4999'+json + "</loc>\n"), res.write("   <lastmod>" + (new Date).toISOString() + "</lastmod>\n"), res.write(" </url>\n")
        }),
        res.write("</urlset>"), res.end();
    });
});


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda (express/server.js)

module.exports = app;
module.exports.handler = serverless(app);
