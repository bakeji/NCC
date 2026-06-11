import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "../firebase.config";



export type ActivityType = "blog" | "event" | "gallery" | "sermon";
export type ActivityAction = "created" | "updated";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  action: ActivityAction;
  title: string;
  created: Date;
  updated: Date;
  activityAt: Date; // the date to sort/display — whichever is more recent
}

const COLLECTIONS: { name: string; type: ActivityType; titleField: string }[] = [
  { name: "blogs",   type: "blog",    titleField: "title" },
  { name: "events",  type: "event",   titleField: "title" },
//   { name: "gallery", type: "gallery", titleField: "title" },
//   { name: "sermons", type: "sermon",  titleField: "title" },
];

// Consider a doc "updated" if updatedAt exists and is meaningfully later than createdAt
const DIFF_THRESHOLD_MS = 5000; // 5 seconds — avoids treating simultaneous writes as "updated"

export function useRecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAll() {
      try {
       const promises = COLLECTIONS.map(({ name, type, titleField }) => {
  // 👇 replace the single getDocs with these two
  const byCreated = getDocs(query(collection(db, name), orderBy("created", "desc"), limit(5)));
  const byUpdated = getDocs(query(collection(db, name), orderBy("updated", "desc"), limit(5)));

  return Promise.all([byCreated, byUpdated]).then(([createdSnap, updatedSnap]) => {
    // deduplicate docs that appear in both snapshots
    const seen = new Set<string>();
    const allDocs = [...createdSnap.docs, ...updatedSnap.docs].filter((doc) => {
      if (seen.has(doc.id)) return false;
      seen.add(doc.id);
      return true;
    });

    return allDocs.map((doc) => {
      const data = doc.data();

      const created: Date = data.created?.toDate?.() ?? new Date(0);
      const updated: Date = data.updated?.toDate?.() ?? created;

      const wasUpdated =
        data.updated != null &&
        updated.getTime() - created.getTime() > DIFF_THRESHOLD_MS;

      return {
        id: doc.id,
        type,
        action: wasUpdated ? "updated" : "created",
        title: data[titleField] ?? "(untitled)",
        created,
        updated,
        activityAt: wasUpdated ? updated : created,
      } as ActivityItem;
    });
  });
});

        const results = await Promise.all(promises);

        const merged = results
          .flat()
          .filter((item) => item.created.getFullYear() > 1970)
          .sort((a, b) => b.activityAt.getTime() - a.activityAt.getTime())
          .slice(0, 5);

        setActivities(merged);
      } catch (err) {
        setError("Failed to fetch recent activity");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, []);

  return { activities, loading, error };

}
