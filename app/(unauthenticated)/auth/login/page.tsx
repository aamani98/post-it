"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "@/components/Layout/AuthLayout";
import { useState } from "react";
import ErrorMessage from "@/components/ui/ErrorMessage";

type LoginValues = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();

  const [error, setError] = useState<string>("");

  const formSchema = z.object({
    email: z
      .string()
      .min(1, "Email field is required")
      .email("Enter valid email"),
    password: z.string().min(1, "Password field is required"),
  });

  const { register, handleSubmit, formState } = useForm<LoginValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async ({ email, password }: LoginValues) => {
    setError("");
    if (email && password) {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (!result?.error) {
        router.replace(result?.url ?? "/");
      } else {
        setError(result?.error);
      }
    }
  };
  return (
    <AuthLayout
      title="Login to your account"
      showLogo
      footer={
        <Link href="/auth/signup" replace={true}>
          Don't have an account?
        </Link>
      }
    >
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {error && <ErrorMessage title={error} />}
          <label className="text-default block font-medium mb-2">Email</label>
          <input
            className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
            type="email"
            autoComplete={"false"}
            placeholder="johnsmith@email.com"
            {...register("email")}
          />
          {formState.errors.email?.message && (
            <ErrorMessage title={formState.errors.email.message} />
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
            <ErrorMessage title={formState.errors.password.message} />
          )}
        </div>
        <button
          className="w-full px-4 py-2 bg-default text-white text-sm font-medium h-9 border rounded-md inline-flex items-center justify-center whitespace-nowrap disabled:cursor-not-allowed"
          type="submit"
          disabled={formState.isSubmitting}
        >
          Sign In
        </button>
      </form>
    </AuthLayout>
  );
};
export default Login;
