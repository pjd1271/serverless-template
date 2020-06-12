import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
	const params = {
		TableName: process.env.tableName,
		// 'Key' defines the partition key and sort key of the item to be retrieved
		// - 'pk': partition key example of Identity Pool identity id of the authenticated user
		// - 'sk': sork key from path parameter
		Key: {
			pk: event.requestContext.identity.cognitoIdentityId,
			sk: event.pathParameters.UNIQUE_IDENTIFIER,
		},
	};

	const result = await dynamoDb.get(params);
	if (!result.Item) {
		throw new Error('Item not found.');
	}

	// Return the retrieved item
	return result.Item;
});
