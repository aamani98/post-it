import { PropsWithChildren, ReactNode } from "react";
import Image from "next/image";
import logo from "@/public/logo-black.png";
type AuthLayoutProps = {
  children: ReactNode;
  footer: ReactNode;
  title: string;
  showLogo: boolean;
};

const AuthLayout = (props: PropsWithChildren<AuthLayoutProps>) => {
  return (
    <>
      <div className="mb-12 mx-auto">
        <Image alt="post-it logo" src={logo} className="h-20 w-36" />
      </div>
      <div className="mx-auto max-w-md">
        <h2 className="text-default text-3xl font-bold ">{props.title}</h2>
      </div>
      <div className="mt-8 mb-auto sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-subtle bg-white rounded-md py-10 mx-1 px-4 sm:px-10 ">
          {props.children}
        </div>
        <div className="mt-8 text-center font-medium">{props.footer}</div>
      </div>
    </>
  );
};

export default AuthLayout;
