'use strict';
var send = require("../configs/response.conf");
var conf = require("../configs/app.conf");
var lib = require("../utils/lib");
let console = conf.console;


module.exports = {
	create, read, update, remove,
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function create(req, res) {
	(async _ => {
		let data = req.body;
		if (!(await lib.validate(data, "product")))
			return send.invalid(res, "invalid data");
		console.log("product inserting", JSON.stringify(data));
		await conf.collections.products.insertOne(data);
		return send.ok(res, data);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function read(req, res) {
	(async _ => {
		let sort = { price: -1 };
		if (req.query.sort) {
			let dir = -1;
			if (req.query.dir == "asc")
				dir = 1;
			sort = { [req.query.sort]: dir };
		}
		delete req.query.sort;
		delete req.query.dir;
		let limits = conf.limits.products;
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
			query.$or = [{ name: new RegExp(req.query.search, "i") }, { category: new RegExp(req.query.search, "i") }];
			delete req.query.search;
		}
		if (!(isNaN(req.query.minPrice) && isNaN(req.query.maxPrice))) {
			let min = req.query.minPrice;
			let max = req.query.maxPrice;
			min = Number(min);
			max = Number(max);
			if (min > max)
				return send.noData(res);
			query.price = { $gte: min, $lte: max };
		}
		delete req.query.minPrice;
		delete req.query.maxPrice;

		Object.assign(query, req.query);

		console.log("GET products", JSON.stringify(query));
		let products = await conf.collections.products.find(query).sort(sort).skip(skip).limit(limits).project({ _id: 0 }).toArray();
		return send.ok(res, products);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function update(req, res) {
	(async _ => {
		if (!req.query.sku)
			return send.invalid(res);
		let query = { sku: req.query.sku };
		let update = { $set: req.body };
		if (req.body.count && !isNaN(req.body.count) && req.body.count > 0) {
			update.$inc = { count: req.body.count };
		}
		delete req.body.count;
		console.log("updating product", query, JSON.stringify(update));
		await conf.collections.updateOne(query, update);
		return send.ok(res, data);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
function remove(req, res) {
	(async _ => {
		if (!req.query.sku)
			return send.invalid(res);
		let query = { sku: req.query.sku };
		await conf.collections.products.deleteOne(query);
		return send.ok(res);
	})().catch(err => {
		console.error(err);
		send.serverError(res);
	});
}