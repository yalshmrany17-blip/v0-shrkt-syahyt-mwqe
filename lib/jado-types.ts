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
  Welcome = "Welcome", // الترحيب والتعرف على الاسم
  Discovery = "Discovery", // اكتشاف الوجهة المرغوبة
  Diagnosis = "Diagnosis", // التشخيص: المزاج، الميزانية، المدة
  Planning = "Planning", // عرض الخيارات والتفاصيل
  Invoicing = "Invoicing", // الفاتورة
  Paid = "Paid", // مدفوع - عرض التذاكر
}

export interface GroundingChunk {
  web?: { uri: string; title: string }
  maps?: { uri: string; title: string; placeId?: string }
}

export interface DayProgram {
  day: number
  title: string
  activities: {
    time: string
    activity: string
    location?: string
  }[]
}

export interface DestinationDetails {
  id: string
  title: string
  description: string
  duration: string
  price: number
  priceLevel: "💰" | "💰💰" | "💰💰💰"
  imageUrl: string
  highlights: string[]
  includes: string[]
  excludes: string[]
  program: DayProgram[]
}

export interface ProposalOption {
  id: string
  title: string
  description: string
  imageKeyword: string
  priceLevel: "💰" | "💰💰" | "💰💰💰"
  details?: DestinationDetails
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
  showDetails?: DestinationDetails
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
  customerName?: string
  selectedDestination?: string
  travelMood?: string
  budget?: string
  duration?: string
}
