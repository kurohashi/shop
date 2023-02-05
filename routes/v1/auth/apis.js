let products = require("../../../controllers/products.controller");
let customers = require("../../../controllers/customers.controller");
let auth = require("../../../utils/auth");

// The route urls presented here are going to  
module.exports = function (app) {
	app.route("/product")
		.post(products.create)
		.put(products.update)
		.delete(products.remove);
	app.route("/purchase")
		.post();
	app.route("/customer")
		.get(auth.isAdmin)
		.post();
}


