"use client";
import Image from "next/image";
import logo from "../../public/logo-black.png";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/Layout/AuthLayout";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/auth/signup", {
      body: JSON.stringify({ username, email, password }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const signInResponse = await signIn<"credentials">("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (!signInResponse?.error) {
        router.replace("/");
      }
    } else {
      console.log("Error in signup");
    }
  };
  return (
    <AuthLayout
      showLogo
      title="Signup"
      footer={
        <Link href="/auth/login" replace={true}>
          Already have an account?
        </Link>
      }
    >
      <form>
        <div className="space-y-6">
          <div>
            <label className="text-default block font-medium mb-2">
              Username
            </label>
            <input
              className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
              type="text"
              placeholder="johnsmith"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="text-default block font-medium mb-2">Email</label>
            <input
              className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
              type="email"
              placeholder="johnsmith@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-default block font-medium mb-2">
              Password
            </label>
            <input
              className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
              type="password"
              placeholder="•••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full px-4 py-2 bg-default text-white text-sm font-medium h-9 border rounded-md inline-flex items-center justify-center whitespace-nowrap disabled:cursor-not-allowed"
            type="submit"
            onClick={onSubmit}
          >
            Sign Up
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
