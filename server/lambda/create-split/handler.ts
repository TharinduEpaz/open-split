import { response } from './utils/response';
import { createSplit } from './handlers/create-split';
import { getSplit } from './handlers/get-split';
import { updateSplit } from './handlers/update-split';
import { ApiGatewayEvent } from './utils/types';

export const handle = async (event: ApiGatewayEvent) => {
  const { httpMethod, resource } = event;

  try {
    // Route: POST /api/v1/create-split
    if (resource === "/api/v1/create-split" && httpMethod === "POST") {
      return await createSplit(event);
    }

    // Route: GET /api/v1/splits/{splitId}
    if (resource === "/api/v1/splits/{splitId}" && httpMethod === "GET") {
      return await getSplit(event);
    }

    // Route: PUT /api/v1/splits/{splitId}
    if (resource === "/api/v1/splits/{splitId}" && httpMethod === "PUT") {
      return await updateSplit(event);
    }

    // Route not found
    return response(404, { message: "Route not implemented" });
  } catch (error) {
    console.error('Error processing request:', error);
    return response(500, {
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};