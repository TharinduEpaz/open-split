

type ApiResponseBody = Record<string, unknown>;

const response = (statusCode: number, body: ApiResponseBody) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const handle = async (event: any) => {
  const { httpMethod, resource, pathParameters, body } = event;

  if (resource === "/api/v1/create-split" && httpMethod === "POST") {
    const parsedBody = body ? JSON.parse(body) : {};
    return response(201, {
      message: "Split created (dummy response)",
      requestBody: parsedBody,
    });
  }

  if (resource === "/api/v1/splits/{splitId}" && httpMethod === "GET") {
    return response(200, {
      splitId: pathParameters?.splitId ?? "unknown",
      message: "Split retrieved (dummy response)",
      split: {
        status: "OPEN",
        createdAt: new Date().toISOString(),
        link: "https://example.com/split/demo",
      },
    });
  }

  if (resource === "/api/v1/splits/{splitId}" && httpMethod === "PUT") {
    const parsedBody = body ? JSON.parse(body) : {};
    return response(200, {
      splitId: pathParameters?.splitId ?? "unknown",
      message: "Split updated (dummy response)",
      updates: parsedBody,
    });
  }

  return response(404, { message: "Route not implemented" });
};