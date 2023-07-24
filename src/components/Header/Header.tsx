import { Navbar } from "components";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex flex-col justify-between align-middle
     bg-blue-500 text-white relative mb-3">
      <div className="flex justify-between  p-3">
        <Image src="./money.svg" alt="logo" width='30' height='30' />
        <ul className="flex gap-1">
          <li className="font-semibold">Username</li>
          <li>Logout</li>
        </ul>
      </div>
      <Navbar />
      <div className="h-full w-full absolute top-10 -z-10 bg-blue-500 " />
    </header>
  )
}
