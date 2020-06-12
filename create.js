import * as uuid from 'uuid';
import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
	const data = JSON.parse(event.body);

	const params = {
		TableName: process.env.tableName,
		// 'Item' contains the attributes of the item to be created
		// Here are some examples
		// - 'userId': user identities are federated through the
		//             Cognito Identity Pool, we will use the identity id
		//             as the user id of the authenticated user
		// - 'date': current timestamp in seconds since midnight Jan 1, 1970
		// - 'uuid': a unique uuid
		// - 'text': attribute from data passed into function
		Item: {
			userId: event.requestContext.identity.cognitoIdentityId,
			createdDate_machine: Date.now(),
			uuid: uuid.v4(),
			text: data.text,
		},
	};

	await dynamoDb.put(params);

	return params.Item;
});
