import { createGuest } from "../_lib/actions";

export default function page() {
    return (
        <div className="flex flex-col gap-10 mt-10 items-center">
    
          <form action={createGuest} className="border border-primary-800 px-16 py-12 text-center">
              <h1 className="font-bold text-2xl ">Sign Up</h1>
              {/* {error ? <h2 className="text-xl text-red-700">{errorMessage[error] || errorMessage.default}</h2> : ""} */}
            <div className="mt-8">
              <label className="text-xl" htmlFor="">Email: </label>
              <input required name="email" className="bg-primary-950 outline-none border border-primary-800 rounded-md w-52 px-2 py-2 ml-2" type="text" />
            </div>
           <div className="mt-8">
              <label className="text-xl" htmlFor="">Username: </label>
              <input required name="fullName" className="bg-primary-950 outline-none border border-primary-800 rounded-md w-52 px-2 py-2 ml-2" type="text" />
            </div> 
    
            <div className="mt-8">
              <label className="text-xl" htmlFor="">Password: </label>
              <input required name="password" className="bg-primary-950 outline-none border border-primary-800 rounded-md w-52 px-2 py-2 ml-2" type="password" />
            </div>
            <button type="submit" className="px-10 py-2 text-xl bg-primary-600 rounded-md transition hover:bg-primary-800 mt-8">Sign Up</button>
          </form>
    
        </div>
    );
    }