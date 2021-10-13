'use strict';
const app = require('./express/server');
const path = require('path');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));


// Local request handlers.
app.get('/', (req, res) => {
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

// Route Files.
let sitemap = require('./routes/sitemap');
let page1 = require('./routes/page1');
let page2 = require('./routes/page2');
let page3 = require('./routes/page3');
let page4 = require('./routes/page4');
app.use('/sitemap.xml', sitemap);
app.use('/page2', page2);
app.use('/page3', page3);
app.use('/page4', page4);

// Start Server.
let port = 3005;
app.listen(port, function(){
  console.log(`Server started on port ${port}...`);
});
