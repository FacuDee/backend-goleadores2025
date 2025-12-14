export default async function handler(req, res) {
  // Permitir CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responder a preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxYLq08l45k1hApEhGfwG7ulu2niVOwGc5zjDXafUIkYtoCFa38ow9hQPRA7f3BX4sL/exec';

  try {
    // Reenviar el body como POST (no como GET)
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const result = await response.text();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}