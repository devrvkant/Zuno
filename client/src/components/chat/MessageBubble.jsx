import { cn } from "@/lib/utils";
import { Download } from "lucide-react";

const MessageBubble = ({ message, isSender }) => {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Use 12-hour format with AM/PM
  });

  const hasImage = !!message.image || !!message.localImageUrl;
  const hasText = !!message.text && message.text.trim() !== "";
  const isTextOnly = hasText && !hasImage;

  const displayImageUrl = message.localImageUrl || message.image;
  const downloadUrl = message.image;

  return (
    <div
      className={cn(
        "flex flex-col w-full",
        isSender ? "items-end" : "items-start"
      )}
    >
      {/* --- TIMESTAMP (OUTSIDE THE BUBBLE) --- */}
      <span className="text-[10px] text-muted-foreground/80 px-2.5 pb-0.5">
        {time}
      </span>

      {/* --- BUBBLE CONTAINER --- */}
      <div
        className={cn(
          "relative flex flex-col w-fit max-w-[80%] sm:max-w-[70%] leading-1.5 shadow-md",
          isSender ? "sender-message" : "receiver-message",
          // Conditional bubble shape
          isTextOnly &&
            (isSender
              ? "rounded-s-xl rounded-ee-xl"
              : "rounded-e-xl rounded-es-xl"),
          hasImage && "rounded-xl"
        )}
      >
        {/* --- IMAGE SECTION --- */}
        {hasImage && (
          <div className="group relative p-1.5">
            <img
              src={displayImageUrl}
              className="rounded-lg max-w-full"
              alt="message attachment"
            />
            {/* Download button and overlay */}
            <div className="absolute inset-1.5 bg-black/40 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <a
                href={downloadUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full h-8 w-8 bg-black/40 hover:bg-black/60 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
              >
                <Download className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>
        )}

        {/* --- TEXT SECTION --- */}
        {hasText && (
          <p className="text-sm font-normal break-words p-2.5 pt-1.5">
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;