// Simple Express server setup to serve for local testing/dev API server
const compression = require('compression');
const mongoose = require('mongoose')
const helmet = require('helmet');
const express = require('express');
const routeUrl = require('./routes/routes')
var bodyParser = require('body-parser')
const app = express();
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3002;
const DIST_DIR = './dist';

app.use(express.static(DIST_DIR));
app.use(routeUrl)
// app.get('/api/v1/endpoint', (req, res) => {
//     res.json({ success: true });
// });

mongoose.connect('mongodb+srv://subendu_mal:rudra@cluster0.frghlpa.mongodb.net/?retryWrites=true&w=majority', ()=>{
 console.log(' data base conected ');
})
app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/api/v1/endpoint`
    )
);
