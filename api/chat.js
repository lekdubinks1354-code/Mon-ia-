export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;

  const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "authorization": "Bearer " + process.env.GROQ_API_KEY
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: "Tu es un assistant utile qui répond en français, de façon claire et simple." },
        ...messages
      ]
    })
  });

  const data = await r.json();
  if (!r.ok) return res.status(500).json({ error: data.error?.message || "Erreur" });
  res.
