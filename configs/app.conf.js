
module.exports = new (function () {
	Object.assign(this, require("../utils/parse.arguments"));
	this.console = require("tracer").colorConsole();
	this.appid = "986146a7a343594be0e9aa78fcb5a8808cd3472c";

	// Put the env variables for production inside
	if (this.env == "prod") {
		this.appid = "";		// put production appid here
	}

	this.crypto = {
		gen: {
			salt: "general-random-salt",
			iterations: 10,
			keyLen: 80,
		},
		jwt: {
			secKey: "ABCDKALIPEREFGHZWKVUTSRQPONNMLJI0987654321",
		}
	};

	
	this.limits = {
		products: 50,
		customers: 10,
	};

	this.allowedFields = ((type, data) => {
		let mapper = {};
		return mapper[type];
	});

	this.requiredFields = ((type, data) => {
		let mapper = {
			product: ["sku", "name", "category", "count", "price"],
			customer: ["phone", "name", "sex", "address"],
		};
		return mapper[type];
	});

	this.auth = {
		update: ["agent", "admin"],
		admin: ["admin"],
	};
})();
