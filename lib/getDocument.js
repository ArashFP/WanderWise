import { db } from "@/firebase/config"
import { getDoc } from "firebase/firestore"


//get a single document from a collection
export default async function getDocument(collectionName, docId) {
  const docSnap = await getDoc(doc(db, collectionName, docId))

  if(!docSnap.exists()) {
    return { error: 'Document does not exist' }
  }

  return { id: docSnap.id, ...docSnap.data() }
} 