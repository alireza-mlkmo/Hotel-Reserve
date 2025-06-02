import { getServerSession } from "next-auth";
import ReservationCard from "../../_components/ReservationCard";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getBookings } from "@/app/_lib/data-service";
import ReservationList from "@/app/_components/ReservationList";


export const metadata = {
  title: "Reservations",
};


export default async function Page() {
  const session = await getServerSession(authOptions)
  const bookings = await getBookings(session.user.guestId)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings}/>
      )}
    </div>
  );
}
