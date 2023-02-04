let products = require("../../../controllers/products.controller");
let customers = require("../../../controllers/customers.controller");

// The route urls presented here are going to  
module.exports = function (app) {
	app.route("/product")
		.post()
		.put()
		.delete();
	app.route("/purchase")
		.post();
	app.route("/customer")
		.get()
		.post();
}

