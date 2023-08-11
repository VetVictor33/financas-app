'use client'
import { Navbar } from "components";
import { useUserDataContext } from "contexts";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Storage } from "utils";

export function Header() {
  const { user, setUser } = useUserDataContext()
  const [animate, setAnimate] = useState(true)

  const router = useRouter()

  const handleLogout = () => {
    setUser(undefined!)
    Storage.clearSession()
    router.push('/login')
  }

  return (
    <header className="flex flex-col justify-between align-middle
     bg-blue-500 text-white relative mb-3">
      <div className="flex justify-between  p-3">
        <Image src="./money.svg" alt="logo" width='30' height='30' />
        <p className={`text-xl cursor-pointer ${animate ? 'animate-pulse' : ''}`}
          onClick={() => setAnimate(!animate)}
        >Finanças App</p>
        <ul className="flex gap-1">
          <li className="font-semibold">{user?.username}</li>
          <li onClick={handleLogout} className="hover:opacity-75 hover:cursor-pointer">
            Logout
          </li>
        </ul>
      </div>
      <Navbar />
      <div className="h-full w-full absolute top-10 -z-10 bg-blue-500 " />
    </header>
  )
}
