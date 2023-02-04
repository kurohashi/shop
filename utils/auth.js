let conf = require("../configs/app.conf");
let send = require("../configs/response.conf");
var jwt = require('jsonwebtoken');
let console = conf.console;

exports.isAuthenticated = function (req, res, cb) {
	let auth = req.headers.authorization;
	if (auth.indexOf("Bearer ") == 0) {
		auth = auth.substring(7);
	}
	auth = auth.trim();
	if (!jwt.verify(auth))
		return send.unauthorized(res, "token expired");
	req.user = jwt.decode(auth);
	cb(null, req, res);
}