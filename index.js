const program = require("commander");
const initParams = require("./lib/initParams");
const viteBuild = require("./viteBuild");

program
	.version(require("../package").version)
	.option("-w, --webapp-directory [webapp directory]")
	.parse(process.argv);

viteBuild(initParams(program._optionValues));
