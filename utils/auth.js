let conf = require("../configs/app.conf");
let send = require("../configs/response.conf");
var jwt = require('jsonwebtoken');
let console = conf.console;

module.exports = {
	isAuthenticated: function (req, res, cb) {
		let auth = req.headers.authorization;
		if (auth.indexOf("Bearer ") == 0) {
			auth = auth.substring(7);
		}
		auth = auth.trim();
		if (!jwt.verify(auth, conf.crypto.jwt.secKey))
			return send.unauthorized(res, "token expired");
		let user = jwt.decode(auth);
		if (!conf.auth.update.includes(user.role))
			return send.unauthorized(res, "user not authorized");
		req.user = user;
		cb(null, req, res);
	},
	isAdmin: function (req, res, cb) {
		if (!conf.auth.admin.includes(req.user.role))
			return send.unauthorized(res, "user not authorized");
		cb(null, req, res);
	}
}