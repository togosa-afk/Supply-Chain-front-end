import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(232,240,232,0.9),_rgba(251,250,246,0.96)_34%,_#fbfaf6_100%)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="page-width">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[28px] border border-[#dfe9e3] bg-white shadow-[0_30px_80px_rgba(26,58,49,0.12)] lg:grid-cols-[1.15fr_0.85fr]">
          <section className="relative overflow-hidden bg-[#f5f6f0] p-8 sm:p-10 lg:p-12">
            <div className="absolute -left-16 top-14 h-44 w-44 rounded-full bg-[#ebf3eb] blur-2xl" />
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#f8e8d8]/70 blur-3xl" />

            <div className="relative z-10">
              <Link href="/" className="brand" aria-label="Supply Chain home">
                <span className="brand-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 15.5C6.47 15.5 6 15.03 6 14.5V9.2C6 8.65 6.47 8.18 7 8.18H9.5V15.5H7ZM10.8 8.18H15.3C15.83 8.18 16.3 8.65 16.3 9.2V14.5C16.3 15.03 15.83 15.5 15.3 15.5H10.8V8.18ZM9.5 5.5H14.5C15.88 5.5 17 6.62 17 8V16C17 17.38 15.88 18.5 14.5 18.5H9.5C8.12 18.5 7 17.38 7 16V8C7 6.62 8.12 5.5 9.5 5.5Z" fill="currentColor" />
                  </svg>
                </span>
                <span className="brand-name">Supply <span>Chain</span></span>
              </Link>

              <span className="eyebrow mt-10">
                <span className="eyebrow-dot" />
                Welcome back
              </span>

              <h1 className="mt-6 max-w-md text-4xl font-black tracking-[-1.8px] text-[#1d3e34] sm:text-5xl">
                Your supply chain,
                <span className="block text-[#1d5749]">all in one place</span>
              </h1>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#65756d] sm:text-base">
                Sign in to reconnect with your suppliers, monitor shipments, and keep
                your business moving with confidence.
              </p>

              <div className="mt-8 space-y-4 text-sm text-[#27483f]">
                {[
                  "Stay up to date with shipment progress",
                  "Keep your partners and operations connected",
                  "Get a clearer view of your supply chain",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-[#e3ebe4] bg-white/80 px-3 py-3 shadow-sm">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e9f3ea] font-bold text-[#1d5749]">
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
                Access your account
              </span>
              <h2 className="mt-4 text-3xl font-black tracking-[-1px] text-[#183a32]">
                Login
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#73817b]">
                Enter your details to continue to your account.
              </p>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#1d5749]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-xl border border-[#dfe7df] bg-[#f8faf8] px-3 text-sm text-[#183a32] transition placeholder:text-[#98a6a1] focus:border-[#1d5749] focus:outline-none focus:ring-4 focus:ring-[#e8f0e8]"
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="button button-primary w-full">
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#5e6f69]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#1d5749] underline decoration-[#1d5749]/40 underline-offset-4 transition hover:text-[#ed956a]"
              >
                Register here
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
