// lib/trackVisit.ts

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase.config";

export async function trackVisit(page: string) {
  try {
    await addDoc(collection(db, "visits"), {
      page,
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      createdAt: serverTimestamp(),
    });
  } catch (e) {
  }
}