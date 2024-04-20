import Link from "next/link"
import { FiUser, FiLogOut } from 'react-icons/fi'

export function Header() {
  return (
    <header className="w-full flex items-center px-2 py-4 bg-purple-700 shadow-lg">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2xl pl-2 text-white">TECNVS</h1>
        </Link>

        <div className="flex items-baseline gap-4">
          <Link href="/">
            <FiUser size={26} color="white" />
          </Link>

          <button>
            <FiLogOut size={26} color="white" />
          </button>
        </div>
      </div>
    </header>
  );
}