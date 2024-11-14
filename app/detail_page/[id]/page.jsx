"use client";
import { Navbar } from "@/app/_components/navbar_mobile";
import ProfileBar from "@/app/_components/profileBar";
import { ListingCardSingle } from "./_components/listingCardSingle";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/app/_components/footer";
import { Searchbar } from "@/app/_components/searchbar";

const detailPage = () => {
  const router = useRouter();
  const [id, setId] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullPath = window.location.pathname + window.location.search;
      const relativePath = fullPath.replace("/detail_page", "");
      setId(relativePath);
    }
  }, [router]);

  return (
    <main className="bg-timberwolf flex flex-col h-screen pt-3">
      <div className="flex items-center justify-between w-full px-4">
        <img src="/logo.png" alt="hej" className="w-22 h-10" />
        <Searchbar />
        <ProfileBar />
      </div>
      <div className="flex-grow overflow-auto mb-24">
        <ListingCardSingle id={id} />
      </div>

      <Navbar />
      <Footer />
    </main>
  );
};
export default detailPage;
