"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Panel, StatusMessage, TextField } from "@/app/_components/ui";
import ThemeToggle from "@/app/_components/theme-toggle";
import {
  AUTH_STORAGE_KEYS,
  clearAuthSession,
  getStoredAuthSession,
} from "@/app/lib/auth";
import {
  addNewProduct,
  type Product,
} from "@/app/services/addNewProduct/addNewProduct";
import SideBar from "../components/sidebar";

type ProductForm = {
  name: string;
  quantity: string;
  min_avalabil_qaun: string;
  max_avalabil_qaun: string;
};

const initialForm: ProductForm = {
  name: "",
  quantity: "",
  min_avalabil_qaun: "",
  max_avalabil_qaun: "",
};

function subscribeToAuthStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getAuthStorageSnapshot() {
  const token = window.localStorage.getItem(AUTH_STORAGE_KEYS.token);
  if (!token) {
    return "none";
  }

  const user = window.localStorage.getItem(AUTH_STORAGE_KEYS.user) ?? "";
  return `${token}\n${user}`;
}

export default function AddProductPage() {
  const router = useRouter();
  const sessionSnapshot = useSyncExternalStore(
    subscribeToAuthStorage,
    getAuthStorageSnapshot,
    () => null,
  );
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const authSession =
    sessionSnapshot && sessionSnapshot !== "none"
      ? getStoredAuthSession()
      : null;
  const user = authSession?.user;

  const handleLogout = () => {
    clearAuthSession();
    router.replace("/login");
  };

  const handleChange = (field: keyof ProductForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
    setSubmissionMessage(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Number(form.min_avalabil_qaun) > Number(form.max_avalabil_qaun)) {
      setSubmissionMessage({
        type: "error",
        text: "يجب أن يكون الحد الأدنى أقل من الحد الأعلى أو مساويًا له.",
      });
      return;
    }

    const product: Product = {
      name: form.name.trim(),
      quantity: Number(form.quantity),
      min_avalabil_qaun: Number(form.min_avalabil_qaun),
      max_avalabil_qaun: Number(form.max_avalabil_qaun),
    };

    setIsSubmitting(true);
    setSubmissionMessage(null);

    try {
      await addNewProduct(product);
      setForm(initialForm);
      setSubmissionMessage({
        type: "success",
        text: "تمت إضافة المنتج بنجاح.",
      });
    } catch (error) {
      setSubmissionMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "تعذرت إضافة المنتج. حاول مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (sessionSnapshot === null) {
    return (
      <main
        aria-live="polite"
        className="profile-loading"
        id="main-content"
        lang="ar"
        dir="rtl"
      >
        جارٍ تحميل الحساب…
      </main>
    );
  }

  if (!authSession || user?.role !== "MANUFACTURER") {
    const isSignedIn = Boolean(authSession);

    return (
      <main className="empty-page" id="main-content" lang="ar" dir="rtl">
        <section className="empty-panel ui-panel">
          <p className="ui-kicker">
            <span className="font-data">PRODUCTS / ACCESS</span>
          </p>
          <h1>
            {isSignedIn ? "هذه الصفحة للمُصنّعين فقط" : "سجّل الدخول أولاً"}
          </h1>
          <p>
            {isSignedIn
              ? "لا يمكن إضافة المنتجات إلا من حساب مُصنّع."
              : "سجّل الدخول بحساب مُصنّع لإضافة المنتجات."}
          </p>
          <Link
            className="ui-button ui-button--primary"
            href={isSignedIn ? `/profile/${user?.id ?? ""}` : "/login"}
          >
            {isSignedIn ? "العودة إلى الملف الشخصي" : "تسجيل الدخول"}
          </Link>
        </section>
      </main>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        تجاوز إلى المحتوى
      </a>
      <div className="profile-layout" id="main-content" lang="ar" dir="rtl">
        <SideBar
          activePage="addproduct"
          onLogout={handleLogout}
          role={user.role}
          userId={user.id}
        />
        <main className="profile-content">
          <header className="profile-page-header">
            <div>
              <p className="ui-kicker">
                <span className="font-data">PRODUCTS / 01</span>
                <span aria-hidden="true" className="section-rule" />
                مساحة المُصنّع
              </p>
              <h1>إضافة منتج جديد</h1>
              <p>أدخل بيانات المنتج وكمياته المتاحة لإضافته إلى الشبكة.</p>
            </div>
            <ThemeToggle />
          </header>

          <Panel className="profile-details">
            <header className="profile-section-heading">
              <div>
                <p className="ui-kicker">
                  <span className="font-data">PRODUCT / DATA</span>
                </p>
                <h2>بيانات المنتج</h2>
              </div>
              <span className="font-data profile-section-index">01—04</span>
            </header>

            <form
              aria-busy={isSubmitting}
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <TextField
                autoComplete="off"
                id="product-name"
                label="اسم المنتج"
                name="name"
                onChange={(event) => handleChange("name", event.target.value)}
                required
                type="text"
                value={form.name}
              />
              <TextField
                id="product-quantity"
                label="الكمية المتاحة"
                min="0"
                name="quantity"
                onChange={(event) =>
                  handleChange("quantity", event.target.value)
                }
                required
                step="1"
                type="number"
                value={form.quantity}
              />
              <TextField
                id="product-min-quantity"
                label="الحد الأدنى للكمية المتاحة"
                min="0"
                name="min_avalabil_qaun"
                onChange={(event) =>
                  handleChange("min_avalabil_qaun", event.target.value)
                }
                required
                step="1"
                type="number"
                value={form.min_avalabil_qaun}
              />
              <TextField
                id="product-max-quantity"
                label="الحد الأعلى للكمية المتاحة"
                min="0"
                name="max_avalabil_qaun"
                onChange={(event) =>
                  handleChange("max_avalabil_qaun", event.target.value)
                }
                required
                step="1"
                type="number"
                value={form.max_avalabil_qaun}
              />
              <div className="product-form-actions">
                <Button loading={isSubmitting} type="submit">
                  {isSubmitting ? "جارٍ إضافة المنتج…" : "إضافة المنتج"}
                </Button>
              </div>
              {submissionMessage && (
                <StatusMessage type={submissionMessage.type}>
                  {submissionMessage.text}
                </StatusMessage>
              )}
            </form>
          </Panel>
        </main>
      </div>
    </>
  );
}
