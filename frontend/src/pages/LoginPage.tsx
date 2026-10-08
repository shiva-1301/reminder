import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthShell } from "@/components/auth/AuthShell";
import { apiCall } from "@/lib/api";
import { setUser } from "@/lib/auth";

const formSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  rememberMe: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { y: 16, opacity: 0 }, visible: { y: 0, opacity: 1 } };

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const registered = (location.state as { registered?: boolean } | null)?.registered;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const text = await apiCall<string>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (text === "Login successful") {
        setUser(data.email, !!data.rememberMe);
        navigate("/dashboard");
      } else {
        setErrorMessage(typeof text === "string" && text ? text : "Login failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell>
      <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col gap-6">
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to manage your reminders and prescriptions.</p>
        </motion.div>

        {registered && (
          <motion.p
            variants={item}
            role="status"
            className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
            Account created. You can sign in now.
          </motion.p>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <motion.div variants={item}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" placeholder="you@example.com" className="h-11" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={item}>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="current-password" placeholder="••••••••" className="h-11" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div variants={item}>
              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isLoading} />
                    </FormControl>
                    <FormLabel className="font-normal text-muted-foreground">Keep me signed in on this device</FormLabel>
                  </FormItem>
                )}
              />
            </motion.div>

            {errorMessage && (
              <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </p>
            )}

            <motion.div variants={item}>
              <Button type="submit" className="h-11 w-full text-base" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </motion.div>
          </form>
        </Form>

        <motion.p variants={item} className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary hover:underline">
            Create one
          </Link>
        </motion.p>
      </motion.div>
    </AuthShell>
  );
}
