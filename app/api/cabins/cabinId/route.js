import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request , {params}) {
    const {cabinId} = params;

    try {
        const [cabin , bookedDates] = await Promise.all[getCabin(cabinId) ,getBookedDatesByCabinId(cabinId)]
    } catch (error) {
        return Response.json({message: "Cabin not Found..."})
    }
    return Response.json({test: "test"})
}


export async function POST(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all[
      (getCabin(cabinId), getBookedDatesByCabinId(cabinId))
    ];
  } catch (error) {
    return Response.json({ message: "Cabin not Found..." });
  }
  return Response.json({ test: "test" });
}