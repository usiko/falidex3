var path = require('path');
var express = require('express');
var app = express();

var htmlPath = path.join(__dirname, '../www');
console.log(htmlPath);
app.use(express.static(htmlPath));
app.all('*', (req, res, next) => {
    res.redirect('/')
})
var server = app.listen(process.env.PORT || 8080, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('listening on http://' + host + ':' + port + '/');
});