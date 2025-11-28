import { GoogleGenAI, Type } from "@google/genai";
import { Quote } from "../types";

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY is missing from environment variables");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-build' });

export const fetchQuotes = async (keyword: string): Promise<Quote[]> => {
  if (!apiKey) throw new Error("API Key configuration error");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Search keyword: "${keyword}"`,
      config: {
        // Temperature 0.2 makes the model very conservative and factual, significantly reducing hallucinations.
        temperature: 0.2, 
        systemInstruction: `
          You are a strict and rigorous literary scholar acting as a Quote Retrieval Engine.
          Your goal is to find AUTHENTIC quotes that strictly contain or are directly synonymous with the user's search keyword: "${keyword}".

          ### 🛡️ VERIFICATION PROTOCOL (CRITICAL):
          1. **NO FAKE QUOTES**: You must filter out internet-fabricated quotes (e.g., fake Lu Xun, fake Mo Yan, fake Tagore quotes).
          2. **MANDATORY SOURCE**: Every quote MUST have a verifiable source (Book title, Essay title, Poem title). If you cannot recall the specific source book, DO NOT include the quote.
          3. **LU XUN RULE**: If the quote is attributed to Lu Xun (鲁迅), you must be 100% certain it appears in his 'Complete Works'. If it's a "netizen fabrication" (e.g., "我没说过这话"), discard it.

          ### 🎯 SEARCH RULES:
          1. **Literal Match Priority**: The quote SHOULD ideally contain the exact keyword "${keyword}".
          2. **Direct Synonym**: If no exact match exists in famous literature, use direct synonyms (e.g., Keyword "Grief" -> Quote with "Sadness", "Heartbreak"). Do NOT use abstract metaphors.
          3. **Diversity**: Mix Classical Chinese (Poetry/Classics), Authentic Modern Literature, and Verified World Classics.

          ### 📤 Output Format:
          - Return 5 to 8 results.
          - Content: The exact quote text (Chinese).
          - Explanation: Explain context AND verify why this is authentic (e.g., "Excerpt from his 1925 speech").
        `,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING, description: "The exact quote text." },
              author: { type: Type.STRING, description: "Author name." },
              source: { type: Type.STRING, description: "Specific Book/Poem/Essay title (Required)." },
              explanation: { type: Type.STRING, description: "Context and verification note." },
              tags: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING }
              }
            },
            required: ["content", "author", "source", "explanation", "tags"]
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as Quote[];
    }
    return [];
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
};