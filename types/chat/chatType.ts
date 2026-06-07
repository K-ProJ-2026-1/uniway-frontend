export type ChatSender = "mentor" | "me" | "system";

export interface MentorProfile {
  id: string;
  name: string;
  roleLabel: string;
  department: string;
  statusLabel: string;
  intro: string;
  languages: string[];
  topics: string[];
}

export interface ChatMessage {
  id: string;
  sender: ChatSender;
  senderName: string;
  text: string;
  time: string;
}
