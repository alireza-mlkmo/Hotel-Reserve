"use client"

import { signOut } from "next-auth/react";

export default function NavLogout() {
  return (
    <span onClick={() => signOut({callbackUrl: "/"})} className="hover:text-accent-400 transition-colors cursor-pointer">
      Logout
    </span>
  );
}