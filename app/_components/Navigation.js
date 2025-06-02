import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import NavLogout from "./NavLogout";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export default async function Navigation() {
  const session = await getServerSession(authOptions);

  
  return (
    <>
    <DesktopMenu session={session}/>
    <MobileMenu session={session}/>    
    </>
  );
  }
