import type { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { corsHeaders } from './cors.ts';
import { handleWaitlist } from './handler.ts';
import { LogProvider } from './provider.ts';
import { RateLimiter } from './rate-limit.ts';

// Module scope: reused across warm invocations of the same instance.
const provider = new LogProvider();
const limiter = new RateLimiter();

/** AWS Lambda entry point. Works with a Lambda function URL or an API Gateway HTTP API (payload v2). */
export async function handler(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> {
  const cors = corsHeaders(event.headers?.origin);
  const method = event.requestContext.http.method;

  if (method === 'OPTIONS') return { statusCode: 204, headers: cors };
  if (method !== 'POST') {
    return { statusCode: 405, headers: { ...cors, Allow: 'POST, OPTIONS' }, body: '' };
  }

  const rawBody = event.isBase64Encoded && event.body ? Buffer.from(event.body, 'base64').toString('utf8') : event.body;
  const res = await handleWaitlist({ rawBody, ip: event.requestContext.http.sourceIp }, { provider, limiter });

  return {
    statusCode: res.status,
    headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify(res.body),
  };
}
