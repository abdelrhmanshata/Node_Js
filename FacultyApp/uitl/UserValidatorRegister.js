const Ajv = require("ajv").default;
const addFormats = require("ajv-formats");
const schema = require("../Schema/user_schema_register");
const ajv = new Ajv();
addFormats(ajv);
module.exports = ajv.compile(schema);
