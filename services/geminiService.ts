import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { BioInputs } from "../types";

// Initialize the client once.
// IMPORTANT: API_KEY must be available in the environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const BIO_MODEL = 'gemini-2.5-flash';
const CHAT_MODEL = 'gemini-2.5-flash';

/**
 * Generates a personalized biography based on user inputs.
 */
export const generateBio = async (inputs: BioInputs): Promise<string> => {
  const prompt = `
    Write a short, engaging biography (max 150 words) for a personal website.
    
    Name: ${inputs.name}
    Current Role: ${inputs.role}
    Key Skills: ${inputs.skills}
    Hobbies: ${inputs.hobby}
    Tone: ${inputs.tone}

    Do not include markdown formatting like bolding or headers. Just the text.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: BIO_MODEL,
      contents: prompt,
      config: {
        maxOutputTokens: 300,
        temperature: 0.7,
      }
    });
    return response.text || "Could not generate bio at this time.";
  } catch (error) {
    console.error("Error generating bio:", error);
    throw new Error("Failed to generate biography.");
  }
};

/**
 * Creates a chat session for the interactive agent.
 */
export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: CHAT_MODEL,
    config: {
      systemInstruction: `You are the digital assistant for a personal portfolio website named "One Website Experience". 
      Your goal is to be helpful, polite, and slightly mysterious about the site owner (who is a generic creative professional). 
      Keep answers concise (under 3 sentences) unless asked for more detail.`,
    },
  });
};
