import Image from "next/image"
import Navbar from "./Navbar"
import Link from "next/link"

const Header = () => {
  return (
    <header className=" text-black py-1 px-4 md:px-20">
      
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href={"/"}>
                            <Image src="/images/logo.svg" alt="Logo" width={150} height={100} />   

            </Link>
         <Navbar />
        </div>
      </header>
  )
}

export default Header