
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 8000;
const bodyParser = require('body-parser');
const yamlController = require('./yamlController.js');

// const http = require('http');
// const server = http.createServer(app);
//const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/addpod', yamlController.addPod, yamlController.podCreator, (req, res, err) => {
    return res.status(200).send("pod yaml created")
  });




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


// //saves secret in 2 tables — secrets and mastersecrets
// app.post('/secret', eventController.saveDream, eventController.saveDreamInMaster, (req, res, err) => {
//   res.sendStatus(200);
// });

// app.get('/secret', eventController.getDream, eventController.flagDream, (req, res, err) => {
//   res.status(200).json(res.locals.secret);
// })

// app.get('/dreamtable', eventController.getAllDreams, (req, res, err) => {
//   res.status(200).json(res.locals.allDreams);
// })

// app.delete('/delete', eventController.deleteDream, eventController.flagDeletedDream, (req, res, err) => {
//   res.sendStatus(200);
// })