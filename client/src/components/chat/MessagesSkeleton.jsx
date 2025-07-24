const MessagesSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-2 justify-start">
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex-shrink-0"></div>
        <div className="w-2/5 h-10 rounded-lg bg-muted animate-pulse"></div>
      </div>
      <div className="flex items-end gap-2 justify-end">
        <div className="w-1/2 h-12 rounded-lg bg-primary/20 animate-pulse"></div>
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex-shrink-0"></div>
      </div>
      <div className="flex items-end gap-2 justify-start">
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex-shrink-0"></div>
        <div className="w-1/3 h-8 rounded-lg bg-muted animate-pulse"></div>
      </div>
      <div className="flex items-end gap-2 justify-end">
        <div className="w-3/5 h-16 rounded-lg bg-primary/20 animate-pulse"></div>
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex-shrink-0"></div>
      </div>
      <div className="flex items-end gap-2 justify-start">
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex-shrink-0"></div>
        <div className="w-1/4 h-10 rounded-lg bg-muted animate-pulse"></div>
      </div>
      <div className="flex items-end gap-2 justify-end">
        <div className="w-1/2 h-10 rounded-lg bg-primary/20 animate-pulse"></div>
        <div className="w-8 h-8 rounded-full bg-muted animate-pulse flex-shrink-0"></div>
      </div>
    </div>
  );
};

export default MessagesSkeleton;
