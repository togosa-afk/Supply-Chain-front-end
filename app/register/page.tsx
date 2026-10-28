"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import {
  register,
  type RegistrationData,
  type RegistrationRole,
} from "@/app/services/register/register";

type RegistrationForm = Omit<RegistrationData, "role"> & {
  role: RegistrationRole | "";
};

const initialForm: RegistrationForm = {
  name: "",
  email: "",
  password: "",
  role: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    field: keyof RegistrationForm,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSubmissionMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.role) {
      setSubmissionMessage({
        type: "error",
        text: "Please choose a role before registering.",
      });
      return;
    }

    setIsLoading(true);
    setSubmissionMessage(null);

    try {
      await register({ ...form, role: form.role });
      setSubmissionMessage({
        type: "success",
        text: "Your account was created successfully.",
      });
    } catch (error) {
      setSubmissionMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(232,240,232,0.9),_rgba(251,250,246,0.96)_34%,_#fbfaf6_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="page-width">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-[#dfe9e3] bg-white shadow-[0_30px_80px_rgba(26,58,49,0.12)] lg:grid-cols-[1.15fr_0.85fr]">
          <section className="relative overflow-hidden bg-[#f5f6f0] p-8 sm:p-10 lg:p-12">
            <div className="absolute -left-16 top-14 h-44 w-44 rounded-full bg-[#ebf3eb] blur-2xl" />
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#f8e8d8]/70 blur-3xl" />

            <div className="relative z-10">
              <div className="brand">
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 15.5C6.47 15.5 6 15.03 6 14.5V9.2C6 8.65 6.47 8.18 7 8.18H9.5V15.5H7ZM10.8 8.18H15.3C15.83 8.18 16.3 8.65 16.3 9.2V14.5C16.3 15.03 15.83 15.5 15.3 15.5H10.8V8.18ZM9.5 5.5H14.5C15.88 5.5 17 6.62 17 8V16C17 17.38 15.88 18.5 14.5 18.5H9.5C8.12 18.5 7 17.38 7 16V8C7 6.62 8.12 5.5 9.5 5.5Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="brand-name">Supply <span>Chain</span></span>
              </div>

              <span className="eyebrow mt-10">
                <span className="eyebrow-dot" />
                Trusted network
              </span>

              <h1 className="mt-6 max-w-md text-4xl font-black tracking-[-1.8px] text-[#1d3e34] sm:text-5xl">
                Join a smarter
                <span className="block text-[#1d5749]">supply chain</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#65756d] sm:text-base">
                Build your business profile, manage supplier visibility, and coordinate
                every shipment with a more connected and transparent workflow.
              </p>

              <div className="mt-8 space-y-4 text-sm text-[#27483f]">
                {[
                  "Track supplier and buyer activity in one place",
                  "Manage roles for logistics, procurement, and fulfillment",
                  "Get faster visibility across your operations",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#e3ebe4] bg-white/80 px-3 py-3 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9f3ea] text-[#1d5749] font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                Create account
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-[-1px] text-[#183a32]">
                Register
              </h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-[#1d5749]">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-[#dfe7df] bg-[#f8faf8] px-3 text-sm text-[#183a32] transition placeholder:text-[#98a6a1] focus:border-[#1d5749] focus:outline-none focus:ring-4 focus:ring-[#e8f0e8]"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#1d5749]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-[#dfe7df] bg-[#f8faf8] px-3 text-sm text-[#183a32] transition placeholder:text-[#98a6a1] focus:border-[#1d5749] focus:outline-none focus:ring-4 focus:ring-[#e8f0e8]"
                  placeholder="name@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-semibold text-[#1d5749]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(event) => handleChange("password", event.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-[#dfe7df] bg-[#f8faf8] px-3 text-sm text-[#183a32] transition placeholder:text-[#98a6a1] focus:border-[#1d5749] focus:outline-none focus:ring-4 focus:ring-[#e8f0e8]"
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-semibold text-[#1d5749]">
                  Select role
                </label>
                <select
                  id="role"
                  value={form.role}
                  onChange={(event) => handleChange("role", event.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-[#dfe7df] bg-[#f8faf8] px-3 text-sm text-[#183a32] transition focus:border-[#1d5749] focus:outline-none focus:ring-4 focus:ring-[#e8f0e8]"
                >
                  <option value="">Choose one</option>
                  <option value="CUSTOMER">Customer</option>
                  <option value="MERCHANT">Merchant</option>
                  <option value="MANUFACTURER">Manufacturer</option>
                  <option value="LOGISTICS_PROVIDER">Logistic provider</option>
                </select>
              </div>

              <button
                type="submit"
                className="button button-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Register"}
              </button>
              {submissionMessage && (
                <p
                  role={submissionMessage.type === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={`text-sm ${
                    submissionMessage.type === "error"
                      ? "text-red-700"
                      : "text-[#1d5749]"
                  }`}
                >
                  {submissionMessage.text}
                </p>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-[#5e6f69]">
              Do you have an account? {" "}
              <Link href="/login" className="font-semibold text-[#1d5749] underline decoration-[#1d5749]/40 underline-offset-4 transition hover:text-[#ed956a]">
                Login here
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
