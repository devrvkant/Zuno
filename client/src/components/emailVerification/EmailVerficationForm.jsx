import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { emailVerificationSchema } from "../../schemas/auth.schema.js";

const formSchema = emailVerificationSchema;

export default function EmailVerificationForm({
  handleVerifyEmail,
  isLoading,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: ["", "", "", "", "", ""],
    },
  });

  const inputRefs = useRef([]);

  async function onSubmit(values) {
    const verificationCode = values.code.join("");
    await handleVerifyEmail(verificationCode);
  }

  const handleInputChange = (index, value) => {
    // Only allow digits and limit to 1 character
    if (value.length > 1 || (value && !/^\d$/.test(value))) return;

    const currentCode = form.getValues("code");
    const newCode = [...currentCode];
    newCode[index] = value;
    form.setValue("code", newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    const currentCode = form.getValues("code");

    // Handle backspace
    if (e.key === "Backspace" && !currentCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pasteData.length === 6) {
      const newCode = pasteData.split("");
      form.setValue("code", newCode);
      // Focus the last input
      inputRefs.current[5]?.focus();
    }
  };

  const watchedCode = form.watch("code");
  const isCodeComplete = watchedCode.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6 sm:pb-8">
            <CardTitle className="text-3xl font-bold text-foreground">
              Verify Your Email
            </CardTitle>
            <CardDescription className="mt-2 text-sm sm:text-base text-muted-foreground">
              Enter the 6-digit code sent to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 sm:px-8 pb-6 sm:pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-6">
                  {/* Verification Code Input */}
                  <FormField
                    control={form.control}
                    name="code"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-medium text-center block text-muted-foreground">
                          Verification Code
                        </FormLabel>
                        <FormControl>
                          <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mt-4">
                            {watchedCode.map((digit, index) => (
                              <input
                                id={`code-input-${index}`}
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) =>
                                  handleInputChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                autoComplete="off"
                                className="w-10 h-10 sm:w-12 sm:h-12 text-center text-base sm:text-lg font-semibold border border-input rounded-lg focus:ring-2 focus:ring-ring focus:outline-none transition-all duration-200 text-foreground"
                              />
                            ))}
                          </div>
                        </FormControl>
                        <div className="min-h-[20px] text-center">
                          <FormMessage className="text-destructive text-sm" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={!isCodeComplete || isLoading}
                    className="w-full h-11 sm:h-12 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 text-sm sm:text-base"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Verify Email"
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
