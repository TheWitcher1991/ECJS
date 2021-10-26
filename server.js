const express = require('express'),
      path    = require('path')

let app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.listen(8000);
