import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

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
import PasswordInput from "@/components/ui/password-input";
import { resetPasswordSchema } from "../../schemas/auth.schema.js";

const formSchema = resetPasswordSchema;

const ResetPasswordForm = ({ handleResetPassword, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    confirmPassword: "",
    },
  });

  const onSubmit = async ({ password }) => {
    await handleResetPassword(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-foreground">
              Reset Password
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Enter your new password to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-4">
                  {/* New Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="New Password"
                            autoComplete="new-password"
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

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PasswordInput
                            id="confirmPassword"
                            placeholder="Confirm New Password"
                            autoComplete="new-password"
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
                      "Reset Password"
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
};

export default ResetPasswordForm;
