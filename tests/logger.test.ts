import { Logger, ConsoleTransport } from "../src/index";

describe("Logger", () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger();
  });

  it("should allow adding transports", () => {
    const transport = new ConsoleTransport();
    expect(() => logger.addTransport(transport)).not.toThrow();
  });

  it("should log messages through all transports", () => {
    const transport = new ConsoleTransport();
    const spy = jest.spyOn(transport, "log");

    logger.addTransport(transport);
    logger.info("Test message");

    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining("Test message"),
      "info",
      expect.anything()
    );
  });
});
