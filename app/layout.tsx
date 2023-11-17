import AuthProvider from "@/components/AuthProvider";
import AuthOptions from "@/features/auth/auth-options";
import { getServerSession } from "next-auth";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PostIt",
  description: "A Blogging App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(AuthOptions);
  return (
    <html lang="en">
      <body className="bg-subtle">
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
