import { updateBooking } from "@/app/_lib/actions";
import SubmitButton from '../../../../_components/SubmitButton'
import { getBooking, getCabin } from "@/app/_lib/data-service";
export default async function page({ params }) {

    const { numGuests, observations, cabinId } = await getBooking(params.editId);
      // const { maxCapacity } = await getCabinGVYBHUJN
      // |>(cabinId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{params.editId}
      </h2>

      <form
        action={updateBooking}
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            defaultValue={numGuests}
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <input type="hidden" name="bookingId" value={params.editId} />
        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingText={"Updating..."}>Update reservation</SubmitButton>
        </div>
      </form>
    </div>
  );
}

function Button() {
  return (
    <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      Update reservation
    </button>
  );
}
