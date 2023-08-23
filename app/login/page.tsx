"use client"
import Image from "next/image";
import logo from "../../public/logo-black.png";
import Link from "next/link";
import {useState} from 'react';
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const Login =  () => {
  const router = useRouter();

  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const searchParams = useSearchParams();

  const onSubmit = async(e) => {
    e.preventDefault()
    if(email && password){
     
      const res = await signIn<"credentials">("credentials",{
        email,
        password,
        redirect:false});
        if(!res?.error){
          router.replace(searchParams.get("next") ?? "/")
        }
    }
  }
  return (
    <div className="flex flex-col justify-center min-h-screen bg-subtle py-12">
      <div className="mb-12 mx-auto">
        <Image alt="post-it logo" src={logo} className="h-32 w-60" />
      </div>
      <div className="mx-auto max-w-md">
        <h2 className="text-default text-3xl font-bold ">Login</h2>
      </div>
      <div className="mt-8 mb-auto sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-subtle bg-white rounded-md py-10 mx-1 px-4 sm:px-10 ">
          <form>
            <div className="space-y-6">
              <div>
                <label className="text-default block font-medium mb-2">Email</label>
                <input
                  className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis"
                  type="email"
                  placeholder="johnsmith@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-default block font-medium mb-2">Password</label>
                <input className="border border-subtle rounded-md mt-0 w-full px-3 py-2 hover:border-emphasis" 
                  type="password" 
                  placeholder="•••••••••••••"  
                  value={password} 
                  onChange={e=>setPassword(e.target.value)}/>
              </div>
              <button 
                className="w-full px-4 py-2 bg-default text-white text-sm font-medium h-9 border rounded-md inline-flex items-center justify-center whitespace-nowrap disabled:cursor-not-allowed"
                onClick={onSubmit}>
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="mt-8 text-center font-medium">
          <Link href="/signup" replace={true}>Don't have an account?</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
