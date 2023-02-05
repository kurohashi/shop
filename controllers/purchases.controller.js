'use strict';
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
var lib = require("../utils/lib");
let console = conf.console;


module.exports = {
	purchase,
}

/**
 * An item is purchased
 * 1. Verify the customer and the product.
 * 2. Insert a new purchase record.
 * 3. Decrease the inventory
 * @param {*} req 
 * @param {*} res 
 */
function purchase(req, res) {
	(async _ => {
		let data = {
			...req.body,
			agentId: req.user.agentId,
		};
		if (!(await lib.validate(data, "purchase")))
			return send.invalid(res, "missing info");
		data = await lib.filterData(data, "purchase");
		data.ts = new Date();
		let product = conf.collections.products.find({ sku: data.sku }).toArray();
		if (!product.length)
			return send.invalid(res, "The product doesn't exist");
		let customer = conf.collections.customers.find({ id: data.customerId }).toArray();
		if (!customer.length)
			return send.invalid(res, "The customer doesn't exist. First, add the customer then try again");
		await conf.collections.purchases.insertOne(data);
		await conf.collections.products.updateOne({ sku: data.sku }, { $inc: { count: -1 } });
		send.ok(res);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}