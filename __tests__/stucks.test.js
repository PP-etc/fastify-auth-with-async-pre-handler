const httpStatusCodes = require("http-status-codes");

describe("fastify-auth", () => {
  it("stucks", async done => {
    const fastify = require("fastify")();

    fastify
      .decorate("verifyJWTandLevel", async function(request, reply) {
      })
      .register(require("fastify-auth"))
      .after(() => {
        fastify.route({
          method: "POST",
          url: "/auth-multiple",
          preHandler: fastify.auth([
            fastify.verifyJWTandLevel
          ]),
          handler: (req, reply) => {
            req.log.info("Auth route");
            reply.send({ hello: "world" });
          }
        });
      });

    const response = await fastify.inject({
      method: "POST",
      url: "/auth-multiple"
    });
    expect(response.statusCode).toBe(httpStatusCodes.OK);
    expect(response.payload).toMatchSnapshot();
    done();
  });
});
