const db = require("../database/usersDb");

exports.get = async (req, res) => {
	const data = await db.getUsers();
	res.status(200).send(data);
};

exports.getByName = async (req, res) => {
	const name = req.query.name;
	if (name) {
		const data = await db.getUserByName(name);
		if (!data) res.status(404).send(`User with name ${name} not found`);
		else res.status(200).json(data);
	} else throw new Error("Missing name argument");
};

exports.addUser = async (req, res) => {
	const name = req.query.name;
	const age = Number(req.query.age);
	if (!name) throw new Error("Missing name argument");
	else if (!age) throw new Error("Missing age argument");
	else {
		const data = await db.insertUser(name, age);
		res
			.status(200)
			.send(`User added to the DB with the _id: ${data.insertedId}`);
	}
};

exports.deleteUser = async (req, res) => {
	const id = req.query.id;
	if (id) {
		await db.deleteUser(id);
		res.status(200).send(`Successfully deleted user with the _id: ${id}`);
	} else throw new Error("Missing user ID argument");
};

exports.updateUser = async (req, res) => {
	const id = req.query.id;
	const name = req.query.name;
	const age = Number(req.query.age);

	const updates = {}
	if (name) updates.name = name;
	if (age >= 0) updates.age = age;

	if (id) {
		await db.updateUser(id, updates);
		res.status(200).send(`Successfully updated the user with the _id: ${id}`);
	} else throw new Error("Missing user ID argument");
};
