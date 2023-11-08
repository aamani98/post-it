import AuthProvider from "@/components/AuthProvider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PostIt",
  description: "A Blogging App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-subtle">
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
