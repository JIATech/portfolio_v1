// Dynamic function for validating schema and property
const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    // Validate schema
    const { error } = schema.validate(req[property], { abortEarly: false });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Validate property
    if (!req[property]) {
      return res.status(400).json({ error: `${property} is required` });
    }

    next();
  };
};

module.exports = validatorHandler;
