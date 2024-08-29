const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");
const schema = require("../Schema/student_schema");
const ajv = new Ajv();
addFormats(ajv);
module.exports = ajv.compile(schema);
