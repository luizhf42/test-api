const userControllers = require("../controllers/userControllers");

module.exports = (app) => {
	app.get("/users", userControllers.get);
	app.get("/users/getBy", userControllers.getByName);
	app.post("/users/add", userControllers.addUser);
  app.put("/users/update", userControllers.updateUser);
	app.delete("/users/delete", userControllers.deleteUser);
};
