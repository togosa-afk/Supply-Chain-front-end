"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/app/_components/auth-shell";
import { Button, SelectField, StatusMessage, TextField } from "@/app/_components/ui";
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

const roles: { value: RegistrationRole; label: string }[] = [
  { value: "CUSTOMER", label: "Customer" },
  { value: "MERCHANT", label: "Merchant" },
  { value: "MANUFACTURER", label: "Manufacturer" },
  { value: "LOGISTICS_PROVIDER", label: "Logistics provider" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (field: keyof RegistrationForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setSubmissionMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.role) {
      setSubmissionMessage({
        type: "error",
        text: "Choose an account type before creating your account.",
      });
      return;
    }

    setIsLoading(true);
    setSubmissionMessage(null);

    try {
      await register({ ...form, role: form.role });
      router.replace("/login");
    } catch (error) {
      setSubmissionMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Could not create your account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      alternate={
        <>
          Already have an account? <Link href="/login">Sign in</Link>
        </>
      }
      description="Bring your business into a shared supply network built for clearer, more connected trade."
      eyebrow="NEW PARTNER / 01"
      formEyebrow="JOIN THE NETWORK"
      formTitle="Create your account"
      title="A more connected supply chain starts here."
    >
      <form
        aria-busy={isLoading}
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <TextField
          autoComplete="name"
          id="register-name"
          label="Full name"
          name="name"
          onChange={(event) => handleChange("name", event.target.value)}
          required
          type="text"
          value={form.name}
        />
        <TextField
          autoComplete="email"
          id="register-email"
          label="Email"
          name="email"
          onChange={(event) => handleChange("email", event.target.value)}
          required
          type="email"
          value={form.email}
        />
        <TextField
          autoComplete="new-password"
          id="register-password"
          label="Password"
          name="password"
          onChange={(event) => handleChange("password", event.target.value)}
          required
          type="password"
          value={form.password}
        />
        <SelectField
          id="register-role"
          label="Account type"
          name="role"
          onChange={(event) => handleChange("role", event.target.value)}
          required
          value={form.role}
        >
          <option value="">Choose one</option>
          {roles.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </SelectField>

        <Button className="auth-submit" loading={isLoading} type="submit">
          {isLoading ? "Creating account…" : "Create account"}
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
