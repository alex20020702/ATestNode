const express = require('express');


const APIrouter = require('./scripts/API.js').router;

// parse application/x-www-form-urlencoded
//const urlParser = urlencoded({ extended: false });
// parse application/json
//const jsonParser = json();

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('static'));

app.use('/users/', APIrouter);

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(5000);