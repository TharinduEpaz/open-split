import { response } from '../utils/response';
import { ApiGatewayEvent, CreateSplitRequest } from '../utils/types';



export const createSplit = async (event: ApiGatewayEvent) => {
  const { body } = event;
  
  if (!body) {
    return response(400, {
      message: "Request body is required",
    });
  }

  let requestBody: CreateSplitRequest;
  try {
    requestBody = JSON.parse(body) as CreateSplitRequest;
  } catch (error) {
    return response(400, {
      message: "Invalid JSON in request body",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }

  // Validate request body
  const validationError = validateCreateSplitRequest(requestBody);
  if (validationError) {
    return validationError;
  }

  // TODO: Implement actual split creation logic
  // - Validate request body structure in more detail
  // - Generate split ID
  // - Save to DynamoDB
  // - Return created split
  
  return response(201, {
    message: "Split created (dummy response)",
    requestBody: requestBody,
  });
};

/**
 * Validates the create split request body
 * @param requestBody - The parsed request body to validate
 * @returns Error response object if validation fails, null if valid
 */
const validateCreateSplitRequest = (
  requestBody: CreateSplitRequest
): { statusCode: number; body: string } | null => {
  // Validate required fields
  if (!requestBody.splitName || typeof requestBody.splitName !== 'string') {
    return response(400, {
      message: "splitName is required and must be a string",
    });
  }

  if (!requestBody.people || !Array.isArray(requestBody.people)) {
    return response(400, {
      message: "people is required and must be an array",
    });
  }

  if (!requestBody.tasks || !Array.isArray(requestBody.tasks)) {
    return response(400, {
      message: "tasks is required and must be an array",
    });
  }

  // Additional validation can be added here
  // - Validate people array structure
  // - Validate tasks array structure
  // - Validate task amounts match people amounts
  // - etc.

  return null; // Validation passed
};