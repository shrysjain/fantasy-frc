"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

export default function LeaguesPage() {
  const { data: session, status } = useSession();
  const [leagues, setLeagues] = useState<any[]>([]);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get(`${backendUrl}/api/leagues/`, { withCredentials: true })
        .then((res) => setLeagues(res.data))
        .catch((err) => console.error(err));
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Leagues</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {leagues.length === 0 ? (
        <p>No leagues yet.</p>
      ) : (
        <ul className="space-y-3">
          {leagues.map((l) => (
            <li key={l.id} className="border p-3 rounded">
              {l.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
