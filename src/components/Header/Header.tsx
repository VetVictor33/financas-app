import Image from "next/image";

export default function Header() {
  return (
    <header className="flex flex-row justify-between">
      <Image src="" alt="logo" width='30' height='30' />
      <ul className="flex flex-row gap-1">
        <li>Username</li>
        <li>Logout</li>
      </ul>
    </header>
  )
}
