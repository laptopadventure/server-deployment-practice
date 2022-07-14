const { validator } = require('../src/middleware/validator')

describe("Validator Middleware", () => {
    it("rejects bad requests", async () => {
        jest.spyOn(console, 'log').mockImplementation()
        const badReq = {
          query: {
            bad: 'hello',
          }
        }
        const res = {}
        const next = () => {}

        expect(() => {
          validator(badReq, res, next)
        }).toThrow()
    });
    it("calls next on valid requests", async () => {
      const req = {
        method: 'GET',
        url: '/person?name=hugort',
        query: {
          name: 'hugort',
        }
      }
      const res = {}
      const next = jest.fn();

      validator(req, res, next)

      expect(next).toHaveBeenCalled()
    })
});
