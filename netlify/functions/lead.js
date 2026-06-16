// Relays the landing-page form to the GHL inbound webhook (server-side, no CORS).
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const WEBHOOK = 'https://services.leadconnectorhq.com/hooks/8fFeCC5ZbGpVjrbwqLuC/webhook-trigger/82893e58-ee4d-41b1-b62f-3a9484e2ec3b';
  try {
    const data = JSON.parse(event.body || '{}');
    const resp = await fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: resp.ok })
    };
  } catch (e) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: false, error: String(e) })
    };
  }
};
