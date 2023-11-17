"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/Layout/AuthLayout";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (!result?.error) {
        router.replace(result?.url ?? "/");
      }
    }
  };
  return (
    <AuthLayout
      title="Login"
      showLogo
      footer={
        <Link href="/auth/signup" replace={true}>
          Don't have an account?
        </Link>
      }
    >
      <form className="space-y-6">
        <div>
          <label className="text-default block font-medium mb-2">Email</label>
          <input
            className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
            type="email"
            autoComplete={"false"}
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
          onClick={onSubmit}
        >
          Sign In
        </button>
      </form>
    </AuthLayout>
  );
};
export default Login;
