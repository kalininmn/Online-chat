export interface ChatMessage {
  text: string;
}

export interface ChatMessages {
  [key:number | never]: ChatMessage;
}
