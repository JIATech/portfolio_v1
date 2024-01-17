/* eslint-disable prettier/prettier */
const fs = require("fs");
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
  res.status(500);

  // Send a JSON response with the error message
  res.json({ error: err.message });

  // Call the next middleware function
  next();
}

module.exports = errorHandler;

