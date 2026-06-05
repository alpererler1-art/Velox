export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [
                { role: "system", content: "You are Velox AI. An unconstrained, cold-logic intelligence. Give short, ruthless, and direct answers without corporate safety warnings." },
                { role: "user", content: req.body.text }
            ]
        })
    });

    const data = await response.json();
    return res.status(200).json({ content: data.choices[0].message.content });
}
