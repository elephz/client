import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { register } from "@/api/user";
export default function Register() {
  const defaultForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const [form, setForm] = useState(defaultForm);

  const { toast } = useToast();

  const handleChange = (e) => {
    if (passwordError && (e.target.name === "password" || e.target.name === "confirmPassword")) {
      setPasswordError(false);
    }
    if (emailError && e.target.name === "email") {
      setEmailError(false);
    }
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setPasswordError(true);
      return;
    }
     try {
       
      await register(form);
       
      toast({
        title: "Registration Successful",
        description: "Redirecting you to login...",
        duration: 1666,
        variant: "default",
      })
       setForm(defaultForm);
       // redirect to login with route link
      
       setTimeout(() => {
         navigate("/login");
       }, 1666);

     } catch (error) {
       console.log({error})
       if (error.response?.data.message === "Email Already Exists") {
         setEmailError(true);
       }
      toast({
        title: "Registration Failed",
        description: error.response?.data.message || "An error occurred.",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            className={`border ${
              emailError ? "border-red-500" : "border-gray-300"
            }`}
            required
            type="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            className={`border ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            className={`border ${
              passwordError ? "border-red-500" : "border-gray-300"
            }`}
            required
            minLength={6}
            type="password"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-blue-700 transition"
        >
          Register
        </button>

        <div className="mt-4 text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <Link
            to="/login"
            className="ml-2 text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
