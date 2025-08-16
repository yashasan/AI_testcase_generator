const express = require("express");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors({ origin: "*" }));

// Use your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// Multer in-memory storage for uploaded images
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function fileToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType,
    },
  };
}

app.post("/generate", upload.fields([{ name: "before" }, { name: "after" }]), async (req, res) => {
  try {
    const action = req.body.action;
    const beforeFile = req.files?.before?.[0];
    const afterFile = req.files?.after?.[0];

    if (!action || !beforeFile || !afterFile) {
      return res.status(400).json({ error: "Action and both screenshots are required" });
    }

    console.log("Received Action:", action);

    const prompt =
      "You are a QA test case assistant. Respond ONLY in JSON format with keys 'action' and 'expected'. " +
      "The 'expected' must describe ALL visible UI changes between the before and after screenshots in FUTURE tense, " +
      "as they should appear after the action is performed. Carefully compare the screenshots. Identify all UI differences (color, text, visibility, position, states, etc.). " +
      "Output must be valid JSON only.";

    const beforeImagePart = fileToGenerativePart(beforeFile.buffer, beforeFile.mimetype);
    const afterImagePart = fileToGenerativePart(afterFile.buffer, afterFile.mimetype);

    // Call Gemini API
    const result = await model.generateContent([prompt, beforeImagePart, afterImagePart]);
    const response = await result.response;
    const text = response.text();

    console.log("Raw AI output:", text);

    let cleanText = text.trim();

    // If AI wrapped JSON in markdown ```json ... ```
    if (cleanText.startsWith("```")) {
      cleanText = cleanText.replace(/```json|```/g, "").trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(cleanText);
    } catch (err) {
      console.error("JSON parse failed:", err, "Cleaned text:", cleanText);
      return res.status(500).json({ error: "Failed to parse AI response. Check logs for details." });
    }

    const actionText = parsed.action || action;
    const expectedText = parsed.expected || "";

    res.json({ action: actionText, expected: expectedText });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: err.message || "Server error occurred" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
