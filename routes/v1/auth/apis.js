let products = require("../../../controllers/products.controller");
let customers = require("../../../controllers/customers.controller");
let purchases = require("../../../controllers/purchases.controller");
let auth = require("../../../utils/auth");

// The route urls presented here are going to  
module.exports = function (app) {
	app.route("/product")
		.post(products.create)
		.put(products.update)
		.delete(products.remove);
	app.route("/purchase")
		.post(purchases.purchase);
	app.route("/customer")
		.get(auth.isAdmin, customers.read)
		.post(customers.create)
		.put(customers.update)
		.delete(customers.remove);
}


