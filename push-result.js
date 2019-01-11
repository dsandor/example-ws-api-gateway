const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
  console.log('push response event:', event);

  const message = JSON.parse(event.Records[0].Sns.Message);

  console.log('message:', message);

  const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: message.endpoint
  });

  await apigwManagementApi.postToConnection({ ConnectionId: message.connectionId, Data: JSON.stringify(message) }).promise();

  return { statusCode: 200, body: 'Data sent to client.'};
};
