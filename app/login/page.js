"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessage = {
    CredentialsSignin: "Invalid email or password. Please try again.",
    AccessDenied: "Access denied. You do not have permission to sign in.",
    Configuration: "Server configuration error. Please contact support.",
    Verification: "Unable to verify your sign-in request.",
    OAuthSignin: "Error signing in with the OAuth provider.",
    OAuthCallback: "OAuth callback error. Please try again.",
    OAuthCreateAccount: "Error creating an account with the OAuth provider.",
    EmailCreateAccount: "Error creating an account with email.",
    Callback: "Callback handler error. Please try again.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    SessionRequired: "Please sign in to access this page.",
    default: "An unknown error occurred. Please try again later.",
  };


  function handleSubmit(e) {
    e.preventDefault();
  
    
    signIn("credentials", {
      email:email,
      password:password,
      callbackUrl: "/",

    });
  }

  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <form
        onSubmit={handleSubmit}
        className="border border-primary-800 px-16 py-12 text-center"
        action=""
      >
        <h1 className="font-bold text-2xl ">Login</h1>
        {error ? (
          <h2 className="text-xl text-red-700">
            {errorMessage[error] || errorMessage.default}
          </h2>
        ) : (
          ""
        )}
        <div className="mt-8">
          <label className="text-xl" htmlFor="">
            Email:{" "}
          </label>
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            className="bg-primary-950 outline-none border border-primary-800 rounded-md w-52 px-2 py-2 ml-2"
            type="text"
          />
        </div>

        <div className="mt-8">
          <label className="text-xl" htmlFor="">
            Password:{" "}
          </label>
          <input
            required
            onChange={(e) => setPassword(e.target.value)}
            className="bg-primary-950 outline-none border border-primary-800 rounded-md w-52 px-2 py-2 ml-2"
            type="text"
          />
        </div>
        <button
          type="submit"
          className="px-10 py-2 text-xl bg-primary-600 rounded-md transition hover:bg-primary-800 mt-8"
        >
          Login
        </button>
        <br />
        <br /><br />
        <span className="">You don't have account?</span>
        <Link href='/signup' className="text-blue-500">Sign Up</Link>
      </form>
    </div>
  );
}
