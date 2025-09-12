import type { Message } from "~/core/messages";

export enum LoginType {
  Email,
  Wallet,
  Google,
}

export interface SharesMessageItem {
  thread_id: string;
  messages: Message[];
  is_agent_running: boolean;
}
