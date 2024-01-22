/* eslint-disable prettier/prettier */
const fs = require("fs");
const boom = require('boom');

function errorHandler(err, req, res, next) {
  // Log the error to a file
  fs.appendFile(
    "error.log",
    `${new Date().toISOString()}: ${err}\n`,
    (error) => {
      if (error) {
        console.error("Error logging failed:", error);
      }
    },
  );

  // Handle the error here
  console.error(err);

  // Set the appropriate status code
  const statusCode = err.isBoom ? err.output.statusCode : 500;
  res.status(statusCode);

  // Send a JSON response with the error message
  const errorMessage = err.isBoom ? err.output.payload.message : err.message;
  res.json({ error: errorMessage });

  // Call the next middleware function
  next();
}

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function ormErrorHandler(err, req, res, next) {
  if (err.name === "SequelizeValidationError") {
    const errors = err.errors.map((e) => e.message);
    next(boom.badRequest(errors));
  }
  next(err);
}



module.exports = { errorHandler, logErrors, boomErrorHandler, ormErrorHandler };

