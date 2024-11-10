import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";


export async function GET(req) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Assuming the id is the last segment in the path
  try {
    const listing = await getDoc(doc(db, "listings", id));

    if (listing.exists()) {
      return new Response(JSON.stringify({ id: listing.id, ...listing.data() }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Event not found" }), {
        status: 404,
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch event. Server Error" }),
      {
        status: 500,
      }
    );
  }
}