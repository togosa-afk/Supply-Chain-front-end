"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/app/_components/auth-shell";
import { Button, StatusMessage, TextField } from "@/app/_components/ui";
import { login, type LoginData } from "@/app/services/login/login";

const initialForm: LoginData = {
  email: "",
  password: "",
};

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (field: keyof LoginData, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setSubmissionMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setSubmissionMessage(null);

    try {
      const session = await login(form);
      if (session.user.id !== undefined && session.user.id !== null) {
        router.replace(`/profile/${session.user.id}`);
        return;
      }

      setSubmissionMessage({
        type: "success",
        text: "You’re signed in. Your account profile is ready.",
      });
    } catch (error) {
      setSubmissionMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Could not sign in. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      alternate={
        <>
          Don’t have an account? <Link href="/register">Create one</Link>
        </>
      }
      description="Sign in to reconnect with your suppliers, monitor shipments, and keep your business moving."
      eyebrow="WELCOME BACK / 01"
      formEyebrow="ACCOUNT ACCESS"
      formTitle="Sign in"
      title="Your supply chain, all in one place."
    >
      <form
        aria-busy={isLoading}
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <TextField
          autoComplete="email"
          id="login-email"
          label="Email"
          name="email"
          onChange={(event) => handleChange("email", event.target.value)}
          required
          type="email"
          value={form.email}
        />
        <TextField
          autoComplete="current-password"
          id="login-password"
          label="Password"
          name="password"
          onChange={(event) => handleChange("password", event.target.value)}
          required
          type="password"
          value={form.password}
        />

        <Button className="auth-submit" loading={isLoading} type="submit">
          {isLoading ? "Signing in…" : "Sign in"}
          {!isLoading && <span aria-hidden="true">→</span>}
        </Button>

        {submissionMessage && (
          <StatusMessage type={submissionMessage.type}>
            {submissionMessage.text}
          </StatusMessage>
        )}
      </form>
    </AuthShell>
  );
}
