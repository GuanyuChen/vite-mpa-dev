const { verifyParams, initParams } = require("./util");
const viteBuild = require("../viteBuild");

function init(options) {
	verifyParams(options);
	viteBuild(initParams(options));
}

module.exports = init;
