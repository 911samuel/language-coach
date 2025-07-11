import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenRouter client with your key and base URL
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OpenRouter API key is not configured");
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

    const { text } = await req.json();

    // Validate input
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required and must be a string" },
        { status: 400 }
      );
    }
    if (text.length > 300) {
      return NextResponse.json(
        { error: "Text must be 300 characters or less" },
        { status: 400 }
      );
    }

    // Prepare prompt for grammar correction, requesting JSON output
    const prompt = `You are an expert writing coach. Please analyze the following text and provide corrections for grammar, clarity, and style.

Original text: "${text}"

Please respond with a JSON object containing exactly these three fields:
1. "original" - the exact original text as provided
2. "corrected" - the improved version with better grammar, clarity, and style
3. "explanation" - a clear, helpful explanation of what changes were made and why, written in a friendly, educational tone

Focus on:
- Grammar and punctuation errors
- Clarity and readability improvements
- More natural phrasing
- Conciseness without losing meaning

If the text is already well-written, still provide the corrected version (which may be the same) and explain what makes it good.`;

    // Call OpenRouter chat completion endpoint
    const response = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const rawText = response.choices[0].message?.content || "";

    // Clean and parse JSON response from AI
    let result;
    try {
      const cleanText = rawText.replace(/```json\n?|```|\n/g, "").trim();
      result = JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      console.error("Raw AI response:", rawText);
      return NextResponse.json(
        { error: "Failed to process the correction" },
        { status: 500 }
      );
    }

    // Validate JSON structure
    if (!result.original || !result.corrected || !result.explanation) {
      console.error("Invalid response structure from AI:", result);
      return NextResponse.json(
        { error: "Invalid response from AI service" },
        { status: 500 }
      );
    }

    // Return the corrected text object
    return NextResponse.json({
      original: result.original,
      corrected: result.corrected,
      explanation: result.explanation,
    });
  } catch (error) {
    console.error("Error in check-text API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
