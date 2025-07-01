const program = require("commander");
const init = require("./lib/init");

program
	.version(require("./package.json").version)
	.option("-w, --webapp-directory [webapp directory]")
	.option("-p, --port [port]")
	.parse(process.argv);

init(program._optionValues);
