import { getServerSession } from "next-auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginMessage from "./LoginMessage";

export default async function Reservation({cabin}) {
  const session = await getServerSession(authOptions);

    const [settings, bookedDates] = await Promise.all([
      getSettings(),
      getBookedDatesByCabinId(cabin.id),
    ]);
    
    
  return (
    <div className="grid grid-cols-2 border border-primary-800 w-full min-h-[400px] ">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? <ReservationForm cabin={cabin} user={session?.user}/> : <LoginMessage/>}
    </div>
  );
}