export interface ChatMessageData {
  text: string;
} 

export interface ChatMessagesData {
  [key:number | never]: ChatMessageData;
}