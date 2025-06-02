import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import Image from 'next/image';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

function ReservationCard({ booking , onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-800">
      {/* Image */}
      <div className="relative w-full sm:w-32 h-48 sm:h-32 flex-shrink-0">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>

      {/* Main content */}
      <div className="flex-grow px-4 sm:px-6 py-3 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <h3 className="text-lg sm:text-xl font-semibold">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-6 sm:h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-6 sm:h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm self-start sm:self-auto">
              upcoming
            </span>
          )}
        </div>

        <p className="text-base sm:text-lg text-primary-300 mt-1">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-wrap sm:flex-nowrap gap-x-5 gap-y-2 mt-auto items-baseline">
          <p className="text-lg sm:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="text-primary-300 hidden sm:inline">&bull;</p>
          <p className="text-base text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="sm:ml-auto text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800 w-full sm:w-[100px]">
        {!isPast(startDate) && (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="group flex justify-center sm:justify-start items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 py-2 sm:py-0 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="sm:mt-1">Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;
