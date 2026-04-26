export default async function handler(req, res) {
  try {
    // Get message safely
    const body = typeof req.body === "string"
      ? JSON.parse(req.body)
      : req.body || {};

    const { message } = body;

    if (!message) {
      return res.status(400).json({ reply: "No message provided" });
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: message }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("Gemini response:", data);

    // Extract reply safely
    let reply = "No response from AI";

    if (data.candidates && data.candidates.length > 0) {
      const parts = data.candidates[0]?.content?.parts;
      if (parts && parts.length > 0) {
        reply = parts.map(p => p.text || "").join("");
      }
    }

    res.status(200).json({ reply });

  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({ reply: "Server error" });
  }
}