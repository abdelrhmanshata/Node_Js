const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 1,
    },
    age: {
      type: "integer",
      minimum: 0,
    },
    grade: {
      type: "string",
      enum: ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"],
    },
    email: {
      type: "string",
      format: "email",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",
    },
  },
  required: ["name", "age", "grade", "email"],
  additionalProperties: true,
  maxProperties: 5,
  minProperties: 4,
};

module.exports = schema;
