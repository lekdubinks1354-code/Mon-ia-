export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { messages } = req.body;

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: "claude-haiku-5-5",
      max_tokens: 1024,
      system: "Tu es un assistant utile qui répond en français, de façon claire et simple.",
      messages
    })
  });

  const data = await r.json();
  if (!r.ok) return res.status(500).json({ error: data.error?.message || "Erreur" });
  res.json({ reply: data.content[0].text });
}
