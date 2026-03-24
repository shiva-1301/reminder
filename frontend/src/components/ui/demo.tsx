import { useNavigate } from "react-router-dom";
import { AuthFormSplitScreen } from "@/components/ui/login";

export default function AuthFormSplitScreenDemo() {
  const navigate = useNavigate();

  const handleLogin = async (data: { email: string; password: string; rememberMe?: boolean }) => {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });
    const text = await response.text();
    if (text === "Login successful") {
      localStorage.setItem("user", data.email);
      navigate("/dashboard");
    } else {
      throw new Error(text);
    }
  };

  return (
    <AuthFormSplitScreen
      logo={
        <h1 className="text-xl font-bold tracking-wider">Reminder App</h1>
      }
      title="Welcome back!"
      description="Sign in by entering the information below"
      imageSrc="/login.jpg"
      imageAlt="Healthcare background"
      onSubmit={handleLogin}
      forgotPasswordHref="#"
      createAccountHref="/signup"
    />
  );
}
