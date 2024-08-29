const schema = {
  type: "object",
  properties: {
    email: {
      type: "string",
      format: "email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    },
    password: {
      type: "string",
      minLength: 8,
    },
  },
  required: ["email", "password"],
  additionalProperties: false,
  maxProperties: 2,
  minProperties: 2,
};

module.exports = schema;
