"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import SideBar from "../components/sidebar";
import { AuthSession, getStoredAuthSession } from "@/app/lib/auth";

function ProfileContent() {

  const [authSession, setAuthSession] = useState<AuthSession | null>(
    getStoredAuthSession(),
  );

  const params = useParams<{ id: string }>();
  const id = params?.id ?? "unknown";

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-6 py-12 text-[#183a32]">
      <SideBar />
      <div className="mx-auto max-w-3xl rounded-[28px] border border-[#dfe9e3] bg-white p-8 shadow-[0_30px_80px_rgba(26,58,49,0.12)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1d5749]">
          Profile
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-1.2px] text-[#183a32]">
          Hello {authSession?.user?.name}
        </h1>
        <p className="mt-4 text-base text-[#5e6f69]">
          Your role is{" "}
          <span className="font-semibold text-[#1d5749]">
            {authSession?.user?.role}
          </span>
          .
        </p>
      </div>
    </main>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={<div className="p-8 text-[#183a32]">Loading profile…</div>}
    >
      <ProfileContent />
    </Suspense>
  );
}
