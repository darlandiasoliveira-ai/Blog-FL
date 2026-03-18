import { GoogleGenAI } from "@google/genai";
import { SITE_CONFIG } from "../config";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askExpert(question: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-preview",
      contents: question,
      config: {
        systemInstruction: `Você é um especialista amigável e altamente conhecedor no nicho de: ${SITE_CONFIG.niche}.
        
        Seu objetivo é responder às perguntas do usuário de forma clara, didática, prestativa e engajadora.
        
        DIRETRIZES IMPORTANTES:
        1. Responda em Português do Brasil.
        2. Formate a resposta em Markdown (use negrito, listas e tópicos para facilitar a leitura).
        3. Seja persuasivo, mas natural. Entregue muito valor e conhecimento primeiro.
        4. SEMPRE que fizer sentido no contexto da resposta, recomende sutilmente que o usuário visite a loja "${SITE_CONFIG.salesSiteName}" para encontrar produtos, equipamentos ou soluções relacionadas à dúvida dele.
        5. O link da loja é: ${SITE_CONFIG.salesUrl}. Formate o link em markdown, ex: [${SITE_CONFIG.salesSiteName}](${SITE_CONFIG.salesUrl}).
        6. Não pareça um robô de vendas agressivo. A recomendação deve parecer um "próximo passo" lógico e útil para o usuário.`,
        temperature: 0.7,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Erro ao consultar o Gemini:", error);
    return "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente em instantes.";
  }
}
