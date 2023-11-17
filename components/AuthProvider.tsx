"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export type AuthProviderProps = {
  session: Session | null;
  children: React.ReactNode;
};

const AuthProvider = ({ session, children }: AuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
