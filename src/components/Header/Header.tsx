import { NavHeader } from "components";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex flex-col justify-between align-middle bg-zinc-700">
      <div className="flex justify-between  p-3 bg-blue-500 text-white">
        <Image src="" alt="logo" width='30' height='30' />
        <ul className="flex gap-1">
          <li className="font-semibold">Username</li>
          <li>Logout</li>
        </ul>
      </div>
      <NavHeader />
    </header>
  )
}
