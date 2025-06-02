"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


export async function createGuest(formData){
  const newGuest = Object.fromEntries(formData.entries());
  const {email , fullName , password} = newGuest


  const {error } = await supabase.from("guests").insert([{email , password , fullName}]);

  if (error) {
    throw new Error("Guest could not be created");
  }

  redirect('/login')

}


export async function updateGuest(formData){
   const session = await getServerSession(authOptions)
    
    if(!session.user) throw new Error("You must be logged in...");
    
    const nationalID = formData.get('nationalID');
    const [nationality , countryFlag] = formData.get("nationality").split('%');

    if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
      throw new Error("Please provide a valid national ID");

    const updateData = {nationality , countryFlag , nationalID};

    
      const { data, error } = await supabase
        .from('guests')
        .update(updateData)
        .eq('id', session.user.guestId)
    
      if (error) {
        throw new Error('Guest could not be updated');
      }
    
    revalidatePath('/account/profile')
}

export async function createBooking(bookingData , formData){
  const session = await getServerSession(authOptions);
  if (!session.user) throw new Error("You must be logged in...");

  
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0 , 1000),
    extrasPrice:0,
    totalPrice: bookingData.cabinPrice,
    isPaid:false,
    hasBreakfast: false,
    status: 'unconfirmed',
  }
  const {  error } = await supabase
    .from("bookings")
    .insert([newBooking])

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabin/${bookingData.cabinId}`);
  redirect('/cabins/thankyou')
}


export async function deleteBooking(bookingId){

  const session = await getServerSession(authOptions);
  if (!session.user) throw new Error("You must be logged in...");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map(booking => booking.id);
  if(!guestBookingsIds.includes(bookingId)) throw new Error("You are not alowed to delete this booking!");
  

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function updateBooking(formData){

  const bookingId = Number(formData.get("bookingId"))
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations").slice(0 , 1000)

  const session = await getServerSession(authOptions);
  if (!session.user) throw new Error("You must be logged in...");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsIds = guestBookings.map((booking) => booking.id);
  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not alowed to delete this booking!");
  

  const { data, error } = await supabase
    .from("bookings")
    .update({numGuests , observations})
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  revalidatePath('/account/reservations')
  revalidatePath(`/account/reservations/edit/${bookingId}`);

  redirect("/account/reservations")
}