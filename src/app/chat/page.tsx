import { AppHeader } from "@/components/app-header";
import { Chat } from "@/components/chat";

const Page = () => (
  <div className="flex flex-col flex-1">
    <AppHeader title="Chat" />
    <Chat />
  </div>
);

export default Page;
