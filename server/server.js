
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 8000;
const bodyParser = require('body-parser');
const yamlController = require('./yamlController.js');
const sdkController = require('./sdkController.js');


// const http = require('http');
// const server = http.createServer(app);
//const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addpod', yamlController.addPod, yamlController.podCreator, (req, res, err) => {
    return res.status(200).send("pod yaml created");
  });

app.post('/createIAMRole', sdkController.createIAMRole, (req, res, err) => {
  return res.status(200).send("IAMRole created");
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


