const { logger } = require("../src/middleware/logger.js");

describe("Logger Middleware", () => {
    it("logs requests", async () => {
        jest.spyOn(console, 'log').mockImplementation()
        const req = {
          method: 'GET',
          url: '/',
        }
        const res = {}
        const next = () => {}

        logger(req, res, next)

        expect(console.log).toHaveBeenCalledWith('GET', '/')
    });
    it("calls next", async () => {
      const req = {
        method: 'GET',
        url: '/',
      }
      const res = {}
      const next = jest.fn();
      
      logger(req, res, next)

      expect(next).toHaveBeenCalled()
    })
});
