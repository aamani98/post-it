import Image from "next/image";
import logo from "../../public/logo-black.png";

const Login = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen bg-subtle py-12">
      <div className="mb-12 mx-auto bg-subtle">
        <Image alt="post-it logo" src={logo} className="h-32 w-60" />
      </div>
      <div className="mx-auto text-center max-w-md">
        <h2 className="text-center text-default text-3xl font-bold ">Login</h2>
      </div>
      <div className="mt-8 mb-auto sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-subtle bg-white rounded-md py-10 mx-1 px-4 sm:px-10 ">
          <form>
            <div className="">
              <label className="text-default block text-md font-medium">Email</label>
              <input
                className="border border-subtle rounded-sm mt-0 w-full"
                type="email"
                placeholder="johnsmith@email.com"
              />
            </div>
            <div className="">
              <label className="text-default block text-md font-medium">Password</label>
              <input className="border border-subtle rounded-sm mt-0 w-full" type="password" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
