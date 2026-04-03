"use client";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "@/components/ProfileMenu";
import { AvatarWithBadge } from "@/components/AvatarWithBadge";

export default function Header() {
  const [menu, setMenu] = useState(false);
  const { data: session } = useSession();

  return (
    <header
      id="header"
      className={`flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 lg:px-10 2xl:px-40 py-5 mb-5 transition-all duration-300 ease-in-out`}
    >
      {/* Logo & Home Section */}
      <div className="flex items-center justify-between w-full lg:w-auto gap-6">
        <Link href="/practiceno1/userPage">
          <Button className="rounded-lg bg-[#c9a96e] font-bold text-[#0D0C17] hover:bg-[#dfc080] transition-colors duration-200">
            ← Home
          </Button>
        </Link>

        <h1 className="text-2xl lg:text-3xl font-semibold text-[#a44a23]">
          Nova Stay
        </h1>
      </div>

      {/* Profile Section */}
      <div className="mt-4 lg:mt-0">
        {session && (
          <ProfileMenu
            avatar={
              <AvatarWithBadge
                avatar={session.user?.image || ""}
                name={session.user?.name?.split(",")[0] || ""}
                className="text-black"
              />
            }
            profile={() => redirect("/practiceno1/profile")}
            logout={() => signOut({ callbackUrl: window.location.href })}
          />
        )}
      </div>
    </header>
  );
}