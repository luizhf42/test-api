const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

const connectToDb = () => {
	const database = client.db("teste");
	const collection = database.collection("users");
	return collection;
};

exports.getUsers = async () => {
	try {
		const users = connectToDb();
		const data = await users.find({}).toArray();
		return data;
	} catch (error) {
		throw new Error(error);
	} finally {
		client.close();
	}
};

exports.getUserByName = async (name) => {
	try {
		const users = connectToDb();
		const data = await users.findOne({ name: name });
		return data;
	} catch (error) {
		throw new Error(error);
	} finally {
		await client.close();
	}
};

exports.insertUser = async (name, age) => {
	try {
		const users = connectToDb();
		const document = {
			name: name,
			age: age,
		};

		const data = await users.insertOne(document);
		return data;
	} catch (error) {
		throw new Error(error);
	} finally {
		await client.close();
	}
};

exports.deleteUser = async (id) => {
	try {
		const users = connectToDb();
		const document = {
			_id: ObjectId(id),
		};

		const data = await users.deleteOne(document);
		return data;
	} catch (error) {
		throw new Error(error);
	} finally {
		await client.close();
	}
};

exports.updateUser = async (id, updates) => {
	try {
		const users = connectToDb();
		const document = {
			_id: ObjectId(id),
		};

		const data = await users.updateOne(document, { $set: updates });
		return data;
	} catch (error) {
		throw new Error(error);
	} finally {
		await client.close();
	}
};
