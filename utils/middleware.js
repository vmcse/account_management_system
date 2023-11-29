const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Body:", request.body);
  console.log("Path:", request.path);
  console.log("---------------------------------------");
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "token expired" });
  } else if (error.name === "MongoServerError") {
    return response.status(400).json({ error: "username must be unique" });
  }

  next(error);
};

module.exports = {
  requestLogger,
  errorHandler,
};
