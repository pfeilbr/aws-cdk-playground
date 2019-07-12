const AWS = require("aws-sdk");
const kinesis = new AWS.Kinesis();

module.exports.handler = async event => {
  console.log(event);
  const putRecordParams = {};
  const resp = await kinesis
    .putRecord({
      Data: JSON.stringify(event),
      StreamName: process.env.STREAM_NAME,
      PartitionKey: "0"
    })
    .promise();
  console.log(resp);
  return { statusCode: 200, body: JSON.stringify(resp) };
};
