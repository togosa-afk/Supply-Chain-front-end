"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Badge,
  Button,
  Panel,
  SelectField,
  StatusMessage,
} from "@/app/_components/ui";
import ThemeToggle from "@/app/_components/theme-toggle";
import {
  clearAuthSession,
  AUTH_STORAGE_KEYS,
  getStoredAuthSession,
  saveAuthSession,
  type AuthSession,
} from "@/app/lib/auth";
import type { RegistrationRole } from "@/app/services/register/register";
import { updateRole } from "@/app/services/role/updaterole";
import SideBar from "../components/sidebar";

const roleOptions: { value: RegistrationRole; label: string }[] = [
  { value: "CUSTOMER", label: "متسوق" },
  { value: "MERCHANT", label: "تاجر" },
  { value: "MANUFACTURER", label: "مُصنّع" },
  { value: "LOGISTICS_PROVIDER", label: "مزود خدمات لوجستية" },
];

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

export default function ProfilePage() {
  const router = useRouter();
  const sessionSnapshot = useSyncExternalStore(
    subscribeToAuthStorage,
    getAuthStorageSnapshot,
    () => null,
  );
  const [updatedSession, setUpdatedSession] = useState<AuthSession | null>(null);
  const [isEditingRole, setIsEditingRole] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RegistrationRole | "">("");
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [roleMessage, setRoleMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const isSessionReady = sessionSnapshot !== null;
  const authSession =
    updatedSession ??
    (sessionSnapshot && sessionSnapshot !== "none"
      ? getStoredAuthSession()
      : null);
  const user = authSession?.user;
  const name = user?.name?.trim() || "مستخدم SupplyFlow";
  const email = user?.email?.trim();
  const role = user?.role?.trim();
  const roleLabel =
    roleOptions.find((option) => option.value === role)?.label ?? role;
  const userId = user?.id;
  const initials = name.slice(0, 1);

  const handleLogout = () => {
    clearAuthSession();
    router.replace("/login");
  };

  const handleRoleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedRole || !authSession) {
      return;
    }

    setIsUpdatingRole(true);
    setRoleMessage(null);

    try {
      await updateRole({ role: selectedRole });
      const updatedSession: AuthSession = {
        ...authSession,
        user: { ...authSession.user, role: selectedRole },
      };
      saveAuthSession(updatedSession);
      setUpdatedSession(updatedSession);
      setIsEditingRole(false);
      setRoleMessage({ type: "success", text: "تم تحديث نوع الحساب بنجاح." });
    } catch (error) {
      setRoleMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "تعذر تحديث نوع الحساب. حاول مرة أخرى.",
      });
    } finally {
      setIsUpdatingRole(false);
    }
  };

  if (!isSessionReady) {
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

  if (!authSession) {
    return (
      <main className="empty-page" id="main-content" lang="ar" dir="rtl">
        <section className="empty-panel ui-panel">
          <p className="ui-kicker">
            <span className="font-data">ACCOUNT / 00</span>
          </p>
          <h1>لا توجد جلسة نشطة</h1>
          <p>سجّل الدخول لعرض معلومات حسابك وإدارة نوعه.</p>
          <Link className="ui-button ui-button--primary" href="/login">
            تسجيل الدخول
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
        <SideBar onLogout={handleLogout} />
        <main className="profile-content">
          <header className="profile-page-header">
            <div>
              <p className="ui-kicker">
                <span className="font-data">PROFILE / 01</span>
                <span aria-hidden="true" className="section-rule" />
                مساحة الحساب
              </p>
              <h1>الملف الشخصي</h1>
              <p>معلومات حسابك ونوع مشاركتك في شبكة SupplyFlow.</p>
            </div>
            <ThemeToggle />
          </header>

          <Panel className="profile-identity">
            <div className="profile-avatar" aria-hidden="true">
              {initials}
            </div>
            <div className="profile-identity-copy">
              <p className="ui-kicker">أهلاً بك</p>
              <h2>{name}</h2>
              <p className="profile-email" dir="ltr">
                {email || "لم تتم إضافة بريد إلكتروني"}
              </p>
            </div>
            {roleLabel && <Badge>{roleLabel}</Badge>}
          </Panel>

          <Panel className="profile-details" id="account-details">
            <header className="profile-section-heading">
              <div>
                <p className="ui-kicker">
                  <span className="font-data">ACCOUNT / DATA</span>
                </p>
                <h2>معلومات الحساب</h2>
              </div>
              <span className="font-data profile-section-index">01—04</span>
            </header>

            <dl className="profile-data-grid">
              <div className="profile-data-item">
                <dt>الاسم الكامل</dt>
                <dd className="profile-value">{name}</dd>
              </div>
              <div className="profile-data-item">
                <dt>البريد الإلكتروني</dt>
                <dd className="profile-value" dir="ltr">
                  {email || "غير متوفر"}
                </dd>
              </div>
              <div className="profile-data-item">
                <dt>نوع الحساب</dt>
                <dd className="profile-value">{roleLabel || "غير محدد"}</dd>
              </div>
              {userId !== undefined && userId !== null && (
                <div className="profile-data-item">
                  <dt>معرّف الحساب</dt>
                  <dd className="profile-value font-data" dir="ltr">
                    {userId}
                  </dd>
                </div>
              )}
            </dl>

            <div className="profile-role-editor">
              {!isEditingRole ? (
                <Button
                  disabled={!authSession}
                  onClick={() => {
                    const currentRole = roleOptions.find(
                      (option) => option.value === role,
                    )?.value;
                    setSelectedRole(currentRole ?? "");
                    setRoleMessage(null);
                    setIsEditingRole(true);
                  }}
                  variant="secondary"
                >
                  تغيير نوع الحساب
                </Button>
              ) : (
                <form
                  aria-busy={isUpdatingRole}
                  className="profile-role-form"
                  onSubmit={handleRoleUpdate}
                >
                  <SelectField
                    id="profile-role"
                    label="نوع الحساب"
                    name="role"
                    onChange={(event) => {
                      const option = roleOptions.find(
                        ({ value }) => value === event.target.value,
                      );
                      setSelectedRole(option?.value ?? "");
                    }}
                    required
                    value={selectedRole}
                  >
                    <option value="">اختر نوع الحساب</option>
                    {roleOptions.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </SelectField>
                  <div className="profile-role-actions">
                    <Button
                      disabled={!selectedRole}
                      loading={isUpdatingRole}
                      type="submit"
                    >
                      {isUpdatingRole ? "جارٍ التحديث…" : "حفظ التغيير"}
                    </Button>
                    <Button
                      disabled={isUpdatingRole}
                      onClick={() => {
                        setIsEditingRole(false);
                        setRoleMessage(null);
                      }}
                      type="button"
                      variant="secondary"
                    >
                      إلغاء
                    </Button>
                  </div>
                </form>
              )}
              {roleMessage && (
                <StatusMessage type={roleMessage.type}>
                  {roleMessage.text}
                </StatusMessage>
              )}
            </div>
          </Panel>
        </main>
      </div>
    </>
  );
}
