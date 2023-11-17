"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AuthLayout from "@/components/Layout/AuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ui/ErrorMessage";

type SignUpValues = {
  username: string;
  email: string;
  password: string;
};

const Signup = () => {
  const router = useRouter();

  const [error, setError] = useState<string>("");

  const formSchema = z.object({
    username: z.string().min(4, "Username should be atleast 4 characters"),
    email: z
      .string()
      .min(1, "Email field is required")
      .email("Enter a valid email"),
    password: z.string().min(1, "Password is a required field"),
  });

  const { register, formState, handleSubmit } = useForm<SignUpValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({ username, email, password }: SignUpValues) => {
    try {
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
        const res = await response.json();
        setError(res.message);
      }
    } catch (error) {
      setError("An unexpected error occured. Please try again");
    }
  };
  return (
    <AuthLayout
      showLogo
      title="Create a new account"
      footer={
        <Link href="/auth/login" replace={true}>
          Already have an account?
        </Link>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {error && <ErrorMessage title={error} />}
          <label className="text-default block font-medium mb-2">
            Username
          </label>
          <input
            className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
            type="text"
            placeholder="johnsmith"
            {...register("username")}
          />
          {formState.errors.username?.message && (
            <ErrorMessage title={formState.errors.username?.message} />
          )}
        </div>
        <div>
          <label className="text-default block font-medium mb-2">Email</label>
          <input
            className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
            type="email"
            placeholder="johnsmith@email.com"
            {...register("email")}
          />
          {formState.errors.email?.message && (
            <ErrorMessage title={formState.errors.email?.message} />
          )}
        </div>
        <div>
          <label className="text-default block font-medium mb-2">
            Password
          </label>
          <input
            className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
            type="password"
            placeholder="•••••••••••••"
            {...register("password")}
          />
          {formState.errors.password?.message && (
            <ErrorMessage title={formState.errors.password?.message} />
          )}
        </div>
        <button
          className="w-full px-4 py-2 bg-default text-white text-sm font-medium h-9 border rounded-md inline-flex items-center justify-center whitespace-nowrap disabled:cursor-not-allowed"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Sign Up
        </button>
      </form>
    </AuthLayout>
  );
};

export default Signup;
