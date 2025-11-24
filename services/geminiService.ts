import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize the client only if key exists, otherwise we handle errors gracefully in calls
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateFinaleFeedback = async (
  knowledgeScore: number, 
  ethicsScore: number, 
  history: string[]
): Promise<string> => {
  if (!ai) {
    return "Vi kunne ikke koble til Skolehjernen for en personlig evaluering, men poengene dine er registrert!";
  }

  const model = "gemini-2.5-flash";
  const prompt = `
    Du er læreren i et spill kalt "AIKI og Skolehjernen". 
    Spilleren er en ungdomsskoleelev.
    
    Spillerens resultater:
    Kunnskap om AI: ${knowledgeScore} poeng.
    Etisk forståelse: ${ethicsScore} poeng.
    
    Handlinger i spillet:
    ${history.join('\n')}

    Skriv en kort, oppmuntrende og lærerik oppsummering (maks 100 ord) direkte til eleven "AIKI".
    Hvis etikk-scoren er lav (< 5), påpek vennlig at teknologi må brukes med ansvar.
    Hvis kunnskap er høy, ros forståelsen av maskinlæring.
    Tonefall: Lærer, støttende, men tydelig.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    return response.text || "Kunne ikke generere tilbakemelding.";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Skolehjernen er litt overbelastet akkurat nå. Bra jobba uansett!";
  }
};

export const generateMissionFeedback = async (context: string): Promise<string> => {
    if (!ai) return "Godt forsøk!";
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Gi en kort tilbakemelding (1 setning) til en elev som nettopp har gjort denne oppgaven i AI-læring: ${context}. Vær oppmuntrende eller korrigerende.`
        });
        return response.text || "Bra jobba.";
    } catch (e) {
        return "Notert.";
    }
}