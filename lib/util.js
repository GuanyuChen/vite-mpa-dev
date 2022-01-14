const { resolve } = require("path");
const { existsSync, readdirSync, statSync } = require("fs");

function verifyParams({ webappDirectory, port }) {
	if (!existsSync(webappDirectory)) {
		throw new Error(`${webappDirectory} not exist`);
	}

	if (port && isNaN(port)) {
		throw new Error(`port ${port} is invalid`);
	}
}

function initParams({ webappDirectory, port }) {
	const entryList = [];

	const entryDirectory = resolve(webappDirectory, "static/src/js");

	getChildrenDirList(entryDirectory, entryList);

	const entryMapList = entryList.map((item) => {
		return { input: item };
	});

	console.log("======= entryMapList =======");
	console.log(entryMapList);

	return { entryMapList, webappDirectory, port };
}

function getChildrenDirList(dir = "", entryList = []) {
	const list = readdirSync(dir);

	for (let index = 0; index < list.length; index++) {
		const item = list[index];

		const fullPath = resolve(dir, item);

		const isFile = statSync(fullPath).isFile();

		if (isFile) {
			// 以各个路径中的 main.js 或 main.jsx 为入口
			if (item.indexOf("main.js") > -1 || item.indexOf("main.jsx") > -1) {
				entryList.push(fullPath);
			}
		} else {
			getChildrenDirList(fullPath, entryList);
		}
	}
}

module.exports = {
	verifyParams,
	getChildrenDirList,
	initParams,
};
