// api/guardar.js
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

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtRn6Res9oAEGfZY5sdgS0BS-WsqSJxVXvA9uEHWyd18ssW7H-1SDqBI8e5uAlbkVI/exec';

  try {
    // Compactar y serializar los datos
    const dataString = encodeURIComponent(JSON.stringify({ compact: req.body.compact }));
    const url = `${APPS_SCRIPT_URL}?compact=${dataString}`;

    // Hacer la petición GET al Apps Script (sin CORS)
    const response = await fetch(url);
    const result = await response.text();

    res.status(200).send(result);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
