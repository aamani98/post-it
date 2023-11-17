import Image from "next/image";
import { ReactNode } from "react";
export default function UnauthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center min-h-screen py-12">
      {children}
    </div>
  );
}
