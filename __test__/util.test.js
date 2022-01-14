const { verifyParams } = require("../lib/util");

describe("verifyParams", () => {
	test("verifyParams throw Error", () => {
		expect(() => verifyParams()).toThrow("options is required");

		expect(() => verifyParams({})).toThrow(
			"-w webappDirectory is required"
		);

		expect(() => verifyParams({ webappDirectory: "/aaaa/ttttt" })).toThrow(
			"/aaaa/ttttt not exist"
		);

		expect(() =>
			verifyParams({ webappDirectory: __dirname, port: "test" })
		).toThrow("The port parameter type needs to be number Actually test");
	});

	test("verifyParams passed", () => {
		const data1 = verifyParams({ webappDirectory: __dirname });
		expect(data1).toBeUndefined();

		const data2 = verifyParams({ webappDirectory: __dirname, port: 5009 });
		expect(data2).toBeUndefined();
	});
});
