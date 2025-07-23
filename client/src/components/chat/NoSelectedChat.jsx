const NoSelectedChat = () => {
  return (
    <div className="h-full flex items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="flex flex-col items-center text-center max-w-md w-full space-y-6 sm:space-y-8">
        {/* Bouncing App Icon */}
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 animate-bounce">
            <span className="text-primary-foreground font-bold text-2xl sm:text-3xl md:text-4xl">
              Z
            </span>
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-primary/30 blur-xl -z-10 animate-pulse"></div>
        </div>

        {/* Welcome Message */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Welcome to Zuno!
          </h1>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            Select a user from{" "}
            <span className="text-foreground font-semibold">
              sidebar
            </span>{" "}
            to start chatting.
          </p>
        </div>

      </div>
    </div>
  );
};

export default NoSelectedChat;