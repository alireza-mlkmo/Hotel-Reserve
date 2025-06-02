import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NavLogout from "./NavLogout";

export default async function Navigation() {
  const session = await getServerSession(authOptions);

  
  return (
    <nav className="z-10 text-base sm:text-xl">
      <ul className="flex flex-col sm:flex-row gap-6 sm:gap-16 items-start sm:items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="flex items-center gap-x-3 sm:gap-x-4 hover:text-accent-400 transition-colors"
            >
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={session.user.image}
                alt=""
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
        <li>
          {session?.user.name ? (
            <NavLogout />
          ) : (
            <Link
              href="/login"
              className="hover:text-accent-400 transition-colors"
            >
              Login/Sign Up
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
  }
