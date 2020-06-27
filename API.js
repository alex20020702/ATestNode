import { Router } from 'express';
import { /* urlencoded,*/ json } from 'body-parser';
import * as users from './users.js';

// parse application/x-www-form-urlencoded
///const urlParser = urlencoded({ extended: false });
// parse application/json
const jsonParser = json();

const router = new Router();

router.use(jsonParser);


router.route('/')
	.post((req, res) => {
		try {
			users.add(req.body.fullName, req.body.email);
			//res.send( { 'fullName': req.body.fullName, 'email': req.body.email });
			res.redirect('/users/');
		}
		catch (err) {
			res.send(`{ "Error": "${err}"}`);
		}
	})
	.get((req, res) => {
		try {
			users.list((result) => {
				res.render('index', {'list': result});
			});
		}
		catch (err) {
			res.send(`{ "Error": "${err}"}`);
		}
	})
	.put((req, res) => {
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

export default router;