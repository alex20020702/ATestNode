import { MongoClient, ObjectId } from 'mongodb';
import { config } from 'dotenv';
config();

const users = {};

const uri = `mongodb+srv://db_test_user:${process.env.DBpass}@testcluster-t7uy0.mongodb.net/TestApp?retryWrites=true&w=majority`;


users.list = async function (res) {
	MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
		if (err) throw err;
		const collection = client.db('TestApp').collection('Users');

		collection.find().toArray((err, result) => {
			if (err) throw err;
			res(result);
			client.close();
		});
	});
};

users.add = async function (fullName, email) {
	const toAdd = { fullName, email };
	MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
		if (err) throw err;
		const collection = client.db('TestApp').collection('Users');

		collection.insertOne(toAdd, (err) => {
			if (err) throw err;
			client.close();
		});
	});
};

users.update = async function (param, newValue, callback) {
	MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
		if (err) throw err;
		const collection = client.db('TestApp').collection('Users');

		if (param._id) {
			param._id = ObjectId(param._id);
		}

		collection.updateOne(param, { $set: newValue }, (err, result) => {
			if (err) throw err;
			console.log('Updated');
			callback(result);
			client.close();
		});
	});
};

export default users;