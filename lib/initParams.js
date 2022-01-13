const { resolve } = require("path");
const { readdirSync, statSync } = require("fs");

function initParams({ webappDirectory }) {
	const entryList = [];

	const entryDirectory = resolve(webappDirectory, "static/src/js");

	getChildrenDirList(entryDirectory, entryList);

	const entryMapList = entryList.map((item) => {
		return { input: item };
	});

	console.log("=======entryMapList=======");
	console.log(entryMapList);

	return { entryMapList, webappDirectory };
}

function getChildrenDirList(dir = "", entryList = []) {
	const list = readdirSync(dir);

	for (let index = 0; index < list.length; index++) {
		const item = list[index];

		const fullPath = resolve(dir, item);

		const isFile = statSync(fullPath).isFile();

		if (isFile) {
			if (item.indexOf("main.") > -1) {
				entryList.push(fullPath);
			}
		} else {
			getChildrenDirList(fullPath, entryList);
		}
	}
}

module.exports = initParams;
