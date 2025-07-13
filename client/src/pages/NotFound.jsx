import { SearchX, Zap, MessageCircleX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Animated Icon Section */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
          <div className="relative bg-card rounded-full p-16 shadow-2xl">
            <div className="relative">
              <SearchX className="h-32 w-32 mx-auto text-primary animate-bounce" />
              <div className="absolute -top-4 -right-4 bg-destructive text-destructive-foreground rounded-full px-3 py-1 text-sm font-bold shadow-lg">
                404
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold tracking-tight text-foreground">
              Page Not Found
            </h1>
            <p className="text-xl max-w-md mx-auto leading-relaxed text-muted-foreground">
              The page you're looking for seems to have vanished into the
              digital void.
            </p>
          </div>

          {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 rounded-full shadow-lg bg-accent">
                <Zap className="h-8 w-8 text-accent-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Lost Connection
              </span>
            </div>

            <div className="h-px w-16 bg-border/30"></div>

            <div className="flex flex-col items-center space-y-3">
              <div className="p-4 rounded-full shadow-lg bg-secondary">
                <MessageCircleX className="h-8 w-8 text-secondary-foreground" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                Route Missing
              </span>
            </div>
          </div>

          {/* Error Code Display */}
          <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
            <div className="font-mono text-sm space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-destructive">404 Not Found</span>
              </div>
              <div className="flex justify-between">
                <span>Error:</span>
                <span className="text-foreground">ROUTE_NOT_FOUND</span>
              </div>
              <div className="flex justify-between">
                <span>Timestamp:</span>
                <span className="text-foreground">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {/* Inspirational Message */}
          <div className="space-y-4">
            <div className="h-px w-24 mx-auto bg-border/30"></div>
            <p className="text-lg font-medium text-primary">
              "Not all who wander are lost, but this page definitely is."
            </p>
            <p className="text-sm text-muted-foreground">
              Don't worry, even the best explorers sometimes take a wrong turn.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Zuno Chat © 2025 • Lost in the matrix of possibilities
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-chart-1/10 animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-chart-2/10 animate-pulse [animation-delay:0.5s]"></div>
        <div className="absolute top-1/3 right-1/4 w-28 h-28 rounded-full bg-chart-3/10 animate-pulse [animation-delay:1.5s]"></div>
      </div>
    </div>
  );
};

export default NotFound;
