const AWS = require('aws-sdk');
const sns = new AWS.SNS();
const uuid = require('uuid');

module.exports.handler = async (event) => {
  console.log('long running process request event:', event);

  const requestThatTakesALongTime = {
    connectionId: event.requestContext.connectionId,
    requestId: uuid.v4(),
    someOtherData: { foo: 'bar' },
    endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
  };

  var params = {
    Message: JSON.stringify(requestThatTakesALongTime),
    TopicArn: process.env.LONG_RUNNING_PROCESS_SNS_TOPIC
  };

  await sns.publish(params).promise();

  console.log('sent sns message:', params);

  return {
    body: JSON.stringify({ result: 'success' }),
    statusCode: 200,
    isBase64Encoded: false
  };
};
