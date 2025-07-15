import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { forgotPasswordSchema } from "../../schemas/auth.schema.js";

const formSchema = forgotPasswordSchema;

const ForgotPasswordForm = forwardRef(
  ({ handleForgotPassword, isLoading }, ref) => {
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
      },
    });

    // Expose reset function to parent component
    useImperativeHandle(ref, () => ({
      reset: () => form.reset(),
    }));

    const onSubmit = async ({ email }) => {
      await handleForgotPassword(email);
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-foreground">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                Enter your email address to receive a password reset link.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-end mb-2">
                            <Link
                              to="/login"
                              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                            >
                              Back to Login
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              id="email"
                              placeholder="Email Address"
                              type="email"
                              autoComplete="email"
                              className="h-12 border-border focus:border-ring focus:ring-ring/20 rounded-lg transition-colors text-foreground placeholder:text-muted-foreground"
                              {...field}
                            />
                          </FormControl>
                          <div className="min-h-[20px]">
                            <FormMessage className="text-destructive text-sm" />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] mt-6"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
);

export default ForgotPasswordForm;
