const { Router } = require('express');
const bodyparser = require('body-parser');
const users = require('./users.js');
const router = new Router();

console.log(bodyparser.json());
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: true }));

router.post('/new', (req, res) => {
	try {
		users.add(req.body.fullName, req.body.email);
		//res.send( { 'fullName': req.body.fullName, 'email': req.body.email });
		res.redirect('/users/');
	}
	catch (err) {
		res.send(`{ "Error": "${err}"}`);
	}
});
router.get('/', (req, res) => {
	try {
		users.list((result) => {
			res.render('index', { 'list': result });
		});
	}
	catch (err) {
		res.send(`{ "Error": "${err}" }`);
	}
});
router.post('/update', (req, res) => {
	try {
		users.update({ _id: req.body._id }, { fullName: req.body.fullName }, (result) => {
			console.log(JSON.stringify(result));
			//res.send(`{ ok: true, modifiedCount:${result.modifiedCount}}`);
			res.redirect('/users/');
		});
	}
	catch (err) {
		res.send(`{ "Error": "${err}"}`);
	}
});

module.exports = { router };