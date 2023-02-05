let products = require("../../../controllers/products.controller");
let customers = require("../../../controllers/customers.controller");

// The route urls presented here are going to  
module.exports = function (app) {
    app.route("/product")
		.get(products.read);
    app.route("/customer")
		.get();
}