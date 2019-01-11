const express = require('express')
const app = express()
const port = 5000
var path = require('path')

app.use(express.static('public'))

app.use(function(req, res) {
    res.redirect('/pages/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
