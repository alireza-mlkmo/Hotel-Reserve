import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Guests area",
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {session?.user.name}
    </h2>
  );
}
