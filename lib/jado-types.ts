export enum Sender {
  User = "user",
  Bot = "model",
}

export enum AccessibilityMode {
  None = "none",
  Visual = "visual",
  Hearing = "hearing",
  Speech = "speech",
}

export enum BookingStage {
  Discovery = "Discovery",
  Diagnosis = "Diagnosis",
  Planning = "Planning",
  Invoicing = "Invoicing",
}

export interface GroundingChunk {
  web?: { uri: string; title: string }
  maps?: { uri: string; title: string; placeId?: string }
}

export interface ProposalOption {
  id: string
  title: string
  description: string
  imageKeyword: string
  priceLevel: "💰" | "💰💰" | "💰💰💰"
}

export interface Proposal {
  text: string
  options: ProposalOption[]
}

export interface Message {
  id: string
  sender: Sender
  text: string
  timestamp: Date
  isAudio?: boolean
  audioData?: string
  imageUrl?: string
  groundingChunks?: GroundingChunk[]
  proposal?: Proposal
}

export interface InvoiceItem {
  type: "Flight" | "Hotel" | "Activity" | "Transfer" | "Service" | "Food"
  title: string
  description: string
  price: number
  imageKeyword?: string
  time?: string
  locationUrl?: string
  ticketCode?: string
  seat?: string
  gate?: string
}

export interface Itinerary {
  invoiceNumber: string
  customerName: string
  destination: string
  items: InvoiceItem[]
  subtotal: number
  tax: number
  totalAmount: number
  status: "Draft" | "Confirmed" | "Paid"
}

export interface ChatState {
  messages: Message[]
  isLoading: boolean
  itinerary: Itinerary | null
  stage: BookingStage
}
