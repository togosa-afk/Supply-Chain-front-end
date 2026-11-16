import Link from "next/link";
import Brand from "@/app/_components/brand";
import { clearAuthSession } from "@/app/lib/auth";

type SideBarProps = {
  activePage?: "profile" | "addproduct";
  onLogout?: () => void;
  role?: string;
  userId?: string | number;
};

export default function SideBar({
  activePage = "profile",
  onLogout = () => clearAuthSession(),
  role,
  userId,
}: SideBarProps) {
  return (
    <aside className="profile-sidebar">
      <Brand />
      <p className="ui-kicker profile-sidebar-kicker">
        <span className="font-data">SUPPLYFLOW / ACCOUNT</span>
      </p>
      <nav aria-label="تنقل الحساب" className="profile-nav">
        <Link className="profile-nav-link" href="/">
          <span aria-hidden="true">⌂</span>
          الرئيسية
        </Link>
        <Link
          aria-current={activePage === "profile" ? "page" : undefined}
          className={`profile-nav-link${activePage === "profile" ? " profile-nav-link--current" : ""}`}
          href={`/profile/${userId ?? ""}`}
        >
          <span aria-hidden="true">◉</span>
          الملف الشخصي
        </Link>
        {role === "MANUFACTURER" && (
          <Link
            aria-current={activePage === "addproduct" ? "page" : undefined}
            className={`profile-nav-link${activePage === "addproduct" ? " profile-nav-link--current" : ""}`}
            href="/profile/addproduct"
          >
            أضف منتج جديد
          </Link>
        )}
      </nav>
      <div className="profile-sidebar-footer">
        <button className="profile-logout" onClick={onLogout} type="button">
          <span aria-hidden="true">↪</span>
          تسجيل الخروج
        </button>
        <span className="font-data">ACCOUNT / 01</span>
      </div>
    </aside>
  );
}
