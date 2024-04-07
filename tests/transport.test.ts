import { ConsoleTransport } from "../src/index";

jest.mock("fs", () => ({
  promises: {
    appendFile: jest.fn().mockResolvedValue(void 0), // Mocks a promise that resolves to undefined
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
      const transport = new ConsoleTransport();

      transport.log("Test message", "info");

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining("Test message")
      );
    });
  });
});
