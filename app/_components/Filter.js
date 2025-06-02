"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter){
    const params = new URLSearchParams(searchParams);

    params.set("capacity" , filter);
    router.replace(`${pathname}?${params.toString()}`, {scroll: false})
  }
  return (
    <div className="border border-primary-800 flex">
      <Button handleFilter={handleFilter} activeFilter={activeFilter} filter='all'>All cabins</Button>
      <Button handleFilter={handleFilter} activeFilter={activeFilter} filter='small'>1&mdash; 3 guests</Button>
      <Button handleFilter={handleFilter} activeFilter={activeFilter} filter='medium'>1&mdash; 7 guests</Button>
      <Button handleFilter={handleFilter} activeFilter={activeFilter} filter='large'>1&mdash; 12 guests</Button>
    </div>
  );
};


function Button({filter , handleFilter , activeFilter , children}){
  return<button
    className={`px-5 py-2 hover:bg-primary-700 transition rounded-md ${activeFilter === filter ? "bg-primary-700" : ""}`}
    onClick={() => handleFilter(filter)}
  >
    {children}
  </button>;
}