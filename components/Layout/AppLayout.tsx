import Link from "next/link";
import Image from "next/image";
import logo from "../../public/logo-black.png";

const AppLayout = ({children}) => {
    return <div>
        <nav className="sticky bg-white w-full top-0 right-0 left-0 shadow-md ">
            <div className="w-full mx-auto max-w-6xl px-3 h-16 lg:px-5 flex items-center justify-between">
                <div className="space-x-4">
                    <Link href="/">
                        <Image alt="post-it logo" src={logo} height={52} ></Image>
                    </Link>
                    {/* TODO: Search box */}
                </div>

                <div className="space-x-4">
                    
                </div>
            </div>
        </nav>
        <main className="w-full mx-auto max-w-6xl p-3 lg:p-5 min-h-[calc(100vh-4rem)]">
            {children}
        </main>
    </div>

}

export default  AppLayout;