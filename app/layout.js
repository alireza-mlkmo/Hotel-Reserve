import Header from "./_components/Header";
import { ReservationProvider } from "./_contexts/ReservationContext";

import { Josefin_Sans } from "next/font/google";
import "./_styles/globals.css";
import Session from "./Session";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Session>
        <body
          className={`${josefin.className} bg-primary-950 antialiased flex flex-col relative  text-primary-100 min-h-screen`}
        >
          <Header />
          <div className="flex-1 px-8 py-12">
            <main className="max-w-7xl mx-auto">
              <ReservationProvider>{children}</ReservationProvider>
            </main>
          </div>
        </body>
      </Session>
    </html>
  );
}
