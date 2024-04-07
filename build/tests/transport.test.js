"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../src/index");
jest.mock("fs", () => ({
    promises: {
        appendFile: jest.fn().mockResolvedValue(void 0),
        open: jest.fn().mockResolvedValue({
            // Mocks a promise that resolves to an object
            close: jest.fn().mockResolvedValue(void 0), // Mocks closing the file, resolving to undefined
        }),
    },
}));
jest.mock("node-fetch", () => jest.fn());
describe("Transports", () => {
    describe("ConsoleTransport", () => {
        it("should log messages to console", () => {
            const consoleSpy = jest.spyOn(console, "log");
            const transport = new index_1.ConsoleTransport();
            transport.log("Test message", "info");
            expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Test message"));
        });
    });
});
