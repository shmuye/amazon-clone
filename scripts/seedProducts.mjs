/**
 * One-time script to seed the Firestore `products` collection.
 * Run: npm run seed:products
 *
 * Product data lives in scripts/products.seed.json — not bundled in the frontend.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  apiKey: "AIzaSyAByIx3KKVPJofurVc1FIbx8e24CzDVOz8",
  authDomain: "clone-938d8.firebaseapp.com",
  projectId: "clone-938d8",
  storageBucket: "clone-938d8.firebasestorage.app",
  messagingSenderId: "611481570389",
  appId: "1:611481570389:web:eddb4f9fd6893224ced8dc",
};

const products = JSON.parse(
  readFileSync(join(__dirname, "products.seed.json"), "utf-8"),
);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seed = async () => {
  console.log(`Seeding ${products.length} products to Firestore...`);

  for (const { id, ...data } of products) {
    await setDoc(doc(db, "products", id), data);
    console.log(`  ✓ ${id}: ${data.title}`);
  }

  console.log("Done.");
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
