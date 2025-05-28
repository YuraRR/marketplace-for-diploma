"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "@/services/authService";
import { logout } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { faHistory, faInfoCircle, faLock, faSignOut, faStore } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { usePathname, useRouter } from "next/navigation";

type ProfileSidebarProps = {
  profileData: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
};

export const ProfileSidebar = ({ profileData }: ProfileSidebarProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    dispatch(logout());
    router.push("/");
  };
  return (
    <div className="w-full p-5 border-r max-w-64 border-light-gray">
      <div className="flex items-center mb-4 ">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold">
            {profileData.first_name} {profileData.last_name}
          </h2>
          <p className="text-gray-500">{profileData.email}</p>
        </div>
      </div>
      <nav className="space-y-2">
        <Link href="/cabinet">
          <Button
            iconBefore={faInfoCircle}
            color={pathname === "/cabinet" ? "green" : "white"}
            className={`w-full justify-start`}
          >
            Про аккаунт
          </Button>
        </Link>

        <Link href="/cabinet/my-orders">
          <Button
            color={pathname === "/cabinet/my-orders" ? "green" : "white"}
            iconBefore={faHistory}
            className={`w-full justify-start`}
          >
            Мої замовлення
          </Button>
        </Link>

        <Button iconBefore={faLock} variant="outline" className="justify-start w-full">
          Змінити пароль
        </Button>

        <Link href="/cabinet/my-shop">
          <Button
            iconBefore={faStore}
            color={pathname === "/cabinet/my-shop" ? "green" : "white"}
            className={`w-full justify-start`}
          >
            Мій магазин
          </Button>
        </Link>

        <Button
          color="white"
          iconBefore={faSignOut}
          className="justify-start w-full mt-4 font-bold"
          onClick={handleLogout}
        >
          Вийти з акаунту
        </Button>
      </nav>
    </div>
  );
};
