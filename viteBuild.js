const { createServer, defineConfig } = require("vite");
const { resolve } = require("path");
const react = require("@vitejs/plugin-react");
const externalGlobals = require("rollup-plugin-external-globals");

/**
 * TODO: 多页面配置
 * TODO: custom Server 配置
 */
module.exports = async ({ entryMapList, webappDirectory }) => {
	const server = await createServer(
		defineConfig({
			server: {
				port: 5010,
			},
			root: resolve(webappDirectory, "static/src/"),
			public: resolve(webappDirectory, "static/src/"),
			plugins: [
				react(),
				externalGlobals({
					"react-dom": "ReactDOM",
					react: "React",
					redux: "Redux",
					"react-redux": "ReactRedux",
					"redux-thunk": "ReduxThunk",
				}),
			],
			build: {
				// 在 outDir 中生成 manifest.json
				manifest: true,
				rollupOptions: [...entryMapList],
			},
		})
	);

	await server.listen();

	server.printUrls();
};
