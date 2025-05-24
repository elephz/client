import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router"; // make sure your router is set up for this
import { login } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {login as apiLogin} from "@/api/user";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const email = useRef("");
  const password = useRef("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  console.log("Form data:", form);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_PATH;
      const body = {
        email: email.current.value,
        password: password.current.value,
      };
 
      const response = await apiLogin(body);
      const { payload, token } = response.data;

      const dispatchBody = {
        name: payload.name,
        role: payload.role,
        token: token,
      };
      console.log("Dispatch body:", dispatchBody);
      dispatch(login(dispatchBody));
      navigate("/user");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

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
          type="email"
          placeholder="you@example.com"
          required
          ref={email}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          ref={password}
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        Login
      </button>

      <div className="mt-4 text-center text-sm">
        <span className="text-gray-600">Don’t have an account?</span>
        <Link
          to="/register"
          className="ml-2 text-blue-600 hover:underline font-medium"
        >
          Register
        </Link>
      </div>
    </form>
  );
}
