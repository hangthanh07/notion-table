import { env } from "@/utils/env";
import { Client } from "@notionhq/client";

let notionClient: Client | null = null;

export const getNotionClient = () => {
  if (!notionClient) {
    notionClient = new Client({
      auth: env.NOTION_SECRET,
    });
  }
  return notionClient;
}
