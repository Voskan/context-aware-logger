"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
describe("Logger", () => {
    let logger;
    beforeEach(() => {
        logger = new index_1.Logger();
    });
    it("should allow adding transports", () => {
        const transport = new index_1.ConsoleTransport();
        expect(() => logger.addTransport(transport)).not.toThrow();
    });
    it("should log messages through all transports", () => {
        const transport = new index_1.ConsoleTransport();
        const spy = jest.spyOn(transport, "log");
        logger.addTransport(transport);
        logger.info("Test message");
        expect(spy).toHaveBeenCalledWith(expect.stringContaining("Test message"), "info", expect.anything());
    });
});
