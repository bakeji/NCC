// components/TrackVisit.tsx
"use client";
import { trackVisit } from "@/lib/trackVisits";
import { useEffect } from "react";


export default function TrackVisit() {
  useEffect(() => {
    trackVisit("/");
  }, []);

  return null;
}