import express from 'express';
//import { urlencoded, json } from 'body-parser';

import { APIrouter } from 'API';

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