import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen p-8 sm:p-20 flex flex-col justify-center items-center gap-8`}>
      <div className="flex gap-4">
        <Link href="/login">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded">
            Signup
          </button>
        </Link>
        <div className="flex gap-4">
          <Link href="/user">
          <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
            User List
            </button>
            </Link>
            <Link href="/edit">
            <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
              Edit
              </button>
            </Link>
            <Link href="/delete">
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded">
                Delete
                </button>
                </Link>
                </div>
                </div>
    </div>
  );
}
