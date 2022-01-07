const { build, createServer, defineConfig } = require("vite");
const { VitePluginNode } = require("vite-plugin-node");
const { resolve } = require("path");

/**
 * TODO: 多页面配置
 * TODO: custom Server 配置
 */
module.exports = async () => {
	const server = await createServer(
		defineConfig({
			configFile: false,

			server: {
				port: 5011,
			},
			resolve: {
				alias: [
					{
						find: "sf",
						replacement:
							"Users/guanyu/code/ares-template/njk-webapp-template/static/src",
					},
				],
			},
			build: {
				rollupOptions: {
					input: {
						index: "/Users/guanyu/code/ares-template/njk-webapp-template/views/src/layout/base.njk",
					},
				},
			},
			// plugins: [
			// 	...VitePluginNode({
			// 		adapter: "koa",
			// 		appPath:
			// 			"/Users/guanyu/code/ares-template/njk-webapp-template/server.js",
			// 		exportName: "server",
			// 	}),
			// ],
		})
	);

	await server.listen();

	server.printUrls();
};
