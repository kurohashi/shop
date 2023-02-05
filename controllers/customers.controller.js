'use strict';
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
let console = conf.console;


module.exports = {
	create, read, update, remove
}

/**
 * Read one customer (from open API) or all customers (from admin API)
 * @param {*} req 
 * @param {*} res 
 */
function read(req, res) {
	(async _ => {
		let limits = conf.limits.customers;
		let skip = 0;
		if (!isNaN(req.query.limit)) {
			limits = Number(req.query.limit);
		}
		delete req.query.limit;
		if (!isNaN(req.query.skip)) {
			skip = Number(req.query.skip);
		}
		delete req.query.skip;
		let query = { };
		if (req.query.search) {
			query.$or = [{ name: new RegExp(req.query.search, "i") }, { address: new RegExp(req.query.search, "i") }];
			delete req.query.search;
		}

		Object.assign(query, req.query);

		console.log("GET customers", JSON.stringify(query));
		let customers = await conf.collections.customers.find(query).skip(skip).limit(limits).project({ _id: 0 }).toArray();
		return send.ok(res, customers);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}

/**
 * Create a new customer
 * @param {*} req 
 * @param {*} res 
 */
function create(req, res) {
	(async _ => {
		let data = req.body;
		if (!(await lib.validate(data, "customer")))
			return send.invalid(res, "invalid data");
		let sysData = {
			id: lib.createId(null, 10),
		};
		Object.assign(data, sysData);
		console.log("customer inserting", JSON.stringify(data));
		await conf.collections.customers.insertOne(data);
		return send.ok(res, data);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}

/**
 * Update an existing customer
 * @param {*} req 
 * @param {*} res 
 */
function update(req, res) {
	(async _ => {
		if (!req.query.id)
			return send.invalid(res);
		let query = { id: req.query.id };
		let update = { $set: req.body };
		console.log("updating product", query, JSON.stringify(update));
		await conf.collections.customers.updateOne(query, update);
		return send.ok(res, data);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}

/**
 * Delete an existing customer
 * @param {*} req 
 * @param {*} res 
 */
function remove(req, res) {
	(async _ => {
		if (!req.query.id)
			return send.invalid(res);
		let query = { id: req.query.id };
		await conf.collections.customers.deleteOne(query);
		return send.ok(res);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}