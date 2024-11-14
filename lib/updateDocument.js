import { db } from "@/firebase/config";
import { doc, updateDoc } from "firebase/firestore";



const updateDocument = async (collection, id, data) => {
  try {
    const docRef = doc(db, collection, id);
    await updateDoc(docRef, data);
    return { success: true };
  } catch (error) {
    console.error("Error updating document: ", error);
    return { error };
  }
};

export default updateDocument;