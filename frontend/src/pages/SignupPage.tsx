import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiCall } from "@/lib/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const validate = () => {
    if (!formData.firstName.trim()) return "Please enter your first name.";
    if (!EMAIL_RE.test(formData.email.trim())) return "Please enter a valid email address.";
    // Must match the login form's rule, otherwise new users could never sign in.
    if (formData.password.length < 8) return "Password must be at least 8 characters.";
    if (!formData.agreeToTerms) return "Please accept the terms to continue.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = validate();
    setError(problem);
    if (problem) return;

    setIsLoading(true);
    try {
      const text = await apiCall<string>("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });
      if (text === "User registered successfully") {
        navigate("/login", { state: { registered: true } });
      } else {
        setError(typeof text === "string" && text ? text : "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not connect to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {error && (
        <p role="alert" className="mb-5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" autoComplete="given-name" className="h-11" value={formData.firstName} onChange={handleInputChange} placeholder="John" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" autoComplete="family-name" className="h-11" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input type="email" id="email" name="email" autoComplete="email" className="h-11" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="new-password"
              className="h-11 pr-12"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="At least 8 characters"
              minLength={8}
              aria-describedby="password-hint"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          <p id="password-hint" className="text-xs text-muted-foreground">Use 8 or more characters.</p>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="mt-0.5 h-4 w-4 rounded border-input accent-sky-600"
            required
          />
          <label htmlFor="agreeToTerms" className="text-sm text-muted-foreground">
            I agree to the Terms &amp; Conditions and understand MedRem does not replace medical advice.
          </label>
        </div>

        <Button type="submit" disabled={isLoading} className="h-11 w-full text-base">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
          {isLoading ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
