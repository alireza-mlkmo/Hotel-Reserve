import { getLoginGuest } from "@/app/_lib/data-service";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;
        const guest = await getLoginGuest(credentials.email , credentials.password);

        if(!guest) return null

        if (guest.id) {
          return {
            email: guest.email,
            name: guest.fullName,
            guestId: guest.id,
          };
        }else{
          alert("Email or Password is wrong!")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
        token.guestId = user.guestId;
      }
      return token;
    },

    async session({ session , token }) {
      session.user.guestId = token.guestId;
      session.user.name = token.name;
      session.user.email = token.email;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
