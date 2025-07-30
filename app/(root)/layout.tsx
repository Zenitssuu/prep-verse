import { isAuthenticated, logout } from "@/lib/actions/auth.actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const authenticated = await isAuthenticated();

  if (!authenticated) redirect("/sign-in");

  return (
    <div className="root-layout relative min-h-screen">
      <nav className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100 text-xl font-semibold">PrepVerse</h2>
        </Link>
        <form action={logout}>
          <button type="submit" className="btn-primary max-sm:w-full">
            Logout
          </button>
        </form>
      </nav>

      {children}
    </div>
  );
};

export default RootLayout;
