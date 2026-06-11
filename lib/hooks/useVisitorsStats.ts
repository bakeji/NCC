// hooks/useVisitorStats.ts
import { db } from "@/lib/firebase.config";
import { collection, query, orderBy, onSnapshot, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

type VisitorStats = {
  allTime: number;
  currentMonth: number;
  lastMonth: number;
  loading: boolean;
};

export function useVisitorStats(): VisitorStats {
  const [stats, setStats] = useState<VisitorStats>({
    allTime: 0,
    currentMonth: 0,
    lastMonth: 0,
    loading: true,
  });

  useEffect(() => {
    const q = query(collection(db, "visits"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();

      const lastMonthDate = new Date(currentYear, currentMonth - 1);
      const lastMonthYear = lastMonthDate.getFullYear();
      const lastMonthIndex = lastMonthDate.getMonth();

      let currentMonthCount = 0;
      let lastMonthCount = 0;

      snap.forEach((doc) => {
        const ts = doc.data().createdAt as Timestamp;
        if (!ts) return;
        const date = ts.toDate();
        const y = date.getFullYear();
        const m = date.getMonth();

        if (y === currentYear && m === currentMonth) currentMonthCount++;
        if (y === lastMonthYear && m === lastMonthIndex) lastMonthCount++;
      });

      setStats({
        allTime: snap.size,
        currentMonth: currentMonthCount,
        lastMonth: lastMonthCount,
        loading: false,
      });
    });

    return () => unsub();
  }, []);

  return stats;
}