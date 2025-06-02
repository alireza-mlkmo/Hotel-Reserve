"use client"

import Link from "next/link";
import { useState } from "react"
import NavLogout from "./NavLogout";
import { HiMenu } from "react-icons/hi";
export default function MobileMenu({session}) {
    
  const [openMenu , setOpenMenu] = useState(false);
  
  if(!openMenu) return (
    <div
      onClick={() => setOpenMenu(true)}
      className="block md:hidden z-30"
    >
      <HiMenu size={32}/>
    </div>
  );  
  
  return (
    <>
      <nav
        className={`md:hidden fixed  top-0 bottom-0 ${
          openMenu ? "right-0" : "-right-72"
        } z-20 bg-primary-800  w-72 h-[92%] rounded-bl-3xl transition`}
      >
        <ul className="flex flex-col gap-12 items-center mt-8 text-xl divide--2" >
          <li onClick={() => setOpenMenu(false)} className="">
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
          </li>
          <li onClick={() => setOpenMenu(false)}>
            <Link
              href="/about"
              className="hover:text-accent-400 transition-colors"
            >
              About
            </Link>
          </li>
          <li onClick={() => setOpenMenu(false)}>
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
          <li onClick={() => setOpenMenu(false)}>
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
      <div
        onClick={() => setOpenMenu(false)}
        class={`md:hidden ${!openMenu ? "hidden" : ""} fixed inset-0 w-full h-full z-10 bg-black/40 `}
      ></div>
    </>
  );
}

