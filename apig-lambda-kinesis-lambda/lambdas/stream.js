const AWS = require("aws-sdk");

module.exports.handler = async event => {
  // base64 decode kinesis redcord data
  for (const rec of event.Records) {
    rec.kinesis.data = new Buffer(rec.kinesis.data, "base64").toString("utf8");
  }
  console.log(JSON.stringify(event, null, 2));
};
