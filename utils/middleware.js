const requestLogger = (request, response, next) => {
  console.log(`Method: ${request.method}`);
  console.log(`Body: ${request.body}`);
  console.log(`Path: ${request.path}`);
  console.log("---------------------------------------");
};

module.exports = {
  requestLogger,
};
