import { response } from '../utils/response';
import { ApiGatewayEvent } from '../utils/types';

export const getSplit = async (event: ApiGatewayEvent) => {
  const { pathParameters } = event;
  const splitId = pathParameters?.splitId ?? "unknown";
  
  // TODO: Implement actual split retrieval logic
  // - Validate splitId
  // - Query DynamoDB
  // - Return split data or 404
  
  return response(200, {
    splitId,
    message: "Split retrieved (dummy response)",
    split: {
      status: "OPEN",
      createdAt: new Date().toISOString(),
      link: "https://example.com/split/demo",
    },
  });
};

