import Link from "next/link";
import Brand from "@/app/_components/brand";

export default function SideBar({ onLogout }: { onLogout: () => void }) {
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
        <a
          aria-current="page"
          className="profile-nav-link profile-nav-link--current"
          href="#account-details"
        >
          <span aria-hidden="true">◉</span>
          الملف الشخصي
        </a>
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
