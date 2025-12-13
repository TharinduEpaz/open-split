type ApiResponseBody = Record<string, unknown>;

export const response = (statusCode: number, body: ApiResponseBody) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

