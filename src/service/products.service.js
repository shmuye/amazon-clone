import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase.js";
import { COLLECTIONS } from "../constants/firestore.js";

const normalizeProduct = (id, data) => ({
  id,
  title: data.title ?? "",
  description: data.description ?? "",
  price: Number(data.price) || 0,
  rating: Number(data.rating) || 0,
  image: data.image ?? "",
  category: data.category ?? "General",
});

export const fetchProducts = async () => {
  const productsRef = collection(db, COLLECTIONS.PRODUCTS);
  const productsQuery = query(productsRef, orderBy("title"));

  const snapshot = await getDocs(productsQuery);

  return snapshot.docs.map((docSnapshot) =>
    normalizeProduct(docSnapshot.id, docSnapshot.data()),
  );
};

export const fetchProductById = async (id) => {
  const docRef = doc(db, COLLECTIONS.PRODUCTS, id);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    return null;
  }

  return normalizeProduct(snapshot.id, snapshot.data());
};
