const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
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
  required: ["name", "email", "password"],
  additionalProperties: false,
  maxProperties: 3,
  minProperties: 3,
};

module.exports = schema;
