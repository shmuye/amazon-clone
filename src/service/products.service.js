import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

export const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));

  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));
};

export const fetchProductById = async (id) => {
  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return { id: snapshot.id, ...snapshot.data() };
};
