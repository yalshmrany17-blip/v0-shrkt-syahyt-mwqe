import type { Itinerary, GroundingChunk, Proposal } from "./jado-types"

export interface JadoResponse {
  text: string
  itinerary?: Itinerary
  groundingChunks?: GroundingChunk[]
  proposal?: Proposal
}

export async function initChat() {
  // Reset chat on server
  try {
    await fetch("/api/jado-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "", resetChat: true }),
    })
  } catch {
    // Ignore errors
  }
}

export async function sendMessageToJado(
  message: string,
  imageBase64?: string,
  contextUpdate?: { type: string; data: string },
): Promise<JadoResponse> {
  try {
    let prompt = message

    if (contextUpdate) {
      prompt = `[سياق: ${contextUpdate.type} - ${contextUpdate.data}]\n${message}`
    }

    const response = await fetch("/api/jado-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: prompt,
        imageBase64,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to get response")
    }

    const data = await response.json()

    return {
      text: data.text,
      itinerary: data.itinerary,
    }
  } catch (error) {
    console.error("Chat API Error:", error)
    return {
      text: "عذراً، حدث خطأ في المحادثة. يمكنك التواصل معنا مباشرة عبر واتساب على 0545421428",
    }
  }
}

export async function generateSpeech(text: string): Promise<string | null> {
  return null
}
