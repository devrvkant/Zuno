import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Landing = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Redirect to dashboard if user is authenticated(preventing the user to going back to landing page by using browser back button)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Zuno</h1>
          <div className="space-x-4">
            {/* sending directly to dashboard for authenticated users */}
            <Link to="/dashboard">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Welcome to Zuno
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect, chat, and collaborate in real-time with your team.
          </p>
          <div className="space-x-4">
            <Link to="/dashboard">
              <Button size="lg" className="px-8 py-3">
                Start Chatting Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Chat</CardTitle>
              <CardDescription>
                Instant messaging with your team members
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secure</CardTitle>
              <CardDescription>
                End-to-end encryption for all your conversations
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Collaboration</CardTitle>
              <CardDescription>
                Work together seamlessly across projects
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Landing;
